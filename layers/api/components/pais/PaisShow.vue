<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'paiss' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'paiss-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Pais {{ item?.["@id"] }}</h1>

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
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            nombre
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nombre }}
                    </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { usePaisShowStore } from "~~/stores/pais/show";
import { usePaisDeleteStore } from "~~/stores/pais/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Pais } from "~~/types/pais";

const route = useRoute();
const router = useRouter();

const paisDeleteStore = usePaisDeleteStore();
const { error: deleteError, deleted } = storeToRefs(paisDeleteStore);

const paisShowStore = usePaisShowStore();

useMercureItem({
  store: paisShowStore,
  deleteStore: paisDeleteStore,
  redirectRouteName: "paiss",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Pais>(`api/pais/${id}`);
paisShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    paisDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this pais?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      paisDeleteStore.setError(error.value);
      return;
    }

    paisDeleteStore.setDeleted(item.value);
    paisDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "paiss" });
    }
  }
}

onBeforeUnmount(() => {
  paisShowStore.$reset();
});
</script>
