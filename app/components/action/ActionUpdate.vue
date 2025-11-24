<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'actions' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Action {{ item?.["@id"] }}</h1>

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
import { Ref } from "vue";
import { storeToRefs } from "pinia";
import Form from "~/components/action/ActionForm.vue";
import { useActionUpdateStore } from "~/stores/action/update";
import { useActionCreateStore } from "~/stores/action/create";
import { useActionDeleteStore } from "~/stores/action/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~/composables/api";
import { SubmissionErrors } from "~/types/error";
import type { Action } from "~/types/action";

const route = useRoute();

const actionCreateStore = useActionCreateStore();
const { created } = storeToRefs(actionCreateStore);

const actionDeleteStore = useActionDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(actionDeleteStore);

const actionUpdateStore = useActionUpdateStore();

useMercureItem({
  store: actionUpdateStore,
  deleteStore: actionDeleteStore,
  redirectRouteName: "actions",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Action | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Action>(`actions/${id}`);
actionUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Action) {
  if (!item?.value) {
    actionUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Action>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  actionUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    actionDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this action?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      actionDeleteStore.setError(error.value);
      return;
    }

    actionDeleteStore.setLoading(Boolean(isLoading?.value));
    actionDeleteStore.setDeleted(item.value);
    actionDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "actions" });
    }
  }
}

onBeforeUnmount(() => {
  actionUpdateStore.$reset();
  actionCreateStore.$reset();
  actionDeleteStore.$reset();
});
</script>
