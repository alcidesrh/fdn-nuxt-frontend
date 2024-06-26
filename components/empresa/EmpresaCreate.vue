<template>
  <nuxt-link :to="{ name: 'empresas' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Empresa</h1>

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
import Form from "~~/components/empresa/EmpresaForm.vue";
import { useEmpresaCreateStore } from "~~/stores/empresa/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Empresa } from "~~/types/empresa";

const empresaCreateStore = useEmpresaCreateStore();
const { created, isLoading, violations, error } = storeToRefs(empresaCreateStore);

async function create(item: Empresa) {
  const data = await useCreateItem<Empresa>("api/empresas", item);
  empresaCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    empresaCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "empresas-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  empresaCreateStore.$reset();
});
</script>
