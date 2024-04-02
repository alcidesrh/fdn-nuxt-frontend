<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'boletologs' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'boletologs-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show BoletoLog {{ item?.["@id"] }}</h1>

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
            boleto
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('boletos-id')">
              <nuxt-link
                v-for="boleto in item.boletos"
                :key="boleto"
                :to="{ name: 'boletos-id', params: { id: boleto } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ boleto }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="boleto in item.boletos"
                :key="boleto"
              >
                {{ boleto }}
              </p>
            </template>
          </td>
        </tr>
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
import { useBoletoLogShowStore } from "~~/stores/boletolog/show";
import { useBoletoLogDeleteStore } from "~~/stores/boletolog/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { BoletoLog } from "~~/types/boletolog";

const route = useRoute();
const router = useRouter();

const boletologDeleteStore = useBoletoLogDeleteStore();
const { error: deleteError, deleted } = storeToRefs(boletologDeleteStore);

const boletologShowStore = useBoletoLogShowStore();

useMercureItem({
  store: boletologShowStore,
  deleteStore: boletologDeleteStore,
  redirectRouteName: "boletologs",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<BoletoLog>(`boleto_logs/${id}`);
boletologShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    boletologDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this boletolog?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      boletologDeleteStore.setError(error.value);
      return;
    }

    boletologDeleteStore.setDeleted(item.value);
    boletologDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "boletologs" });
    }
  }
}

onBeforeUnmount(() => {
  boletologShowStore.$reset();
});
</script>
