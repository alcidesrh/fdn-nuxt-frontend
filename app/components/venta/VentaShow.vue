<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'ventas' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link v-if="item" :to="{ name: 'ventas-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700">
        Edit
      </nuxt-link>
      <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Venta {{ item?.["@id"] }}</h1>

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
            ida
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.ida }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            regreso
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.regreso }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            user
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link v-if="router.hasRoute('users-id')" :to="{ name: 'users-id', params: { id: item.user } }"
              class="text-blue-600 hover:text-blue-800">
              {{ item.user }}
            </nuxt-link>

            <p v-else>
              {{ item.user }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            precio
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.precio }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            factura
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link v-if="router.hasRoute('facturas-id')" :to="{ name: 'facturas-id', params: { id: item.factura } }"
              class="text-blue-600 hover:text-blue-800">
              {{ item.factura }}
            </nuxt-link>

            <p v-else>
              {{ item.factura }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            createdAt
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.createdAt) }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            updatedAt
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.updatedAt) }}
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
import { useVentaShowStore } from "~/stores/venta/show";
import { useVentaDeleteStore } from "~/stores/venta/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Venta } from "~/types/venta";

const route = useRoute();
const router = useRouter();

const ventaDeleteStore = useVentaDeleteStore();
const { error: deleteError, deleted } = storeToRefs(ventaDeleteStore);

const ventaShowStore = useVentaShowStore();

useMercureItem({
  store: ventaShowStore,
  deleteStore: ventaDeleteStore,
  redirectRouteName: "ventas",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Venta>(`ventas/${id}`);
ventaShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    ventaDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this venta?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      ventaDeleteStore.setError(error.value);
      return;
    }

    ventaDeleteStore.setDeleted(item.value);
    ventaDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "ventas" });
    }
  }
}

onBeforeUnmount(() => {
  ventaShowStore.$reset();
});
</script>
