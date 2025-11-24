<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'paradas' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Parada {{ item?.["@id"] }}</h1>

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
import Form from "~/components/parada/ParadaForm.vue";
import { useParadaUpdateStore } from "~/stores/parada/update";
import { useParadaCreateStore } from "~/stores/parada/create";
import { useParadaDeleteStore } from "~/stores/parada/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~/composables/api";
import { SubmissionErrors } from "~/types/error";
import type { Parada } from "~/types/parada";

const route = useRoute();
const router = useRouter();

const paradaCreateStore = useParadaCreateStore();
const { created } = storeToRefs(paradaCreateStore);

const paradaDeleteStore = useParadaDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(paradaDeleteStore);

const paradaUpdateStore = useParadaUpdateStore();

useMercureItem({
  store: paradaUpdateStore,
  deleteStore: paradaDeleteStore,
  redirectRouteName: "paradas",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Parada | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Parada>(`paradas/${id}`);
paradaUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Parada) {
  if (!item?.value) {
    paradaUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Parada>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  paradaUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    paradaDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this parada?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      paradaDeleteStore.setError(error.value);
      return;
    }

    paradaDeleteStore.setLoading(Boolean(isLoading?.value));
    paradaDeleteStore.setDeleted(item.value);
    paradaDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "paradas" });
    }
  }
}

onBeforeUnmount(() => {
  paradaUpdateStore.$reset();
  paradaCreateStore.$reset();
  paradaDeleteStore.$reset();
});
</script>
