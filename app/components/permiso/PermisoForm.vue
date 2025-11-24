<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="permiso_roles" class="text-gray-700 block text-sm font-bold capitalize">
        roles
      </label>
      <FormRepeater :values="item.roles" @update="(values: any[]) => (item.roles = values)" />
      <div v-if="violations?.roles" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.roles }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_parents" class="text-gray-700 block text-sm font-bold capitalize">
        parents
      </label>
      <input id="permiso_parents" v-model="item.parents" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.parents ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.parents" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.parents }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_children" class="text-gray-700 block text-sm font-bold capitalize">
        children
      </label>
      <input id="permiso_children" v-model="item.children" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.children ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.children" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.children }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_nombre" class="text-gray-700 block text-sm font-bold capitalize">
        nombre
      </label>
      <input id="permiso_nombre" v-model="item.nombre" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nombre ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nombre" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_nota" class="text-gray-700 block text-sm font-bold capitalize">
        nota
      </label>
      <input id="permiso_nota" v-model="item.nota" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nota ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nota" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nota }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="permiso_status" v-model="item.status" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.status ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.status" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_id" class="text-gray-700 block text-sm font-bold capitalize">
        id
      </label>
      <input id="permiso_id" v-model="item.id" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.id ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.id" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.id }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_label" class="text-gray-700 block text-sm font-bold capitalize">
        label
      </label>
      <input id="permiso_label" v-model="item.label" :class="[
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
import FormRepeater from "~/components/common/FormRepeater.vue";
import type { Permiso } from "~/types/permiso";
import type { SubmissionErrors } from "~/types/error";

const props = defineProps<{
  values?: Permiso;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Permiso> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Permiso): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
