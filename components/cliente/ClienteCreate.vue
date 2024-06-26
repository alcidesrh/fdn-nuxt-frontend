<template>
  <nuxt-link :to="{ name: 'clientes' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Cliente</h1>

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
import Form from "~~/components/cliente/ClienteForm.vue";
import { useClienteCreateStore } from "~~/stores/cliente/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Cliente } from "~~/types/cliente";

const clienteCreateStore = useClienteCreateStore();
const { created, isLoading, violations, error } = storeToRefs(clienteCreateStore);

async function create(item: Cliente) {
  const data = await useCreateItem<Cliente>("api/clientes", item);
  clienteCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    clienteCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "clientes-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  clienteCreateStore.$reset();
});
</script>
