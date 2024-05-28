<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'taxons' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <button
      class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
      @click="deleteItem"
    >
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Taxon {{ item?.["@id"] }}</h1>

  <div
    v-if="isLoading || deleteLoading"
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

  <div
    v-if="created || updated"
    class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm"
    role="status"
  >
    <template v-if="updated">{{ updated["@id"] }} updated.</template>
    <template v-else-if="created">{{ created["@id"] }} created.</template>
  </div>

  <Form :values="item" :errors="violations" @submit="update" />
</template>

<script lang="ts" setup>
import { Ref } from "vue";
import { storeToRefs } from "pinia";
import Form from "~~/components/taxon/TaxonForm.vue";
import { useTaxonUpdateStore } from "~~/stores/taxon/update";
import { useTaxonCreateStore } from "~~/stores/taxon/create";
import { useTaxonDeleteStore } from "~~/stores/taxon/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Taxon } from "~~/types/taxon";

const route = useRoute();
const router = useRouter();

const taxonCreateStore = useTaxonCreateStore();
const { created } = storeToRefs(taxonCreateStore);

const taxonDeleteStore = useTaxonDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(taxonDeleteStore);

const taxonUpdateStore = useTaxonUpdateStore();

useMercureItem({
  store: taxonUpdateStore,
  deleteStore: taxonDeleteStore,
  redirectRouteName: "taxons",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Taxon | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Taxon>(`api/taxa/${id}`);
taxonUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Taxon) {
  if (!item?.value) {
    taxonUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Taxon>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  taxonUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    taxonDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this taxon?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      taxonDeleteStore.setError(error.value);
      return;
    }

    taxonDeleteStore.setLoading(Boolean(isLoading?.value));
    taxonDeleteStore.setDeleted(item.value);
    taxonDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "taxons" });
    }
  }
}

onBeforeUnmount(() => {
  taxonUpdateStore.$reset();
  taxonCreateStore.$reset();
  taxonDeleteStore.$reset();
});
</script>
