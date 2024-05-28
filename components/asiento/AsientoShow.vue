<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'asientos' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'asientos-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Asiento {{ item?.["@id"] }}</h1>

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
            numero
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.numero }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            bus
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link
              v-if="router.hasRoute('api/buses-id')"
              :to="{ name: 'buss-id', params: { id: item.bus } }"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ item.bus }}
            </nuxt-link>

            <p v-else>
              {{ item.bus }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            clase
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.clase }}
                    </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAsientoShowStore } from "~~/stores/asiento/show";
import { useAsientoDeleteStore } from "~~/stores/asiento/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Asiento } from "~~/types/asiento";

const route = useRoute();
const router = useRouter();

const asientoDeleteStore = useAsientoDeleteStore();
const { error: deleteError, deleted } = storeToRefs(asientoDeleteStore);

const asientoShowStore = useAsientoShowStore();

useMercureItem({
  store: asientoShowStore,
  deleteStore: asientoDeleteStore,
  redirectRouteName: "asientos",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Asiento>(`api/asientos/${id}`);
asientoShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    asientoDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this asiento?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      asientoDeleteStore.setError(error.value);
      return;
    }

    asientoDeleteStore.setDeleted(item.value);
    asientoDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "asientos" });
    }
  }
}

onBeforeUnmount(() => {
  asientoShowStore.$reset();
});
</script>
