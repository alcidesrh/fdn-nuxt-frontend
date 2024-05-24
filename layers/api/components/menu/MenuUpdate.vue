<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'menus' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Menu {{ item?.["@id"] }}</h1>

  <div v-if="isLoading || deleteLoading" class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm" role="status">
    Loading...
  </div>

  <div v-if="error || deleteError" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm" role="alert">
    {{ error || deleteError }}
  </div>

  <div v-if="created || updated" class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm" role="status">
    <template v-if="updated">{{ updated["@id"] }} updated.</template>
    <template v-else-if="created">{{ created["@id"] }} created.</template>
  </div>

  <Form :values="item" :errors="violations" @submit="update" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import Form from "~~/components/menu/MenuForm.vue";
import { useMenuUpdateStore } from "~~/stores/menu/update";
import { useMenuCreateStore } from "~~/stores/menu/create";
import { useMenuDeleteStore } from "~~/stores/menu/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Menu } from "~~/types/menu";

const route = useRoute();
const router = useRouter();

const menuCreateStore = useMenuCreateStore();
const { created } = storeToRefs(menuCreateStore);

const menuDeleteStore = useMenuDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(menuDeleteStore);

const menuUpdateStore = useMenuUpdateStore();

useMercureItem({
  store: menuUpdateStore,
  deleteStore: menuDeleteStore,
  redirectRouteName: "menus",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Menu | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Menu>(`api/menus/${id}`);
menuUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Menu) {
  if (!item?.value) {
    menuUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Menu>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  menuUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    menuDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this menu?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      menuDeleteStore.setError(error.value);
      return;
    }

    menuDeleteStore.setLoading(Boolean(isLoading?.value));
    menuDeleteStore.setDeleted(item.value);
    menuDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "menus" });
    }
  }
}

onBeforeUnmount(() => {
  menuUpdateStore.$reset();
  menuCreateStore.$reset();
  menuDeleteStore.$reset();
});
</script>
