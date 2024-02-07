<template>
  <nuxt-link :to="{ name: 'rutas' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Ruta</h1>

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
import Form from "~~/components/ruta/RutaForm.vue";
import { useRutaCreateStore } from "~~/stores/ruta/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Ruta } from "~~/types/ruta";

const rutaCreateStore = useRutaCreateStore();
const { created, isLoading, violations, error } = storeToRefs(rutaCreateStore);

async function create(item: Ruta) {
  const data = await useCreateItem<Ruta>("rutas", item);
  rutaCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    rutaCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "rutas-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  rutaCreateStore.$reset();
});
</script>
