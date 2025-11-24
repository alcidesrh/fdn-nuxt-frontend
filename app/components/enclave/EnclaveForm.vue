<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="enclave_email" class="text-gray-700 block text-sm font-bold capitalize">
        email
      </label>
      <input id="enclave_email" v-model="item.email" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.email ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.email" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.email }}
      </div>
    </div>
    <div class="mb-2">
      <label for="enclave_telefono" class="text-gray-700 block text-sm font-bold capitalize">
        telefono
      </label>
      <input id="enclave_telefono" v-model="item.telefono" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.telefono ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.telefono" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.telefono }}
      </div>
    </div>
    <div class="mb-2">
      <label for="enclave_direccion" class="text-gray-700 block text-sm font-bold capitalize">
        direccion
      </label>
      <input id="enclave_direccion" v-model="item.direccion" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.direccion ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.direccion" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.direccion }}
      </div>
    </div>
    <div class="mb-2">
      <label for="enclave_localidad" class="text-gray-700 block text-sm font-bold capitalize">
        localidad
      </label>
      <input id="enclave_localidad" v-model="item.localidad" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.localidad ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.localidad" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.localidad }}
      </div>
    </div>
    <div class="mb-2">
      <label for="enclave_nombre" class="text-gray-700 block text-sm font-bold capitalize">
        nombre
      </label>
      <input id="enclave_nombre" v-model="item.nombre" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nombre ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nombre" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="enclave_nota" class="text-gray-700 block text-sm font-bold capitalize">
        nota
      </label>
      <input id="enclave_nota" v-model="item.nota" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nota ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nota" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nota }}
      </div>
    </div>
    <div class="mb-2">
      <label for="enclave_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="enclave_status" v-model="item.status" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.status ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.status" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label for="enclave_id" class="text-gray-700 block text-sm font-bold capitalize">
        id
      </label>
      <input id="enclave_id" v-model="item.id" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.id ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.id" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.id }}
      </div>
    </div>
    <div class="mb-2">
      <label for="enclave_label" class="text-gray-700 block text-sm font-bold capitalize">
        label
      </label>
      <input id="enclave_label" v-model="item.label" :class="[
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
import type { Enclave } from "~/types/enclave";
import type { SubmissionErrors } from "~/types/error";

const props = defineProps<{
  values?: Enclave;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Enclave> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Enclave): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
