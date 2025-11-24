<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'recorridos' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Recorrido {{ item?.["@id"] }}</h1>

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
import Form from "~/components/recorrido/RecorridoForm.vue";
import { useRecorridoUpdateStore } from "~/stores/recorrido/update";
import { useRecorridoCreateStore } from "~/stores/recorrido/create";
import { useRecorridoDeleteStore } from "~/stores/recorrido/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~/composables/api";
import { SubmissionErrors } from "~/types/error";
import type { Recorrido } from "~/types/recorrido";

const route = useRoute();
const router = useRouter();

const recorridoCreateStore = useRecorridoCreateStore();
const { created } = storeToRefs(recorridoCreateStore);

const recorridoDeleteStore = useRecorridoDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(recorridoDeleteStore);

const recorridoUpdateStore = useRecorridoUpdateStore();

useMercureItem({
  store: recorridoUpdateStore,
  deleteStore: recorridoDeleteStore,
  redirectRouteName: "recorridos",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Recorrido | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Recorrido>(`recorridos/${id}`);
recorridoUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Recorrido) {
  if (!item?.value) {
    recorridoUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Recorrido>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  recorridoUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    recorridoDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this recorrido?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      recorridoDeleteStore.setError(error.value);
      return;
    }

    recorridoDeleteStore.setLoading(Boolean(isLoading?.value));
    recorridoDeleteStore.setDeleted(item.value);
    recorridoDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "recorridos" });
    }
  }
}

onBeforeUnmount(() => {
  recorridoUpdateStore.$reset();
  recorridoCreateStore.$reset();
  recorridoDeleteStore.$reset();
});
</script>
