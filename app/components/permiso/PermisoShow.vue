<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'permisos' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link v-if="item" :to="{ name: 'permisos-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700">
        Edit
      </nuxt-link>
      <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Permiso {{ item?.["@id"] }}</h1>

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
            roles
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('roles-id')">
              <nuxt-link v-for="role in item.roles" :key="role" :to="{ name: 'roles-id', params: { id: role } }"
                class="text-blue-600 hover:text-blue-800">
                {{ role }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p v-for="role in item.roles" :key="role">
                {{ role }}
              </p>
            </template>
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
            nombre
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nombre }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            nota
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nota }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            status
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.status }}
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
import { usePermisoShowStore } from "~/stores/permiso/show";
import { usePermisoDeleteStore } from "~/stores/permiso/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Permiso } from "~/types/permiso";

const route = useRoute();
const router = useRouter();

const permisoDeleteStore = usePermisoDeleteStore();
const { error: deleteError, deleted } = storeToRefs(permisoDeleteStore);

const permisoShowStore = usePermisoShowStore();

useMercureItem({
  store: permisoShowStore,
  deleteStore: permisoDeleteStore,
  redirectRouteName: "permisos",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Permiso>(`permisos/${id}`);
permisoShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    permisoDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this permiso?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      permisoDeleteStore.setError(error.value);
      return;
    }

    permisoDeleteStore.setDeleted(item.value);
    permisoDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "permisos" });
    }
  }
}

onBeforeUnmount(() => {
  permisoShowStore.$reset();
});
</script>
