<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'nacions' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Nacion {{ item?.["@id"] }}</h1>

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
import Form from "~/components/nacion/NacionForm.vue";
import { useNacionUpdateStore } from "~/stores/nacion/update";
import { useNacionCreateStore } from "~/stores/nacion/create";
import { useNacionDeleteStore } from "~/stores/nacion/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~/composables/api";
import { SubmissionErrors } from "~/types/error";
import type { Nacion } from "~/types/nacion";

const route = useRoute();
const router = useRouter();

const nacionCreateStore = useNacionCreateStore();
const { created } = storeToRefs(nacionCreateStore);

const nacionDeleteStore = useNacionDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(nacionDeleteStore);

const nacionUpdateStore = useNacionUpdateStore();

useMercureItem({
  store: nacionUpdateStore,
  deleteStore: nacionDeleteStore,
  redirectRouteName: "nacions",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Nacion | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Nacion>(`nacions/${id}`);
nacionUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Nacion) {
  if (!item?.value) {
    nacionUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Nacion>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  nacionUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    nacionDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this nacion?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      nacionDeleteStore.setError(error.value);
      return;
    }

    nacionDeleteStore.setLoading(Boolean(isLoading?.value));
    nacionDeleteStore.setDeleted(item.value);
    nacionDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "nacions" });
    }
  }
}

onBeforeUnmount(() => {
  nacionUpdateStore.$reset();
  nacionCreateStore.$reset();
  nacionDeleteStore.$reset();
});
</script>
