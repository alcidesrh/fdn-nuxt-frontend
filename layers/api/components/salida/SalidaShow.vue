<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'salidas' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'salidas-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Salida {{ item?.["@id"] }}</h1>

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
            ruta
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('rutas-id')">
              <nuxt-link
                v-for="ruta in item.rutas"
                :key="ruta"
                :to="{ name: 'rutas-id', params: { id: ruta } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ ruta }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="ruta in item.rutas"
                :key="ruta"
              >
                {{ ruta }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            fecha
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.fecha) }}
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            bus
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('buses-id')">
              <nuxt-link
                v-for="bus in item.buses"
                :key="bus"
                :to="{ name: 'buss-id', params: { id: bus } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ bus }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="bus in item.buses"
                :key="bus"
              >
                {{ bus }}
              </p>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSalidaShowStore } from "~~/stores/salida/show";
import { useSalidaDeleteStore } from "~~/stores/salida/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Salida } from "~~/types/salida";

const route = useRoute();
const router = useRouter();

const salidaDeleteStore = useSalidaDeleteStore();
const { error: deleteError, deleted } = storeToRefs(salidaDeleteStore);

const salidaShowStore = useSalidaShowStore();

useMercureItem({
  store: salidaShowStore,
  deleteStore: salidaDeleteStore,
  redirectRouteName: "salidas",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Salida>(`salidas/${id}`);
salidaShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    salidaDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this salida?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      salidaDeleteStore.setError(error.value);
      return;
    }

    salidaDeleteStore.setDeleted(item.value);
    salidaDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "salidas" });
    }
  }
}

onBeforeUnmount(() => {
  salidaShowStore.$reset();
});
</script>
