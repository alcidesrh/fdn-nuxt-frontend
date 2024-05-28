<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'ventas' }"
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

  <h1 class="text-3xl my-4">Edit Venta {{ item?.["@id"] }}</h1>

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
import Form from "~~/components/venta/VentaForm.vue";
import { useVentaUpdateStore } from "~~/stores/venta/update";
import { useVentaCreateStore } from "~~/stores/venta/create";
import { useVentaDeleteStore } from "~~/stores/venta/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Venta } from "~~/types/venta";

const route = useRoute();
const router = useRouter();

const ventaCreateStore = useVentaCreateStore();
const { created } = storeToRefs(ventaCreateStore);

const ventaDeleteStore = useVentaDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(ventaDeleteStore);

const ventaUpdateStore = useVentaUpdateStore();

useMercureItem({
  store: ventaUpdateStore,
  deleteStore: ventaDeleteStore,
  redirectRouteName: "ventas",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Venta | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Venta>(`api/ventas/${id}`);
ventaUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Venta) {
  if (!item?.value) {
    ventaUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Venta>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  ventaUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    ventaDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this venta?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      ventaDeleteStore.setError(error.value);
      return;
    }

    ventaDeleteStore.setLoading(Boolean(isLoading?.value));
    ventaDeleteStore.setDeleted(item.value);
    ventaDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "ventas" });
    }
  }
}

onBeforeUnmount(() => {
  ventaUpdateStore.$reset();
  ventaCreateStore.$reset();
  ventaDeleteStore.$reset();
});
</script>
