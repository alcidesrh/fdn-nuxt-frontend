<template>
  <nuxt-link :to="{ name: 'buss' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Bus</h1>

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
import Form from "~/components/bus/BusForm.vue";
import { useBusCreateStore } from "~/stores/bus/create";
import { useCreateItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Bus } from "~/types/bus";

const busCreateStore = useBusCreateStore();
const { created, isLoading, violations, error } = storeToRefs(busCreateStore);

async function create(item: Bus) {
  const data = await useCreateItem<Bus>("buses", item);
  busCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    busCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "buss-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  busCreateStore.$reset();
});
</script>
