<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'roles' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link v-if="item" :to="{ name: 'roles-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700">
        Edit
      </nuxt-link>
      <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Role {{ item?.["@id"] }}</h1>

  <div v-if="isLoading" class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm" role="status">
    Loading...
  </div>

  <div v-if="error || deleteError" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm" role="alert">
    {{ error || deleteError }}
  </div>

  <div v-if="item" class="overflow-x-auto">
    <table class="min-w-full">
      <thead class="border-b">
        <tr>
          <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
            Field
          </th>
          <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            nombre
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nombre }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            parents
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.parents }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            children
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.children }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            permisos
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('permisos-id')">
              <nuxt-link v-for="permiso in item.permisos" :key="permiso"
                :to="{ name: 'permisos-id', params: { id: permiso } }" class="text-blue-600 hover:text-blue-800">
                {{ permiso }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p v-for="permiso in item.permisos" :key="permiso">
                {{ permiso }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            actions
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('actions-id')">
              <nuxt-link v-for="action in item.actions" :key="action"
                :to="{ name: 'actions-id', params: { id: action } }" class="text-blue-600 hover:text-blue-800">
                {{ action }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p v-for="action in item.actions" :key="action">
                {{ action }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            id
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.id }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            label
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.label }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRoleShowStore } from "~/stores/role/show";
import { useRoleDeleteStore } from "~/stores/role/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Role } from "~/types/role";

const route = useRoute();
const router = useRouter();

const roleDeleteStore = useRoleDeleteStore();
const { error: deleteError, deleted } = storeToRefs(roleDeleteStore);

const roleShowStore = useRoleShowStore();

useMercureItem({
  store: roleShowStore,
  deleteStore: roleDeleteStore,
  redirectRouteName: "roles",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Role>(`roles/${id}`);
roleShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    roleDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this role?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      roleDeleteStore.setError(error.value);
      return;
    }

    roleDeleteStore.setDeleted(item.value);
    roleDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "roles" });
    }
  }
}

onBeforeUnmount(() => {
  roleShowStore.$reset();
});
</script>
