<template>
  <nuxt-link :to="{ name: 'menuitems' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>

  <h1 class="text-3xl my-4">Create MenuItem</h1>

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
import Form from "~~/components/menuitem/MenuItemForm.vue";
import { useMenuItemCreateStore } from "~~/stores/menuitem/create";
import { useCreateItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { MenuItem } from "~~/types/menuitem";

const menuitemCreateStore = useMenuItemCreateStore();
const { created, isLoading, violations, error } = storeToRefs(menuitemCreateStore);

async function create(item: MenuItem) {
  const data = await useCreateItem<MenuItem>("menu_items", item);
  menuitemCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    menuitemCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "menuitems-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

onBeforeUnmount(() => {
  menuitemCreateStore.$reset();
});
</script>
