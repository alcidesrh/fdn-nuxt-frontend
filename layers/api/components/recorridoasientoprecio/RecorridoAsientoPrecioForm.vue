<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="recorridoasientoprecio_recorrido" class="text-gray-700 block text-sm font-bold capitalize">
        recorrido
      </label>
      <input id="recorridoasientoprecio_recorrido" v-model="item.recorrido" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.recorrido ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.recorrido" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.recorrido }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorridoasientoprecio_precioAsientoA" class="text-gray-700 block text-sm font-bold capitalize">
        precioAsientoA
      </label>
      <input id="recorridoasientoprecio_precioAsientoA" v-model="item.precioAsientoA" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.precioAsientoA ? 'border-red-500' : 'border-gray-300',
      ]" type="number" step="0.1" placeholder="" />
      <div v-if="violations?.precioAsientoA" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.precioAsientoA }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorridoasientoprecio_precioAsientoB" class="text-gray-700 block text-sm font-bold capitalize">
        precioAsientoB
      </label>
      <input id="recorridoasientoprecio_precioAsientoB" v-model="item.precioAsientoB" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.precioAsientoB ? 'border-red-500' : 'border-gray-300',
      ]" type="number" step="0.1" placeholder="" />
      <div v-if="violations?.precioAsientoB" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.precioAsientoB }}
      </div>
    </div>

    <button type="submit" class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600">
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { RecorridoAsientoPrecio } from "~~/types/recorridoasientoprecio";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: RecorridoAsientoPrecio;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<RecorridoAsientoPrecio> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: RecorridoAsientoPrecio): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
