<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'boletologs' }"
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

  <h1 class="text-3xl my-4">Edit BoletoLog {{ item?.["@id"] }}</h1>

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
import Form from "~~/components/boletolog/BoletoLogForm.vue";
import { useBoletoLogUpdateStore } from "~~/stores/boletolog/update";
import { useBoletoLogCreateStore } from "~~/stores/boletolog/create";
import { useBoletoLogDeleteStore } from "~~/stores/boletolog/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { BoletoLog } from "~~/types/boletolog";

const route = useRoute();
const router = useRouter();

const boletologCreateStore = useBoletoLogCreateStore();
const { created } = storeToRefs(boletologCreateStore);

const boletologDeleteStore = useBoletoLogDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(boletologDeleteStore);

const boletologUpdateStore = useBoletoLogUpdateStore();

useMercureItem({
  store: boletologUpdateStore,
  deleteStore: boletologDeleteStore,
  redirectRouteName: "boletologs",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<BoletoLog | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<BoletoLog>(`api/boleto_logs/${id}`);
boletologUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: BoletoLog) {
  if (!item?.value) {
    boletologUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<BoletoLog>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  boletologUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    boletologDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this boletolog?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      boletologDeleteStore.setError(error.value);
      return;
    }

    boletologDeleteStore.setLoading(Boolean(isLoading?.value));
    boletologDeleteStore.setDeleted(item.value);
    boletologDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "boletologs" });
    }
  }
}

onBeforeUnmount(() => {
  boletologUpdateStore.$reset();
  boletologCreateStore.$reset();
  boletologDeleteStore.$reset();
});
</script>
