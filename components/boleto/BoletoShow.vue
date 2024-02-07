<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'boletos' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'boletos-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Boleto {{ item?.["@id"] }}</h1>

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
            usuario
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
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            cliente
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('clientes-id')">
              <nuxt-link
                v-for="cliente in item.clientes"
                :key="cliente"
                :to="{ name: 'clientes-id', params: { id: cliente } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ cliente }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="cliente in item.clientes"
                :key="cliente"
              >
                {{ cliente }}
              </p>
            </template>
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
            asientos
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('asientos-id')">
              <nuxt-link
                v-for="asiento in item.asientos"
                :key="asiento"
                :to="{ name: 'asientos-id', params: { id: asiento } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ asiento }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="asiento in item.asientos"
                :key="asiento"
              >
                {{ asiento }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            precio
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.precio }}
                    </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBoletoShowStore } from "~~/stores/boleto/show";
import { useBoletoDeleteStore } from "~~/stores/boleto/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Boleto } from "~~/types/boleto";

const route = useRoute();
const router = useRouter();

const boletoDeleteStore = useBoletoDeleteStore();
const { error: deleteError, deleted } = storeToRefs(boletoDeleteStore);

const boletoShowStore = useBoletoShowStore();

useMercureItem({
  store: boletoShowStore,
  deleteStore: boletoDeleteStore,
  redirectRouteName: "boletos",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Boleto>(`boletos/${id}`);
boletoShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    boletoDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this boleto?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      boletoDeleteStore.setError(error.value);
      return;
    }

    boletoDeleteStore.setDeleted(item.value);
    boletoDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "boletos" });
    }
  }
}

onBeforeUnmount(() => {
  boletoShowStore.$reset();
});
</script>
