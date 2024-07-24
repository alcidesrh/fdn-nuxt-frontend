<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'taxons' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link v-if="item" :to="{ name: 'taxons-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700">
        Edit
      </nuxt-link>
      <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Taxon {{ item?.["@id"] }}</h1>

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
            parent
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link v-if="router.hasRoute('api/taxa-id')" :to="{ name: 'taxons-id', params: { id: item.taxon } }"
              class="text-blue-600 hover:text-blue-800">
              {{ item.taxon }}
            </nuxt-link>

            <p v-else>
              {{ item.taxon }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            posicion
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.posicion }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            children
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('api/taxa-id')">
              <nuxt-link v-for="taxon in item.api / taxa" :key="taxon" :to="{ name: 'taxons-id', params: { id: taxon } }"
                class="text-blue-600 hover:text-blue-800">
                {{ taxon }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p v-for="taxon in item.api / taxa" :key="taxon">
                {{ taxon }}
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
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTaxonShowStore } from "~~/stores/taxon/show";
import { useTaxonDeleteStore } from "~~/stores/taxon/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Taxon } from "~~/types/taxon";

const route = useRoute();
const router = useRouter();

const taxonDeleteStore = useTaxonDeleteStore();
const { error: deleteError, deleted } = storeToRefs(taxonDeleteStore);

const taxonShowStore = useTaxonShowStore();

useMercureItem({
  store: taxonShowStore,
  deleteStore: taxonDeleteStore,
  redirectRouteName: "taxons",
});

const id = decodeURIComponent(route.params.id as string);
// const {
//   retrieved: item,
//   isLoading,
//   error,
//   hubUrl,
// } = await useFetchItem<Taxon>(`api/taxa/${id}`);
// taxonShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    taxonDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this taxon?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      taxonDeleteStore.setError(error.value);
      return;
    }

    taxonDeleteStore.setDeleted(item.value);
    taxonDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "taxons" });
    }
  }
}

onBeforeUnmount(() => {
  taxonShowStore.$reset();
});
</script>
