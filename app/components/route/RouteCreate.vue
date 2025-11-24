<template>
  <nuxt-link :to="{ name: 'routes' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Route</h1>

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
import Form from "~/components/route/RouteForm.vue";
import { useRouteCreateStore } from "~/stores/route/create";
import { useCreateItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Route } from "~/types/route";

const routeCreateStore = useRouteCreateStore();
const { created, isLoading, violations, error } = storeToRefs(routeCreateStore);

async function create(item: Route) {
  const data = await useCreateItem<Route>("routes", item);
  routeCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    routeCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "routes-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  routeCreateStore.$reset();
});
</script>
