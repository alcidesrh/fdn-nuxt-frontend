<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'salidalogs' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit SalidaLog {{ item?.["@id"] }}</h1>

  <div v-if="isLoading || deleteLoading" class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm" role="status">
    Loading...
  </div>

  <div v-if="error || deleteError" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm" role="alert">
    {{ error || deleteError }}
  </div>

  <div v-if="created || updated" class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm" role="status">
    <template v-if="updated">{{ updated["@id"] }} updated.</template>
    <template v-else-if="created">{{ created["@id"] }} created.</template>
  </div>

  <Form :values="item" :errors="violations" @submit="update" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import Form from "~~/components/salidalog/SalidaLogForm.vue";
import { useSalidaLogUpdateStore } from "~~/stores/salidalog/update";
import { useSalidaLogCreateStore } from "~~/stores/salidalog/create";
import { useSalidaLogDeleteStore } from "~~/stores/salidalog/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { SalidaLog } from "~~/types/salidalog";

const route = useRoute();
const router = useRouter();

const salidalogCreateStore = useSalidaLogCreateStore();
const { created } = storeToRefs(salidalogCreateStore);

const salidalogDeleteStore = useSalidaLogDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(salidalogDeleteStore);

const salidalogUpdateStore = useSalidaLogUpdateStore();

useMercureItem({
  store: salidalogUpdateStore,
  deleteStore: salidalogDeleteStore,
  redirectRouteName: "salidalogs",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<SalidaLog | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<SalidaLog>(`salida_logs/${id}`);
salidalogUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: SalidaLog) {
  if (!item?.value) {
    salidalogUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<SalidaLog>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  salidalogUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    salidalogDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this salidalog?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      salidalogDeleteStore.setError(error.value);
      return;
    }

    salidalogDeleteStore.setLoading(Boolean(isLoading?.value));
    salidalogDeleteStore.setDeleted(item.value);
    salidalogDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "salidalogs" });
    }
  }
}

onBeforeUnmount(() => {
  salidalogUpdateStore.$reset();
  salidalogCreateStore.$reset();
  salidalogDeleteStore.$reset();
});
</script>
