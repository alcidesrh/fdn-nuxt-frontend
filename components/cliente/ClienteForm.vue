<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="cliente_nit"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nit
      </label>
      <input
        id="cliente_nit"
        v-model="item.nit"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.nit ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.nit"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.nit }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_dpi"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        dpi
      </label>
      <input
        id="cliente_dpi"
        v-model="item.dpi"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.dpi ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.dpi"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.dpi }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_apellido"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        apellido
      </label>
      <input
        id="cliente_apellido"
        v-model="item.apellido"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.apellido ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.apellido"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.apellido }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_direccion"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        direccion
      </label>
      <input
        id="cliente_direccion"
        v-model="item.direccion"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.direccion ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.direccion"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.direccion }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_telefono"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        telefono
      </label>
      <input
        id="cliente_telefono"
        v-model="item.telefono"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.telefono ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.telefono"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.telefono }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_correo"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        correo
      </label>
      <input
        id="cliente_correo"
        v-model="item.correo"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.correo ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.correo"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.correo }}
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
import type { Cliente } from "~~/types/cliente";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Cliente;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Cliente> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Cliente): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
