<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'paiss' }"
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

  <h1 class="text-3xl my-4">Edit Pais {{ item?.["@id"] }}</h1>

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
import Form from "~~/components/pais/PaisForm.vue";
import { usePaisUpdateStore } from "~~/stores/pais/update";
import { usePaisCreateStore } from "~~/stores/pais/create";
import { usePaisDeleteStore } from "~~/stores/pais/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Pais } from "~~/types/pais";

const route = useRoute();
const router = useRouter();

const paisCreateStore = usePaisCreateStore();
const { created } = storeToRefs(paisCreateStore);

const paisDeleteStore = usePaisDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(paisDeleteStore);

const paisUpdateStore = usePaisUpdateStore();

useMercureItem({
  store: paisUpdateStore,
  deleteStore: paisDeleteStore,
  redirectRouteName: "paiss",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Pais | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Pais>(`pais/${id}`);
paisUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Pais) {
  if (!item?.value) {
    paisUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Pais>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  paisUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    paisDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this pais?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      paisDeleteStore.setError(error.value);
      return;
    }

    paisDeleteStore.setLoading(Boolean(isLoading?.value));
    paisDeleteStore.setDeleted(item.value);
    paisDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "paiss" });
    }
  }
}

onBeforeUnmount(() => {
  paisUpdateStore.$reset();
  paisCreateStore.$reset();
  paisDeleteStore.$reset();
});
</script>
