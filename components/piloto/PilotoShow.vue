<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'pilotos' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'pilotos-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Piloto {{ item?.["@id"] }}</h1>

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
            licencia
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.licencia }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            licenciaVencimiento
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.licenciaVencimiento) }}
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            dpi
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.dpi }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            sexo
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.sexo }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            fechaNacimiento
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.fechaNacimiento) }}
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            seguroSocial
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.seguroSocial }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            nacionalidad
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nacionalidad }}
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
            apellido
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.apellido }}
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
import { usePilotoShowStore } from "~~/stores/piloto/show";
import { usePilotoDeleteStore } from "~~/stores/piloto/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Piloto } from "~~/types/piloto";

const route = useRoute();
const router = useRouter();

const pilotoDeleteStore = usePilotoDeleteStore();
const { error: deleteError, deleted } = storeToRefs(pilotoDeleteStore);

const pilotoShowStore = usePilotoShowStore();

useMercureItem({
  store: pilotoShowStore,
  deleteStore: pilotoDeleteStore,
  redirectRouteName: "pilotos",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Piloto>(`pilotos/${id}`);
pilotoShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    pilotoDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this piloto?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      pilotoDeleteStore.setError(error.value);
      return;
    }

    pilotoDeleteStore.setDeleted(item.value);
    pilotoDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "pilotos" });
    }
  }
}

onBeforeUnmount(() => {
  pilotoShowStore.$reset();
});
</script>
