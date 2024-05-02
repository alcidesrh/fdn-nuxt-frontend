<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'facturas' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'facturas-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Factura {{ item?.["@id"] }}</h1>

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
            dte
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.dte }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            uuid
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.uuid }}
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
            serie
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.serie }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            venta
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link
              v-if="router.hasRoute('api/ventas-id')"
              :to="{ name: 'ventas-id', params: { id: item.venta } }"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ item.venta }}
            </nuxt-link>

            <p v-else>
              {{ item.venta }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            createdAt
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.createdAt) }}
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            updatedAt
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.updatedAt) }}
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
import { useFacturaShowStore } from "~~/stores/factura/show";
import { useFacturaDeleteStore } from "~~/stores/factura/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Factura } from "~~/types/factura";

const route = useRoute();
const router = useRouter();

const facturaDeleteStore = useFacturaDeleteStore();
const { error: deleteError, deleted } = storeToRefs(facturaDeleteStore);

const facturaShowStore = useFacturaShowStore();

useMercureItem({
  store: facturaShowStore,
  deleteStore: facturaDeleteStore,
  redirectRouteName: "facturas",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Factura>(`api/facturas/${id}`);
facturaShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    facturaDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this factura?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      facturaDeleteStore.setError(error.value);
      return;
    }

    facturaDeleteStore.setDeleted(item.value);
    facturaDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "facturas" });
    }
  }
}

onBeforeUnmount(() => {
  facturaShowStore.$reset();
});
</script>
