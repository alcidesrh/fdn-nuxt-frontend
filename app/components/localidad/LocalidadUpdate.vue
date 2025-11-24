<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'localidads' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Localidad {{ item?.["@id"] }}</h1>

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
import Form from "~/components/localidad/LocalidadForm.vue";
import { useLocalidadUpdateStore } from "~/stores/localidad/update";
import { useLocalidadCreateStore } from "~/stores/localidad/create";
import { useLocalidadDeleteStore } from "~/stores/localidad/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~/composables/api";
import { SubmissionErrors } from "~/types/error";
import type { Localidad } from "~/types/localidad";

const route = useRoute();
const router = useRouter();

const localidadCreateStore = useLocalidadCreateStore();
const { created } = storeToRefs(localidadCreateStore);

const localidadDeleteStore = useLocalidadDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(localidadDeleteStore);

const localidadUpdateStore = useLocalidadUpdateStore();

useMercureItem({
  store: localidadUpdateStore,
  deleteStore: localidadDeleteStore,
  redirectRouteName: "localidads",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Localidad | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Localidad>(`localidads/${id}`);
localidadUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Localidad) {
  if (!item?.value) {
    localidadUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Localidad>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  localidadUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    localidadDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this localidad?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      localidadDeleteStore.setError(error.value);
      return;
    }

    localidadDeleteStore.setLoading(Boolean(isLoading?.value));
    localidadDeleteStore.setDeleted(item.value);
    localidadDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "localidads" });
    }
  }
}

onBeforeUnmount(() => {
  localidadUpdateStore.$reset();
  localidadCreateStore.$reset();
  localidadDeleteStore.$reset();
});
</script>
