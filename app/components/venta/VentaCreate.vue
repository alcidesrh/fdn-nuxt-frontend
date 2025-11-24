<template>
  <nuxt-link :to="{ name: 'ventas' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Venta</h1>

  <div v-if="isLoading" class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm" role="status">
    Loading...
  </div>

  <div v-if="error" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm" role="alert">
    {{ error }}
  </div>

  <Form :errors="violations" @submit="create" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import Form from "~/components/venta/VentaForm.vue";
import { useVentaCreateStore } from "~/stores/venta/create";
import { useCreateItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Venta } from "~/types/venta";

const ventaCreateStore = useVentaCreateStore();
const { created, isLoading, violations, error } = storeToRefs(ventaCreateStore);

async function create(item: Venta) {
  const data = await useCreateItem<Venta>("ventas", item);
  ventaCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    ventaCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "ventas-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  ventaCreateStore.$reset();
});
</script>
