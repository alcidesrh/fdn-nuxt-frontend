<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'empresas' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'empresas-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Empresa {{ item?.["@id"] }}</h1>

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
            nombreComercial
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nombreComercial }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            denominacionSocial
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.denominacionSocial }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            alias
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.alias }}
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
            status
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.status }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            legacyId
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.legacyId }}
                    </td>
        </tr>
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
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            email
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.email }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            nit
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nit }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            telefono
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.telefono }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            direccion
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.direccion }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            localidad
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('localidads-id')">
              <nuxt-link
                v-for="localidad in item.localidads"
                :key="localidad"
                :to="{ name: 'localidads-id', params: { id: localidad } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ localidad }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="localidad in item.localidads"
                :key="localidad"
              >
                {{ localidad }}
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
import { useEmpresaShowStore } from "~~/stores/empresa/show";
import { useEmpresaDeleteStore } from "~~/stores/empresa/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Empresa } from "~~/types/empresa";

const route = useRoute();
const router = useRouter();

const empresaDeleteStore = useEmpresaDeleteStore();
const { error: deleteError, deleted } = storeToRefs(empresaDeleteStore);

const empresaShowStore = useEmpresaShowStore();

useMercureItem({
  store: empresaShowStore,
  deleteStore: empresaDeleteStore,
  redirectRouteName: "empresas",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Empresa>(`empresas/${id}`);
empresaShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    empresaDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this empresa?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      empresaDeleteStore.setError(error.value);
      return;
    }

    empresaDeleteStore.setDeleted(item.value);
    empresaDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "empresas" });
    }
  }
}

onBeforeUnmount(() => {
  empresaShowStore.$reset();
});
</script>
