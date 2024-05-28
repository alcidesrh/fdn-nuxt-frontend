<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'recorridoasientoprecios' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'recorridoasientoprecios-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show RecorridoAsientoPrecio {{ item?.["@id"] }}</h1>

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
            recorrido
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link
              v-if="router.hasRoute('api/recorridos-id')"
              :to="{ name: 'recorridos-id', params: { id: item.recorrido } }"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ item.recorrido }}
            </nuxt-link>

            <p v-else>
              {{ item.recorrido }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            precioAsientoA
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.precioAsientoA }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            precioAsientoB
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.precioAsientoB }}
                    </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRecorridoAsientoPrecioShowStore } from "~~/stores/recorridoasientoprecio/show";
import { useRecorridoAsientoPrecioDeleteStore } from "~~/stores/recorridoasientoprecio/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { RecorridoAsientoPrecio } from "~~/types/recorridoasientoprecio";

const route = useRoute();
const router = useRouter();

const recorridoasientoprecioDeleteStore = useRecorridoAsientoPrecioDeleteStore();
const { error: deleteError, deleted } = storeToRefs(recorridoasientoprecioDeleteStore);

const recorridoasientoprecioShowStore = useRecorridoAsientoPrecioShowStore();

useMercureItem({
  store: recorridoasientoprecioShowStore,
  deleteStore: recorridoasientoprecioDeleteStore,
  redirectRouteName: "recorridoasientoprecios",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<RecorridoAsientoPrecio>(`api/recorrido_asiento_precios/${id}`);
recorridoasientoprecioShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    recorridoasientoprecioDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this recorridoasientoprecio?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      recorridoasientoprecioDeleteStore.setError(error.value);
      return;
    }

    recorridoasientoprecioDeleteStore.setDeleted(item.value);
    recorridoasientoprecioDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "recorridoasientoprecios" });
    }
  }
}

onBeforeUnmount(() => {
  recorridoasientoprecioShowStore.$reset();
});
</script>
