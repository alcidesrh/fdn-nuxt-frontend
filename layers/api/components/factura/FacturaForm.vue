<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="factura_dte" class="text-gray-700 block text-sm font-bold capitalize">
        dte
      </label>
      <input id="factura_dte" v-model="item.dte" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.dte ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.dte" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.dte }}
      </div>
    </div>
    <div class="mb-2">
      <label for="factura_uuid" class="text-gray-700 block text-sm font-bold capitalize">
        uuid
      </label>
      <input id="factura_uuid" v-model="item.uuid" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.uuid ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.uuid" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.uuid }}
      </div>
    </div>
    <div class="mb-2">
      <label for="factura_fecha" class="text-gray-700 block text-sm font-bold capitalize">
        fecha
      </label>
      <input id="factura_fecha" v-model="item.fecha" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.fecha ? 'border-red-500' : 'border-gray-300',
      ]" type="date" placeholder="" />
      <div v-if="violations?.fecha" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.fecha }}
      </div>
    </div>
    <div class="mb-2">
      <label for="factura_serie" class="text-gray-700 block text-sm font-bold capitalize">
        serie
      </label>
      <input id="factura_serie" v-model="item.serie" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.serie ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.serie" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.serie }}
      </div>
    </div>
    <div class="mb-2">
      <label for="factura_venta" class="text-gray-700 block text-sm font-bold capitalize">
        venta
      </label>
      <input id="factura_venta" v-model="item.venta" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.venta ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.venta" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.venta }}
      </div>
    </div>
    <div class="mb-2">
      <label for="factura_createdAt" class="text-gray-700 block text-sm font-bold capitalize">
        createdAt
      </label>
      <input id="factura_createdAt" v-model="item.createdAt" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.createdAt ? 'border-red-500' : 'border-gray-300',
      ]" type="date" placeholder="" />
      <div v-if="violations?.createdAt" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.createdAt }}
      </div>
    </div>
    <div class="mb-2">
      <label for="factura_updatedAt" class="text-gray-700 block text-sm font-bold capitalize">
        updatedAt
      </label>
      <input id="factura_updatedAt" v-model="item.updatedAt" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.updatedAt ? 'border-red-500' : 'border-gray-300',
      ]" type="date" placeholder="" />
      <div v-if="violations?.updatedAt" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.updatedAt }}
      </div>
    </div>
    <div class="mb-2">
      <label for="factura_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="factura_status" v-model="item.status" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.status ? 'border-red-500' : 'border-gray-300',
      ]" type="number" placeholder="" />
      <div v-if="violations?.status" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.status }}
      </div>
    </div>

    <button type="submit" class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600">
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Factura } from "~~/types/factura";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Factura;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Factura> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Factura): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
