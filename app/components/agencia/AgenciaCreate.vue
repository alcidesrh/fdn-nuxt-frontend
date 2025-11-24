<template>
  <nuxt-link :to="{ name: 'agencias' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Agencia</h1>

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
import Form from "~/components/agencia/AgenciaForm.vue";
import { useAgenciaCreateStore } from "~/stores/agencia/create";
import { useCreateItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Agencia } from "~/types/agencia";

const agenciaCreateStore = useAgenciaCreateStore();
const { created, isLoading, violations, error } = storeToRefs(agenciaCreateStore);

async function create(item: Agencia) {
  const data = await useCreateItem<Agencia>("agencias", item);
  agenciaCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    agenciaCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "agencias-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  agenciaCreateStore.$reset();
});
</script>
