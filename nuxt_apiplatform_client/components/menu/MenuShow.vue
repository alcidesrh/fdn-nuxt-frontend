<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'menus' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <div>
      <nuxt-link
        v-if="item"
        :to="{ name: 'menus-id-edit', params: { id: getIdFromIri(item['@id']) } }"
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

  <h1 class="text-3xl my-4">Show Menu {{ item?.["@id"] }}</h1>

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
            link
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.link }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            posicion
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.posicion }}
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
            nota
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.nota }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            icon
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.icon }}
                    </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            roles
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('api/roles-id')">
              <nuxt-link
                v-for="role in item.api/roles"
                :key="role"
                :to="{ name: 'roles-id', params: { id: role } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ role }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="role in item.api/roles"
                :key="role"
              >
                {{ role }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            permisos
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('api/permisos-id')">
              <nuxt-link
                v-for="permiso in item.api/permisos"
                :key="permiso"
                :to="{ name: 'permisos-id', params: { id: permiso } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ permiso }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="permiso in item.api/permisos"
                :key="permiso"
              >
                {{ permiso }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            parent
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <nuxt-link
              v-if="router.hasRoute('api/menus-id')"
              :to="{ name: 'menus-id', params: { id: item.menu } }"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ item.menu }}
            </nuxt-link>

            <p v-else>
              {{ item.menu }}
            </p>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            children
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('api/menus-id')">
              <nuxt-link
                v-for="menu in item.api/menus"
                :key="menu"
                :to="{ name: 'menus-id', params: { id: menu } }"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ menu }}

                <br />
              </nuxt-link>
            </template>

            <template v-else>
              <p
                v-for="menu in item.api/menus"
                :key="menu"
              >
                {{ menu }}
              </p>
            </template>
          </td>
        </tr>
        <tr class="border-b">
          <th
            class="text-sm font-medium px-6 py-4 text-left capitalize"
            scope="row"
          >
            allowUsers
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('api/users-id')">
              <nuxt-link
                v-for="user in item.api/users"
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
                v-for="user in item.api/users"
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
            denyUsers
          </th>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('api/users-id')">
              <nuxt-link
                v-for="user in item.api/users"
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
                v-for="user in item.api/users"
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
import { useMenuShowStore } from "~~/stores/menu/show";
import { useMenuDeleteStore } from "~~/stores/menu/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Menu } from "~~/types/menu";

const route = useRoute();
const router = useRouter();

const menuDeleteStore = useMenuDeleteStore();
const { error: deleteError, deleted } = storeToRefs(menuDeleteStore);

const menuShowStore = useMenuShowStore();

useMercureItem({
  store: menuShowStore,
  deleteStore: menuDeleteStore,
  redirectRouteName: "menus",
});

const id = decodeURIComponent(route.params.id as string);
const {
  retrieved: item,
  isLoading,
  error,
  hubUrl,
} = await useFetchItem<Menu>(`api/menus/${id}`);
menuShowStore.setData({ retrieved: item, isLoading, error, hubUrl });

async function deleteItem() {
  if (!item?.value) {
    menuDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this menu?")) {
    const { error } = await useDeleteItem(item.value);

    if (error.value) {
      menuDeleteStore.setError(error.value);
      return;
    }

    menuDeleteStore.setDeleted(item.value);
    menuDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "menus" });
    }
  }
}

onBeforeUnmount(() => {
  menuShowStore.$reset();
});
</script>
