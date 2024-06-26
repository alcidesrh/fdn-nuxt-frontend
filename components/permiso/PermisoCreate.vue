<template>
  <nuxt-link :to="{ name: 'permisos' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Permiso</h1>

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
import Form from "~~/components/permiso/PermisoForm.vue";
import { usePermisoCreateStore } from "~~/stores/permiso/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Permiso } from "~~/types/permiso";

const permisoCreateStore = usePermisoCreateStore();
const { created, isLoading, violations, error } = storeToRefs(permisoCreateStore);

async function create(item: Permiso) {
  const data = await useCreateItem<Permiso>("api/permisos", item);
  permisoCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    permisoCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "permisos-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  permisoCreateStore.$reset();
});
</script>
