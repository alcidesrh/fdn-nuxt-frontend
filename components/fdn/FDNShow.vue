<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'fdns' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'fdns-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700"
      >
        Edit
      </nuxt-link>
      <button
        class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
        @click="deleteItem"
      >
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show FDN {{ item?.["@id"] }}</h1>

  <div
    v-if="isLoading"
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

  <div v-if="item" class="overflow-x-auto">
    <table class="min-w-full">
      <thead class="border-b">
        <tr>
          <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
            Field
          </th>
          <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useFDNShowStore } from "~~/stores/fdn/show";
import { useFDNDeleteStore } from "~~/stores/fdn/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { FDN } from "~~/types/fdn";

const route = useRoute();
const router = useRouter();

const fdnDeleteStore = useFDNDeleteStore();
const { error: deleteError, deleted } = storeToRefs(fdnDeleteStore);

const fdnShowStore = useFDNShowStore();

useMercureItem({
  store: fdnShowStore,
  deleteStore: fdnDeleteStore,
  redirectRouteName: "fdns",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<FDN>(`api/f_d_ns/${id}`);
fdnShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    fdnDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this fdn?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      fdnDeleteStore.setError(error.value);
      return;
    }

    fdnDeleteStore.setDeleted(item.value);
    fdnDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "fdns" });
    }
  }
}

onBeforeUnmount(() => {
  fdnShowStore.$reset();
});
</script>
