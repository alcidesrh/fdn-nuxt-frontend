<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'menuitems' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <button
      class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
      @click="deleteItem"
    >
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit MenuItem {{ item?.["@id"] }}</h1>

  <div
    v-if="isLoading || deleteLoading"
    class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm"
    role="status"
  >
    Loading...
  </div>

  <div
    v-if="error || deleteError"
    class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
    role="alert"
  >
    {{ error || deleteError }}
  </div>

  <div
    v-if="created || updated"
    class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm"
    role="status"
  >
    <template v-if="updated">{{ updated["@id"] }} updated.</template>
    <template v-else-if="created">{{ created["@id"] }} created.</template>
  </div>

  <Form :values="item" :errors="violations" @submit="update" />
</template>

<script lang="ts" setup>
import { Ref } from "vue";
import { storeToRefs } from "pinia";
import Form from "~~/components/menuitem/MenuItemForm.vue";
import { useMenuItemUpdateStore } from "~~/stores/menuitem/update";
import { useMenuItemCreateStore } from "~~/stores/menuitem/create";
import { useMenuItemDeleteStore } from "~~/stores/menuitem/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { MenuItem } from "~~/types/menuitem";

const route = useRoute();
const router = useRouter();

const menuitemCreateStore = useMenuItemCreateStore();
const { created } = storeToRefs(menuitemCreateStore);

const menuitemDeleteStore = useMenuItemDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(menuitemDeleteStore);

const menuitemUpdateStore = useMenuItemUpdateStore();

useMercureItem({
  store: menuitemUpdateStore,
  deleteStore: menuitemDeleteStore,
  redirectRouteName: "menuitems",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<MenuItem | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<MenuItem>(`api/menu_items/${id}`);
menuitemUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: MenuItem) {
  if (!item?.value) {
    menuitemUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<MenuItem>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  menuitemUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    menuitemDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this menuitem?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      menuitemDeleteStore.setError(error.value);
      return;
    }

    menuitemDeleteStore.setLoading(Boolean(isLoading?.value));
    menuitemDeleteStore.setDeleted(item.value);
    menuitemDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "menuitems" });
    }
  }
}

onBeforeUnmount(() => {
  menuitemUpdateStore.$reset();
  menuitemCreateStore.$reset();
  menuitemDeleteStore.$reset();
});
</script>
