<template>
  <nuxt-link :to="{ name: 'estacions' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Estacion</h1>

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
import Form from "~~/components/estacion/EstacionForm.vue";
import { useEstacionCreateStore } from "~~/stores/estacion/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Estacion } from "~~/types/estacion";

const estacionCreateStore = useEstacionCreateStore();
const { created, isLoading, violations, error } = storeToRefs(estacionCreateStore);

async function create(item: Estacion) {
  const data = await useCreateItem<Estacion>("estacions", item);
  estacionCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    estacionCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "estacions-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  estacionCreateStore.$reset();
});
</script>
