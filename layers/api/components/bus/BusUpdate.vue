<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'buss' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Bus {{ item?.["@id"] }}</h1>

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
import Form from "~~/components/bus/BusForm.vue";
import { useBusUpdateStore } from "~~/stores/bus/update";
import { useBusCreateStore } from "~~/stores/bus/create";
import { useBusDeleteStore } from "~~/stores/bus/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Bus } from "~~/types/bus";

const route = useRoute();
const router = useRouter();

const busCreateStore = useBusCreateStore();
const { created } = storeToRefs(busCreateStore);

const busDeleteStore = useBusDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(busDeleteStore);

const busUpdateStore = useBusUpdateStore();

useMercureItem({
  store: busUpdateStore,
  deleteStore: busDeleteStore,
  redirectRouteName: "buss",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Bus | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Bus>(`api/buses/${id}`);
busUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Bus) {
  if (!item?.value) {
    busUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Bus>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  busUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    busDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this bus?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      busDeleteStore.setError(error.value);
      return;
    }

    busDeleteStore.setLoading(Boolean(isLoading?.value));
    busDeleteStore.setDeleted(item.value);
    busDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "buss" });
    }
  }
}

onBeforeUnmount(() => {
  busUpdateStore.$reset();
  busCreateStore.$reset();
  busDeleteStore.$reset();
});
</script>
