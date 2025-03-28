<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="menu_link"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        link
      </label>
      <input
        id="menu_link"
        v-model="item.link"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.link ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.link"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.link }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_posicion"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        posicion
      </label>
      <input
        id="menu_posicion"
        v-model="item.posicion"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.posicion ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        placeholder=""
      />
      <div
        v-if="violations?.posicion"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.posicion }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_tipo"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        tipo
      </label>
      <input
        id="menu_tipo"
        v-model="item.tipo"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.tipo ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.tipo"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.tipo }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_nombre"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nombre
      </label>
      <input
        id="menu_nombre"
        v-model="item.nombre"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.nombre ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.nombre"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_nota"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nota
      </label>
      <input
        id="menu_nota"
        v-model="item.nota"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.nota ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.nota"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.nota }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_icon"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        icon
      </label>
      <input
        id="menu_icon"
        v-model="item.icon"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.icon ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.icon"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.icon }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_roles"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        roles
      </label>
      <FormRepeater
        :values="item.roles"
        @update="(values: any[]) => (item.roles = values)"
      />
      <div
        v-if="violations?.roles"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.roles }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_permisos"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        permisos
      </label>
      <FormRepeater
        :values="item.permisos"
        @update="(values: any[]) => (item.permisos = values)"
      />
      <div
        v-if="violations?.permisos"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.permisos }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_parent"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        parent
      </label>
      <input
        id="menu_parent"
        v-model="item.parent"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.parent ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.parent"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.parent }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_children"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        children
      </label>
      <FormRepeater
        :values="item.children"
        @update="(values: any[]) => (item.children = values)"
      />
      <div
        v-if="violations?.children"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.children }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_allowUsers"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        allowUsers
      </label>
      <FormRepeater
        :values="item.allowUsers"
        @update="(values: any[]) => (item.allowUsers = values)"
      />
      <div
        v-if="violations?.allowUsers"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.allowUsers }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_denyUsers"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        denyUsers
      </label>
      <FormRepeater
        :values="item.denyUsers"
        @update="(values: any[]) => (item.denyUsers = values)"
      />
      <div
        v-if="violations?.denyUsers"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.denyUsers }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_status"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        status
      </label>
      <input
        id="menu_status"
        v-model="item.status"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.status ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.status"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menu_label"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        label
      </label>
      <input
        id="menu_label"
        v-model="item.label"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.label ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.label"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.label }}
      </div>
    </div>

    <button
      type="submit"
      class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { Ref } from "vue";
import FormRepeater from "~~/components/common/FormRepeater.vue";
import type { Menu } from "~~/types/menu";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Menu;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Menu> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Menu): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
