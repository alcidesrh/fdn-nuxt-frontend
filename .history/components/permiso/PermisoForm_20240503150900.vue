<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="permiso_padre" class="text-gray-700 block text-sm font-bold capitalize">
        padre
      </label>
      <input id="permiso_padre" v-model="item.padre" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.padre ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.padre" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.padre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_hijos" class="text-gray-700 block text-sm font-bold capitalize">
        hijos
      </label>
      <FormRepeater :values="item.hijos" @update="(values: any[]) => (item.hijos = values)" />
      <div v-if="violations?.hijos" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.hijos }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_nivel" class="text-gray-700 block text-sm font-bold capitalize">
        nivel
      </label>
      <input id="permiso_nivel" v-model="item.nivel" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nivel ? 'border-red-500' : 'border-gray-300',
      ]" type="number" placeholder="" />
      <div v-if="violations?.nivel" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nivel }}
      </div>
    </div>
    <div class="mb-2">
      <label for="permiso_usuarios" class="text-gray-700 block text-sm font-bold capitalize">
        usuarios
      </label>
      <FormRepeater :values="item.usuarios" @update="(values: any[]) => (item.usuarios = values)" />
      <div v-if="violations?.usuarios" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.usuarios }}
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
    </form class="mb-2">
      <label for="permiso_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="permiso_status" v-model="item.status" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.status ? 'border-red-500' : 'border-gray-300',
      ]" type="number" placeholder="" />
      <div v-if="violations?.status" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.status }}
      </div>
    <//div>

    <button type="submit" class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600">
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FormRepeater from "~~/components/common/FormRepeater.vue";
import type { Permiso } from "~~/types/permiso";
import type { SubmissionErrors } from "~~/types/error";

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
