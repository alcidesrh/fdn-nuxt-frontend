<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'fdns' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit FDN {{ item?.["@id"] }}</h1>

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
import Form from "~/components/fdn/FDNForm.vue";
import { useFDNUpdateStore } from "~/stores/fdn/update";
import { useFDNCreateStore } from "~/stores/fdn/create";
import { useFDNDeleteStore } from "~/stores/fdn/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~/composables/api";
import { SubmissionErrors } from "~/types/error";
import type { FDN } from "~/types/fdn";

const route = useRoute();
const router = useRouter();

const fdnCreateStore = useFDNCreateStore();
const { created } = storeToRefs(fdnCreateStore);

const fdnDeleteStore = useFDNDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(fdnDeleteStore);

const fdnUpdateStore = useFDNUpdateStore();

useMercureItem({
  store: fdnUpdateStore,
  deleteStore: fdnDeleteStore,
  redirectRouteName: "fdns",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<FDN | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<FDN>(`f_d_ns/${id}`);
fdnUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: FDN) {
  if (!item?.value) {
    fdnUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<FDN>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  fdnUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    fdnDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this fdn?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      fdnDeleteStore.setError(error.value);
      return;
    }

    fdnDeleteStore.setLoading(Boolean(isLoading?.value));
    fdnDeleteStore.setDeleted(item.value);
    fdnDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "fdns" });
    }
  }
}

onBeforeUnmount(() => {
  fdnUpdateStore.$reset();
  fdnCreateStore.$reset();
  fdnDeleteStore.$reset();
});
</script>
