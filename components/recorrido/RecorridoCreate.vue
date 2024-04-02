<template>
  <nuxt-link :to="{ name: 'recorridos' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Recorrido</h1>

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
import Form from "~~/components/recorrido/RecorridoForm.vue";
import { useRecorridoCreateStore } from "~~/stores/recorrido/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Recorrido } from "~~/types/recorrido";

const recorridoCreateStore = useRecorridoCreateStore();
const { created, isLoading, violations, error } = storeToRefs(recorridoCreateStore);

async function create(item: Recorrido) {
  const data = await useCreateItem<Recorrido>("recorridos", item);
  recorridoCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    recorridoCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "recorridos-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  recorridoCreateStore.$reset();
});
</script>
