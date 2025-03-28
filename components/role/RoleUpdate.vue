<template>
  <div class="flex items-center justify-between">
    <nuxt-link
      :to="{ name: 'roles' }"
      class="text-blue-600 hover:text-blue-800"
    >
      &lt; Back to list
    </nuxt-link>

    <button
      class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
      @click="deleteItem"
    >
      Delete
    </button>
  </div>

  <h1 class="text-3xl my-4">Edit Role {{ item?.["@id"] }}</h1>

  <div
    v-if="isLoading || deleteLoading"
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

  <div
    v-if="created || updated"
    class="bg-green-100 rounded py-4 px-4 my-2 text-green-700 text-sm"
    role="status"
  >
    <template v-if="updated">{{ updated["@id"] }} updated.</template>
    <template v-else-if="created">{{ created["@id"] }} created.</template>
  </div>

  <Form :values="item" :errors="violations" @submit="update" />
</template>

<script lang="ts" setup>
import { Ref } from "vue";
import { storeToRefs } from "pinia";
import Form from "~~/components/role/RoleForm.vue";
import { useRoleUpdateStore } from "~~/stores/role/update";
import { useRoleCreateStore } from "~~/stores/role/create";
import { useRoleDeleteStore } from "~~/stores/role/delete";
import { useMercureItem } from "~~/composables/mercureItem";
import { useFetchItem, useUpdateItem } from "~~/composables/api";
import { SubmissionErrors } from "~~/types/error";
import type { Role } from "~~/types/role";

const route = useRoute();
const router = useRouter();

const roleCreateStore = useRoleCreateStore();
const { created } = storeToRefs(roleCreateStore);

const roleDeleteStore = useRoleDeleteStore();
const { error: deleteError, deleted, isLoading: deleteLoading } =
  storeToRefs(roleDeleteStore);

const roleUpdateStore = useRoleUpdateStore();

useMercureItem({
  store: roleUpdateStore,
  deleteStore: roleDeleteStore,
  redirectRouteName: "roles",
});

const id = decodeURIComponent(route.params.id as string);
let updated: Ref<Role | undefined> = ref(undefined);
let violations: Ref<SubmissionErrors | undefined> = ref(undefined);
let {
  retrieved: item,
  error,
  isLoading,
  hubUrl,
} = await useFetchItem<Role>(`api/roles/${id}`);
roleUpdateStore.setData({
  retrieved: item,
  error,
  isLoading,
  hubUrl,
});

async function update(payload: Role) {
  if (!item?.value) {
    roleUpdateStore.setError("No item found. Please reload");
    return;
  }

  const data = await useUpdateItem<Role>(item.value, payload);
  updated.value = data.updated.value;
  violations.value = data.violations.value;
  isLoading.value = data.isLoading.value;
  error.value = data.error.value;
  roleUpdateStore.setUpdateData(data);
}

async function deleteItem() {
  if (!item?.value) {
    roleDeleteStore.setError("No item found. Please reload");
    return;
  }

  if (window.confirm("Are you sure you want to delete this role?")) {
    const { isLoading, error } = await useDeleteItem(item.value);

    if (error.value) {
      roleDeleteStore.setError(error.value);
      return;
    }

    roleDeleteStore.setLoading(Boolean(isLoading?.value));
    roleDeleteStore.setDeleted(item.value);
    roleDeleteStore.setMercureDeleted(undefined);

    if (deleted) {
      router.push({ name: "roles" });
    }
  }
}

onBeforeUnmount(() => {
  roleUpdateStore.$reset();
  roleCreateStore.$reset();
  roleDeleteStore.$reset();
});
</script>
