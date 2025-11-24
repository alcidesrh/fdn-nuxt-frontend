<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'routes' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link v-if="item" :to="{ name: 'routes-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700">
        Edit
      </nuxt-link>
      <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Route {{ item?.["@id"] }}</h1>

  <div v-if="isLoading" class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm" role="status">
    Loading...
  </div>

  <div v-if="error || deleteError" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm" role="alert">
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
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            id
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.id }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRouteShowStore } from "~/stores/route/show";
import { useRouteDeleteStore } from "~/stores/route/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Route } from "~/types/route";

const route = useRoute();
const router = useRouter();

const routeDeleteStore = useRouteDeleteStore();
const { error: deleteError, deleted } = storeToRefs(routeDeleteStore);

const routeShowStore = useRouteShowStore();

useMercureItem({
  store: routeShowStore,
  deleteStore: routeDeleteStore,
  redirectRouteName: "routes",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Route>(`routes/${id}`);
routeShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    routeDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this route?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      routeDeleteStore.setError(error.value);
      return;
    }

    routeDeleteStore.setDeleted(item.value);
    routeDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "routes" });
    }
  }
}

onBeforeUnmount(() => {
  routeShowStore.$reset();
});
</script>
