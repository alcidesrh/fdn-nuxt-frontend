<template>
  <nuxt-link :to="{ name: 'fdns' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create FDN</h1>

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
import Form from "~/components/fdn/FDNForm.vue";
import { useFDNCreateStore } from "~/stores/fdn/create";
import { useCreateItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { FDN } from "~/types/fdn";

const fdnCreateStore = useFDNCreateStore();
const { created, isLoading, violations, error } = storeToRefs(fdnCreateStore);

async function create(item: FDN) {
  const data = await useCreateItem<FDN>("f_d_ns", item);
  fdnCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    fdnCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "fdns-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  fdnCreateStore.$reset();
});
</script>
