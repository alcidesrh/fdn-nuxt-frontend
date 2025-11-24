<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="menu_posicion" class="text-gray-700 block text-sm font-bold capitalize">
        posicion
      </label>
      <input id="menu_posicion" v-model="item.posicion" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.posicion ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.posicion" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.posicion }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_tipo" class="text-gray-700 block text-sm font-bold capitalize">
        tipo
      </label>
      <input id="menu_tipo" v-model="item.tipo" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.tipo ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.tipo" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.tipo }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_nombre" class="text-gray-700 block text-sm font-bold capitalize">
        nombre
      </label>
      <input id="menu_nombre" v-model="item.nombre" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nombre ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nombre" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_icon" class="text-gray-700 block text-sm font-bold capitalize">
        icon
      </label>
      <input id="menu_icon" v-model="item.icon" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.icon ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.icon" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.icon }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_parent" class="text-gray-700 block text-sm font-bold capitalize">
        parent
      </label>
      <input id="menu_parent" v-model="item.parent" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.parent ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.parent" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.parent }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_children" class="text-gray-700 block text-sm font-bold capitalize">
        children
      </label>
      <input id="menu_children" v-model="item.children" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.children ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.children" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.children }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_action" class="text-gray-700 block text-sm font-bold capitalize">
        action
      </label>
      <input id="menu_action" v-model="item.action" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.action ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.action" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.action }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="menu_status" v-model="item.status" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.status ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.status" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_id" class="text-gray-700 block text-sm font-bold capitalize">
        id
      </label>
      <input id="menu_id" v-model="item.id" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.id ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.id" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.id }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_label" class="text-gray-700 block text-sm font-bold capitalize">
        label
      </label>
      <input id="menu_label" v-model="item.label" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.label ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.label" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.label }}
      </div>
    </div>

    <button type="submit" class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600">
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { Ref } from "vue";
import type { Menu } from "~/types/menu";
import type { SubmissionErrors } from "~/types/error";

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
