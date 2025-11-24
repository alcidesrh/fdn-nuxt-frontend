<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="action_ruta" class="text-gray-700 block text-sm font-bold capitalize">
        ruta
      </label>
      <input id="action_ruta" v-model="item.ruta" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.ruta ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.ruta" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.ruta }}
      </div>
    </div>
    <div class="mb-2">
      <label for="action_nombre" class="text-gray-700 block text-sm font-bold capitalize">
        nombre
      </label>
      <input id="action_nombre" v-model="item.nombre" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nombre ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nombre" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="action_roles" class="text-gray-700 block text-sm font-bold capitalize">
        roles
      </label>
      <FormRepeater :values="item.roles" @update="(values: any[]) => (item.roles = values)" />
      <div v-if="violations?.roles" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.roles }}
      </div>
    </div>
    <div class="mb-2">
      <label for="action_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="action_status" v-model="item.status" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.status ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.status" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label for="action_id" class="text-gray-700 block text-sm font-bold capitalize">
        id
      </label>
      <input id="action_id" v-model="item.id" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.id ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.id" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.id }}
      </div>
    </div>
    <div class="mb-2">
      <label for="action_label" class="text-gray-700 block text-sm font-bold capitalize">
        label
      </label>
      <input id="action_label" v-model="item.label" :class="[
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
import type { Action } from "~/types/action";
import type { SubmissionErrors } from "~/types/error";

const props = defineProps<{
  values?: Action;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Action> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Action): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
