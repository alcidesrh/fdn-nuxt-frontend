<template>
  <nuxt-link :to="{ name: 'boletologs' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create BoletoLog</h1>

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
import Form from "~~/components/boletolog/BoletoLogForm.vue";
import { useBoletoLogCreateStore } from "~~/stores/boletolog/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { BoletoLog } from "~~/types/boletolog";

const boletologCreateStore = useBoletoLogCreateStore();
const { created, isLoading, violations, error } = storeToRefs(boletologCreateStore);

async function create(item: BoletoLog) {
  const data = await useCreateItem<BoletoLog>("api/boleto_logs", item);
  boletologCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    boletologCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "boletologs-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  boletologCreateStore.$reset();
});
</script>
