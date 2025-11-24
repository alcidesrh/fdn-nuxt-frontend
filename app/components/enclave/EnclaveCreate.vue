<template>
  <nuxt-link :to="{ name: 'enclaves' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Enclave</h1>

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
import Form from "~/components/enclave/EnclaveForm.vue";
import { useEnclaveCreateStore } from "~/stores/enclave/create";
import { useCreateItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Enclave } from "~/types/enclave";

const enclaveCreateStore = useEnclaveCreateStore();
const { created, isLoading, violations, error } = storeToRefs(enclaveCreateStore);

async function create(item: Enclave) {
  const data = await useCreateItem<Enclave>("enclaves", item);
  enclaveCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    enclaveCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "enclaves-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  enclaveCreateStore.$reset();
});
</script>
