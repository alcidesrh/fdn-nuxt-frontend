<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'permisos' }"
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

  <h1 class="text-3xl my-4">Edit Permiso {{ item?.["@id"] }}</h1>

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
import Form from "~~/components/permiso/PermisoForm.vue";
import { usePermisoUpdateStore } from "~~/stores/permiso/update";
import { usePermisoCreateStore } from "~~/stores/permiso/create";
import { usePermisoDeleteStore } from "~~/stores/permiso/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Permiso } from "~~/types/permiso";

const route = useRoute();
const router = useRouter();

const permisoCreateStore = usePermisoCreateStore();
const { created } = storeToRefs(permisoCreateStore);

const permisoDeleteStore = usePermisoDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(permisoDeleteStore);

const permisoUpdateStore = usePermisoUpdateStore();

useMercureItem({
  store: permisoUpdateStore,
  deleteStore: permisoDeleteStore,
  redirectRouteName: "permisos",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Permiso | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Permiso>(`api/permisos/${id}`);
permisoUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Permiso) {
  if (!item?.value) {
    permisoUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Permiso>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  permisoUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    permisoDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this permiso?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      permisoDeleteStore.setError(error.value);
      return;
    }

    permisoDeleteStore.setLoading(Boolean(isLoading?.value));
    permisoDeleteStore.setDeleted(item.value);
    permisoDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "permisos" });
    }
  }
}

onBeforeUnmount(() => {
  permisoUpdateStore.$reset();
  permisoCreateStore.$reset();
  permisoDeleteStore.$reset();
});
</script>
