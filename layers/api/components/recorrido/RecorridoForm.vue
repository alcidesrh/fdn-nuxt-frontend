<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="recorrido_tiempo" class="text-gray-700 block text-sm font-bold capitalize">
        tiempo
      </label>
      <input id="recorrido_tiempo" v-model="item.tiempo" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.tiempo ? 'border-red-500' : 'border-gray-300',
      ]" type="date" placeholder="" />
      <div v-if="violations?.tiempo" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.tiempo }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorrido_distancia" class="text-gray-700 block text-sm font-bold capitalize">
        distancia
      </label>
      <input id="recorrido_distancia" v-model="item.distancia" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.distancia ? 'border-red-500' : 'border-gray-300',
      ]" type="number" step="0.1" placeholder="" />
      <div v-if="violations?.distancia" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.distancia }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorrido_inicio" class="text-gray-700 block text-sm font-bold capitalize">
        inicio
      </label>
      <input id="recorrido_inicio" v-model="item.inicio" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.inicio ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.inicio" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.inicio }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorrido_final" class="text-gray-700 block text-sm font-bold capitalize">
        final
      </label>
      <input id="recorrido_final" v-model="item.final" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.final ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.final" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.final }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorrido_paradas" class="text-gray-700 block text-sm font-bold capitalize">
        paradas
      </label>
      <input id="recorrido_paradas" v-model="item.paradas" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.paradas ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.paradas" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.paradas }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorrido_nombre" class="text-gray-700 block text-sm font-bold capitalize">
        nombre
      </label>
      <input id="recorrido_nombre" v-model="item.nombre" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nombre ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nombre" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorrido_nota" class="text-gray-700 block text-sm font-bold capitalize">
        nota
      </label>
      <input id="recorrido_nota" v-model="item.nota" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nota ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nota" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nota }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorrido_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="recorrido_status" v-model="item.status" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.status ? 'border-red-500' : 'border-gray-300',
      ]" type="number" placeholder="" />
      <div v-if="violations?.status" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label for="recorrido_legacyId" class="text-gray-700 block text-sm font-bold capitalize">
        legacyId
      </label>
      <input id="recorrido_legacyId" v-model="item.legacyId" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.legacyId ? 'border-red-500' : 'border-gray-300',
      ]" type="number" placeholder="" />
      <div v-if="violations?.legacyId" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.legacyId }}
      </div>
    </div>

    <button type="submit" class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600">
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Recorrido } from "~~/types/recorrido";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Recorrido;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Recorrido> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Recorrido): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
