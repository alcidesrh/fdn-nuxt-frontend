<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'salidas' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link v-if="item" :to="{ name: 'salidas-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700">
        Edit
      </nuxt-link>
      <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Salida {{ item?.["@id"] }}</h1>

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
            fecha
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.fecha) }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            bus
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link v-if="router.hasRoute('buses-id')" :to="{ name: 'buss-id', params: { id: item.bus } }"
              class="text-blue-600 hover:text-blue-800">
              {{ item.bus }}
            </nuxt-link>

            <p v-else>
              {{ item.bus }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            recorrido
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link v-if="router.hasRoute('recorridos-id')"
              :to="{ name: 'recorridos-id', params: { id: item.recorrido } }" class="text-blue-600 hover:text-blue-800">
              {{ item.recorrido }}
            </nuxt-link>

            <p v-else>
              {{ item.recorrido }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            empresa
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link v-if="router.hasRoute('empresas-id')" :to="{ name: 'empresas-id', params: { id: item.empresa } }"
              class="text-blue-600 hover:text-blue-800">
              {{ item.empresa }}
            </nuxt-link>

            <p v-else>
              {{ item.empresa }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            salidaLogs
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('salida_logs-id')">
              <nuxt-link v-for="salidalog in item.salida_logs" :key="salidalog"
                :to="{ name: 'salidalogs-id', params: { id: salidalog } }" class="text-blue-600 hover:text-blue-800">
                {{ salidalog }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p v-for="salidalog in item.salida_logs" :key="salidalog">
                {{ salidalog }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            boletos
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('boletos-id')">
              <nuxt-link v-for="boleto in item.boletos" :key="boleto"
                :to="{ name: 'boletos-id', params: { id: boleto } }" class="text-blue-600 hover:text-blue-800">
                {{ boleto }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p v-for="boleto in item.boletos" :key="boleto">
                {{ boleto }}
              </p>
            </template>
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
import { useSalidaShowStore } from "~/stores/salida/show";
import { useSalidaDeleteStore } from "~/stores/salida/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Salida } from "~/types/salida";

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
