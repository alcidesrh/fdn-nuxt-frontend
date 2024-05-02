<template>
  <nuxt-link :to="{ name: 'pilotos' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Piloto</h1>

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
import Form from "~~/components/piloto/PilotoForm.vue";
import { usePilotoCreateStore } from "~~/stores/piloto/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Piloto } from "~~/types/piloto";

const pilotoCreateStore = usePilotoCreateStore();
const { created, isLoading, violations, error } = storeToRefs(pilotoCreateStore);

async function create(item: Piloto) {
  const data = await useCreateItem<Piloto>("api/pilotos", item);
  pilotoCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    pilotoCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "pilotos-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  pilotoCreateStore.$reset();
});
</script>
