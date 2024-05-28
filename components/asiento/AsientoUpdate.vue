<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'asientos' }"
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

  <h1 class="text-3xl my-4">Edit Asiento {{ item?.["@id"] }}</h1>

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
import Form from "~~/components/asiento/AsientoForm.vue";
import { useAsientoUpdateStore } from "~~/stores/asiento/update";
import { useAsientoCreateStore } from "~~/stores/asiento/create";
import { useAsientoDeleteStore } from "~~/stores/asiento/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Asiento } from "~~/types/asiento";

const route = useRoute();
const router = useRouter();

const asientoCreateStore = useAsientoCreateStore();
const { created } = storeToRefs(asientoCreateStore);

const asientoDeleteStore = useAsientoDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(asientoDeleteStore);

const asientoUpdateStore = useAsientoUpdateStore();

useMercureItem({
  store: asientoUpdateStore,
  deleteStore: asientoDeleteStore,
  redirectRouteName: "asientos",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Asiento | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Asiento>(`api/asientos/${id}`);
asientoUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Asiento) {
  if (!item?.value) {
    asientoUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Asiento>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  asientoUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    asientoDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this asiento?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      asientoDeleteStore.setError(error.value);
      return;
    }

    asientoDeleteStore.setLoading(Boolean(isLoading?.value));
    asientoDeleteStore.setDeleted(item.value);
    asientoDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "asientos" });
    }
  }
}

onBeforeUnmount(() => {
  asientoUpdateStore.$reset();
  asientoCreateStore.$reset();
  asientoDeleteStore.$reset();
});
</script>
