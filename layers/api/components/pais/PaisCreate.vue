<template>
  <nuxt-link :to="{ name: 'paiss' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Pais</h1>

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
import Form from "~~/components/pais/PaisForm.vue";
import { usePaisCreateStore } from "~~/stores/pais/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Pais } from "~~/types/pais";

const paisCreateStore = usePaisCreateStore();
const { created, isLoading, violations, error } = storeToRefs(paisCreateStore);

async function create(item: Pais) {
  const data = await useCreateItem<Pais>("paiss", item);
  paisCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    paisCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "paiss-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  paisCreateStore.$reset();
});
</script>
