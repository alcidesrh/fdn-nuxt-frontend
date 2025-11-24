<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'recorridos' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link v-if="item" :to="{ name: 'recorridos-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700">
        Edit
      </nuxt-link>
      <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Recorrido {{ item?.["@id"] }}</h1>

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
            tiempo
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.tiempo) }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            distancia
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.distancia }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            inicio
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.inicio }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            final
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.final }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            paradas
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('paradas-id')">
              <nuxt-link v-for="parada in item.paradas" :key="parada['@id']"
                :to="{ name: 'paradas-id', params: { id: getIdFromIri(parada['@id']) } }"
                class="text-blue-600 hover:text-blue-800">
                {{ parada["@id"] }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p v-for="parada in item.paradas" :key="parada['@id']">
                {{ parada["@id"] }}
              </p>
            </template>
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
            legacyId
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.legacyId }}
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
import { useRecorridoShowStore } from "~/stores/recorrido/show";
import { useRecorridoDeleteStore } from "~/stores/recorrido/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Recorrido } from "~/types/recorrido";

const route = useRoute();
const router = useRouter();

const recorridoDeleteStore = useRecorridoDeleteStore();
const { error: deleteError, deleted } = storeToRefs(recorridoDeleteStore);

const recorridoShowStore = useRecorridoShowStore();

useMercureItem({
  store: recorridoShowStore,
  deleteStore: recorridoDeleteStore,
  redirectRouteName: "recorridos",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Recorrido>(`recorridos/${id}`);
recorridoShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    recorridoDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this recorrido?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      recorridoDeleteStore.setError(error.value);
      return;
    }

    recorridoDeleteStore.setDeleted(item.value);
    recorridoDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "recorridos" });
    }
  }
}

onBeforeUnmount(() => {
  recorridoShowStore.$reset();
});
</script>
