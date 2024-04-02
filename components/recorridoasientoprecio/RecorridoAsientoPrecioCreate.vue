<template>
  <nuxt-link :to="{ name: 'recorridoasientoprecios' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create RecorridoAsientoPrecio</h1>

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
import Form from "~~/components/recorridoasientoprecio/RecorridoAsientoPrecioForm.vue";
import { useRecorridoAsientoPrecioCreateStore } from "~~/stores/recorridoasientoprecio/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { RecorridoAsientoPrecio } from "~~/types/recorridoasientoprecio";

const recorridoasientoprecioCreateStore = useRecorridoAsientoPrecioCreateStore();
const { created, isLoading, violations, error } = storeToRefs(recorridoasientoprecioCreateStore);

async function create(item: RecorridoAsientoPrecio) {
  const data = await useCreateItem<RecorridoAsientoPrecio>("recorrido_asiento_precios", item);
  recorridoasientoprecioCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    recorridoasientoprecioCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "recorridoasientoprecios-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  recorridoasientoprecioCreateStore.$reset();
});
</script>
