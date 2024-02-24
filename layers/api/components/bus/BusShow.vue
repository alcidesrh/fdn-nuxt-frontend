<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'buss' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'buss-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Bus {{ item?.["@id"] }}</h1>

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
            asientosClaseA
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.asientosClaseA }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            asientosClaseB
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.asientosClaseB }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            codigo
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.codigo }}
                    </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBusShowStore } from "~~/stores/bus/show";
import { useBusDeleteStore } from "~~/stores/bus/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Bus } from "~~/types/bus";

const route = useRoute();
const router = useRouter();

const busDeleteStore = useBusDeleteStore();
const { error: deleteError, deleted } = storeToRefs(busDeleteStore);

const busShowStore = useBusShowStore();

useMercureItem({
  store: busShowStore,
  deleteStore: busDeleteStore,
  redirectRouteName: "buss",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Bus>(`buses/${id}`);
busShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    busDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this bus?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      busDeleteStore.setError(error.value);
      return;
    }

    busDeleteStore.setDeleted(item.value);
    busDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "buss" });
    }
  }
}

onBeforeUnmount(() => {
  busShowStore.$reset();
});
</script>
