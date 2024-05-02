<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'estacions' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Estacion {{ item?.["@id"] }}</h1>

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
import Form from "~~/components/estacion/EstacionForm.vue";
import { useEstacionUpdateStore } from "~~/stores/estacion/update";
import { useEstacionCreateStore } from "~~/stores/estacion/create";
import { useEstacionDeleteStore } from "~~/stores/estacion/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Estacion } from "~~/types/estacion";

const route = useRoute();
const router = useRouter();

const estacionCreateStore = useEstacionCreateStore();
const { created } = storeToRefs(estacionCreateStore);

const estacionDeleteStore = useEstacionDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(estacionDeleteStore);

const estacionUpdateStore = useEstacionUpdateStore();

useMercureItem({
  store: estacionUpdateStore,
  deleteStore: estacionDeleteStore,
  redirectRouteName: "estacions",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Estacion | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Estacion>(`api/estacions/${id}`);
estacionUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Estacion) {
  if (!item?.value) {
    estacionUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Estacion>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  estacionUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    estacionDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this estacion?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      estacionDeleteStore.setError(error.value);
      return;
    }

    estacionDeleteStore.setLoading(Boolean(isLoading?.value));
    estacionDeleteStore.setDeleted(item.value);
    estacionDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "estacions" });
    }
  }
}

onBeforeUnmount(() => {
  estacionUpdateStore.$reset();
  estacionCreateStore.$reset();
  estacionDeleteStore.$reset();
});
</script>
