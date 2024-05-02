<template>
  <nuxt-link :to="{ name: 'facturas' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Factura</h1>

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
import Form from "~~/components/factura/FacturaForm.vue";
import { useFacturaCreateStore } from "~~/stores/factura/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Factura } from "~~/types/factura";

const facturaCreateStore = useFacturaCreateStore();
const { created, isLoading, violations, error } = storeToRefs(facturaCreateStore);

async function create(item: Factura) {
  const data = await useCreateItem<Factura>("api/facturas", item);
  facturaCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    facturaCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "facturas-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  facturaCreateStore.$reset();
});
</script>
