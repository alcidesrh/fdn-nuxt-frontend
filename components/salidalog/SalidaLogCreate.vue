<template>
  <nuxt-link :to="{ name: 'salidalogs' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create SalidaLog</h1>

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
import Form from "~~/components/salidalog/SalidaLogForm.vue";
import { useSalidaLogCreateStore } from "~~/stores/salidalog/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { SalidaLog } from "~~/types/salidalog";

const salidalogCreateStore = useSalidaLogCreateStore();
const { created, isLoading, violations, error } = storeToRefs(salidalogCreateStore);

async function create(item: SalidaLog) {
  const data = await useCreateItem<SalidaLog>("api/salida_logs", item);
  salidalogCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    salidalogCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "salidalogs-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  salidalogCreateStore.$reset();
});
</script>
