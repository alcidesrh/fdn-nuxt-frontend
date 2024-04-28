<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'permisos' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'permisos-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700"
      >
        Edit
      </nuxt-link>
      <button
        class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
        @click="deleteItem"
      >
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Permiso {{ item?.["@id"] }}</h1>

  <div
    v-if="isLoading"
    class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm"
    role="status"
  >
    Loading...
  </div>

  <div
    v-if="error || deleteError"
    class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
    role="alert"
  >
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
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            padre
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link
              v-if="router.hasRoute('api/permisos-id')"
              :to="{ name: 'permisos-id', params: { id: item.permiso } }"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ item.permiso }}
            </nuxt-link>

            <p v-else>
              {{ item.permiso }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            hijos
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('api/permisos-id')">
              <nuxt-link
                v-for="permiso in item.api/permisos"
                :key="permiso"
                :to="{ name: 'permisos-id', params: { id: permiso } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ permiso }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="permiso in item.api/permisos"
                :key="permiso"
              >
                {{ permiso }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            nivel
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nivel }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            usuarios
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('api/users-id')">
              <nuxt-link
                v-for="user in item.api/users"
                :key="user"
                :to="{ name: 'users-id', params: { id: user } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ user }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="user in item.api/users"
                :key="user"
              >
                {{ user }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            nombre
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nombre }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            nota
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nota }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            status
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.status }}
                    </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { usePermisoShowStore } from "~~/stores/permiso/show";
import { usePermisoDeleteStore } from "~~/stores/permiso/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Permiso } from "~~/types/permiso";

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
} = await useFetchItem<Permiso>(`api/permisos/${id}`);
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
