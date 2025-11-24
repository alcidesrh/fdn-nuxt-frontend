<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="role_nombre" class="text-gray-700 block text-sm font-bold capitalize">
        nombre
      </label>
      <input id="role_nombre" v-model="item.nombre" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nombre ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nombre" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="role_parents" class="text-gray-700 block text-sm font-bold capitalize">
        parents
      </label>
      <input id="role_parents" v-model="item.parents" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.parents ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.parents" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.parents }}
      </div>
    </div>
    <div class="mb-2">
      <label for="role_children" class="text-gray-700 block text-sm font-bold capitalize">
        children
      </label>
      <input id="role_children" v-model="item.children" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.children ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.children" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.children }}
      </div>
    </div>
    <div class="mb-2">
      <label for="role_permisos" class="text-gray-700 block text-sm font-bold capitalize">
        permisos
      </label>
      <FormRepeater :values="item.permisos" @update="(values: any[]) => (item.permisos = values)" />
      <div v-if="violations?.permisos" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.permisos }}
      </div>
    </div>
    <div class="mb-2">
      <label for="role_actions" class="text-gray-700 block text-sm font-bold capitalize">
        actions
      </label>
      <FormRepeater :values="item.actions" @update="(values: any[]) => (item.actions = values)" />
      <div v-if="violations?.actions" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.actions }}
      </div>
    </div>
    <div class="mb-2">
      <label for="role_id" class="text-gray-700 block text-sm font-bold capitalize">
        id
      </label>
      <input id="role_id" v-model="item.id" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.id ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.id" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.id }}
      </div>
    </div>
    <div class="mb-2">
      <label for="role_label" class="text-gray-700 block text-sm font-bold capitalize">
        label
      </label>
      <input id="role_label" v-model="item.label" :class="[
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
import type { Role } from "~/types/role";
import type { SubmissionErrors } from "~/types/error";

const props = defineProps<{
  values?: Role;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Role> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Role): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
