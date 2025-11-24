<template>
  <nuxt-link :to="{ name: 'asientos' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Asiento</h1>

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
import Form from "~/components/asiento/AsientoForm.vue";
import { useAsientoCreateStore } from "~/stores/asiento/create";
import { useCreateItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Asiento } from "~/types/asiento";

const asientoCreateStore = useAsientoCreateStore();
const { created, isLoading, violations, error } = storeToRefs(asientoCreateStore);

async function create(item: Asiento) {
  const data = await useCreateItem<Asiento>("asientos", item);
  asientoCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    asientoCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "asientos-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  asientoCreateStore.$reset();
});
</script>
