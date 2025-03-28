<template>
  <nuxt-link :to="{ name: 'menus' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create Menu</h1>

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
import Form from "~~/components/menu/MenuForm.vue";
import { useMenuCreateStore } from "~~/stores/menu/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Menu } from "~~/types/menu";

const menuCreateStore = useMenuCreateStore();
const { created, isLoading, violations, error } = storeToRefs(menuCreateStore);

async function create(item: Menu) {
  const data = await useCreateItem<Menu>("api/menus", item);
  menuCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    menuCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "menus-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  menuCreateStore.$reset();
});
</script>
