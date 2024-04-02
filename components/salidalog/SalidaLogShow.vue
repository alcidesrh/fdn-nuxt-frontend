<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'salidalogs' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'salidalogs-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show SalidaLog {{ item?.["@id"] }}</h1>

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
            tipo
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.tipo }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            salida
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('salidas-id')">
              <nuxt-link
                v-for="salida in item.salidas"
                :key="salida"
                :to="{ name: 'salidas-id', params: { id: salida } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ salida }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="salida in item.salidas"
                :key="salida"
              >
                {{ salida }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            createdAt
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.createdAt) }}
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            updatedAt
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.updatedAt) }}
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            descripcion
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.descripcion }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            user
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('users-id')">
              <nuxt-link
                v-for="user in item.users"
                :key="user"
                :to="{ name: 'users-id', params: { id: user } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ user }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="user in item.users"
                :key="user"
              >
                {{ user }}
              </p>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSalidaLogShowStore } from "~~/stores/salidalog/show";
import { useSalidaLogDeleteStore } from "~~/stores/salidalog/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { SalidaLog } from "~~/types/salidalog";

const route = useRoute();
const router = useRouter();

const salidalogDeleteStore = useSalidaLogDeleteStore();
const { error: deleteError, deleted } = storeToRefs(salidalogDeleteStore);

const salidalogShowStore = useSalidaLogShowStore();

useMercureItem({
  store: salidalogShowStore,
  deleteStore: salidalogDeleteStore,
  redirectRouteName: "salidalogs",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<SalidaLog>(`salida_logs/${id}`);
salidalogShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    salidalogDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this salidalog?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      salidalogDeleteStore.setError(error.value);
      return;
    }

    salidalogDeleteStore.setDeleted(item.value);
    salidalogDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "salidalogs" });
    }
  }
}

onBeforeUnmount(() => {
  salidalogShowStore.$reset();
});
</script>
