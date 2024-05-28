<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'pilotos' }"
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

  <h1 class="text-3xl my-4">Edit Piloto {{ item?.["@id"] }}</h1>

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
import Form from "~~/components/piloto/PilotoForm.vue";
import { usePilotoUpdateStore } from "~~/stores/piloto/update";
import { usePilotoCreateStore } from "~~/stores/piloto/create";
import { usePilotoDeleteStore } from "~~/stores/piloto/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Piloto } from "~~/types/piloto";

const route = useRoute();
const router = useRouter();

const pilotoCreateStore = usePilotoCreateStore();
const { created } = storeToRefs(pilotoCreateStore);

const pilotoDeleteStore = usePilotoDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(pilotoDeleteStore);

const pilotoUpdateStore = usePilotoUpdateStore();

useMercureItem({
  store: pilotoUpdateStore,
  deleteStore: pilotoDeleteStore,
  redirectRouteName: "pilotos",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Piloto | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Piloto>(`api/pilotos/${id}`);
pilotoUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Piloto) {
  if (!item?.value) {
    pilotoUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Piloto>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  pilotoUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    pilotoDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this piloto?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      pilotoDeleteStore.setError(error.value);
      return;
    }

    pilotoDeleteStore.setLoading(Boolean(isLoading?.value));
    pilotoDeleteStore.setDeleted(item.value);
    pilotoDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "pilotos" });
    }
  }
}

onBeforeUnmount(() => {
  pilotoUpdateStore.$reset();
  pilotoCreateStore.$reset();
  pilotoDeleteStore.$reset();
});
</script>
