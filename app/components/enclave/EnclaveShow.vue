<template>
  <div class="flex items-center justify-between">
    <nuxt-link :to="{ name: 'enclaves' }" class="text-blue-600 hover:text-blue-800">
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link v-if="item" :to="{ name: 'enclaves-id-edit', params: { id: getIdFromIri(item['@id']) } }"
        class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700">
        Edit
      </nuxt-link>
      <button class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700" @click="deleteItem">
        Delete
      </button>
    </div>
  </div>

  <h1 class="text-3xl my-4">Show Enclave {{ item?.["@id"] }}</h1>

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
            email
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.email }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            telefono
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.telefono }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            direccion
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.direccion }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            localidad
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link v-if="router.hasRoute('localidads-id')"
              :to="{ name: 'localidads-id', params: { id: item.localidad } }" class="text-blue-600 hover:text-blue-800">
              {{ item.localidad }}
            </nuxt-link>

            <p v-else>
              {{ item.localidad }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            nombre
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nombre }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            nota
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nota }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            status
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.status }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            id
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.id }}
          </td>
        </tr>
        <tr class="border-b">
          <th class="text-sm font-medium px-6 py-4 text-left capitalize" scope="row">
            label
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.label }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useEnclaveShowStore } from "~/stores/enclave/show";
import { useEnclaveDeleteStore } from "~/stores/enclave/delete";
import { useMercureItem } from "~/composables/mercureItem";
import { useFetchItem } from "~/composables/api";
import { getIdFromIri } from "~/utils/resource";
import type { Enclave } from "~/types/enclave";

const route = useRoute();
const router = useRouter();

const enclaveDeleteStore = useEnclaveDeleteStore();
const { error: deleteError, deleted } = storeToRefs(enclaveDeleteStore);

const enclaveShowStore = useEnclaveShowStore();

useMercureItem({
  store: enclaveShowStore,
  deleteStore: enclaveDeleteStore,
  redirectRouteName: "enclaves",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Enclave>(`enclaves/${id}`);
enclaveShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    enclaveDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this enclave?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      enclaveDeleteStore.setError(error.value);
      return;
    }

    enclaveDeleteStore.setDeleted(item.value);
    enclaveDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "enclaves" });
    }
  }
}

onBeforeUnmount(() => {
  enclaveShowStore.$reset();
});
</script>
