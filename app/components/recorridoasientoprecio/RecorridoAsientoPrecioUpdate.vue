<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'recorridoasientoprecios' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit RecorridoAsientoPrecio {{ item?.["@id"] }}</h1>

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
import Form from "~/components/recorridoasientoprecio/RecorridoAsientoPrecioForm.vue";
import { useRecorridoAsientoPrecioUpdateStore } from "~/stores/recorridoasientoprecio/update";
import { useRecorridoAsientoPrecioCreateStore } from "~/stores/recorridoasientoprecio/create";
import { useRecorridoAsientoPrecioDeleteStore } from "~/stores/recorridoasientoprecio/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~/composables/api";
import { SubmissionErrors } from "~/types/error";
import type { RecorridoAsientoPrecio } from "~/types/recorridoasientoprecio";

const route = useRoute();
const router = useRouter();

const recorridoasientoprecioCreateStore = useRecorridoAsientoPrecioCreateStore();
const { created } = storeToRefs(recorridoasientoprecioCreateStore);

const recorridoasientoprecioDeleteStore = useRecorridoAsientoPrecioDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(recorridoasientoprecioDeleteStore);

const recorridoasientoprecioUpdateStore = useRecorridoAsientoPrecioUpdateStore();

useMercureItem({
  store: recorridoasientoprecioUpdateStore,
  deleteStore: recorridoasientoprecioDeleteStore,
  redirectRouteName: "recorridoasientoprecios",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<RecorridoAsientoPrecio | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<RecorridoAsientoPrecio>(`recorrido_asiento_precios/${id}`);
recorridoasientoprecioUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: RecorridoAsientoPrecio) {
  if (!item?.value) {
    recorridoasientoprecioUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<RecorridoAsientoPrecio>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  recorridoasientoprecioUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    recorridoasientoprecioDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this recorridoasientoprecio?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      recorridoasientoprecioDeleteStore.setError(error.value);
      return;
    }

    recorridoasientoprecioDeleteStore.setLoading(Boolean(isLoading?.value));
    recorridoasientoprecioDeleteStore.setDeleted(item.value);
    recorridoasientoprecioDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "recorridoasientoprecios" });
    }
  }
}

onBeforeUnmount(() => {
  recorridoasientoprecioUpdateStore.$reset();
  recorridoasientoprecioCreateStore.$reset();
  recorridoasientoprecioDeleteStore.$reset();
});
</script>
