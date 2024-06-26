<template>
  <nuxt-link :to="{ name: 'taxons' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Taxon</h1>

  <div
    v-if="isLoading"
    class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm"
    role="status"
  >
    Loading...
  </div>

  <div
    v-if="error"
    class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
    role="alert"
  >
    {{ error }}
  </div>

  <Form :errors="violations" @submit="create" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import Form from "~~/components/taxon/TaxonForm.vue";
import { useTaxonCreateStore } from "~~/stores/taxon/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Taxon } from "~~/types/taxon";

const taxonCreateStore = useTaxonCreateStore();
const { created, isLoading, violations, error } = storeToRefs(taxonCreateStore);

async function create(item: Taxon) {
  const data = await useCreateItem<Taxon>("api/taxa", item);
  taxonCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    taxonCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "taxons-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  taxonCreateStore.$reset();
});
</script>
