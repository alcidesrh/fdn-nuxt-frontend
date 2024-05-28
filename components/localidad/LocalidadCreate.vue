<template>
  <nuxt-link :to="{ name: 'localidads' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Localidad</h1>

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
import Form from "~~/components/localidad/LocalidadForm.vue";
import { useLocalidadCreateStore } from "~~/stores/localidad/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Localidad } from "~~/types/localidad";

const localidadCreateStore = useLocalidadCreateStore();
const { created, isLoading, violations, error } = storeToRefs(localidadCreateStore);

async function create(item: Localidad) {
  const data = await useCreateItem<Localidad>("api/localidads", item);
  localidadCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    localidadCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "localidads-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  localidadCreateStore.$reset();
});
</script>
