<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="venta_ida" class="text-gray-700 block text-sm font-bold capitalize">
        ida
      </label>
      <input id="venta_ida" v-model="item.ida" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.ida ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.ida" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.ida }}
      </div>
    </div>
    <div class="mb-2">
      <label for="venta_regreso" class="text-gray-700 block text-sm font-bold capitalize">
        regreso
      </label>
      <input id="venta_regreso" v-model="item.regreso" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.regreso ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.regreso" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.regreso }}
      </div>
    </div>
    <div class="mb-2">
      <label for="venta_user" class="text-gray-700 block text-sm font-bold capitalize">
        user
      </label>
      <input id="venta_user" v-model="item.user" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.user ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.user" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.user }}
      </div>
    </div>
    <div class="mb-2">
      <label for="venta_precio" class="text-gray-700 block text-sm font-bold capitalize">
        precio
      </label>
      <input id="venta_precio" v-model="item.precio" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.precio ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.precio" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.precio }}
      </div>
    </div>
    <div class="mb-2">
      <label for="venta_factura" class="text-gray-700 block text-sm font-bold capitalize">
        factura
      </label>
      <input id="venta_factura" v-model="item.factura" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.factura ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.factura" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.factura }}
      </div>
    </div>
    <div class="mb-2">
      <label for="venta_createdAt" class="text-gray-700 block text-sm font-bold capitalize">
        createdAt
      </label>
      <input id="venta_createdAt" v-model="item.createdAt" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.createdAt ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.createdAt" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.createdAt }}
      </div>
    </div>
    <div class="mb-2">
      <label for="venta_updatedAt" class="text-gray-700 block text-sm font-bold capitalize">
        updatedAt
      </label>
      <input id="venta_updatedAt" v-model="item.updatedAt" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.updatedAt ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="Returns updatedAt." />
      <div v-if="violations?.updatedAt" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.updatedAt }}
      </div>
    </div>
    <div class="mb-2">
      <label for="venta_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="venta_status" v-model="item.status" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.status ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.status" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label for="venta_id" class="text-gray-700 block text-sm font-bold capitalize">
        id
      </label>
      <input id="venta_id" v-model="item.id" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.id ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.id" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.id }}
      </div>
    </div>
    <div class="mb-2">
      <label for="venta_label" class="text-gray-700 block text-sm font-bold capitalize">
        label
      </label>
      <input id="venta_label" v-model="item.label" :class="[
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
import type { Venta } from "~/types/venta";
import type { SubmissionErrors } from "~/types/error";

const props = defineProps<{
  values?: Venta;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Venta> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Venta): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
