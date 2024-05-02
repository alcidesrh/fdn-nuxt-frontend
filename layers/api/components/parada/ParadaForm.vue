<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="parada_enclave" class="text-gray-700 block text-sm font-bold capitalize">
        enclave
      </label>
      <input id="parada_enclave" v-model="item.enclave" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.enclave ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.enclave" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.enclave }}
      </div>
    </div>
    <div class="mb-2">
      <label for="parada_recorridos" class="text-gray-700 block text-sm font-bold capitalize">
        recorridos
      </label>
      <FormRepeater :values="item.recorridos" @update="(values: any[]) => (item.recorridos = values)" />
      <div v-if="violations?.recorridos" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.recorridos }}
      </div>
    </div>
    <div class="mb-2">
      <label for="parada_nombre" class="text-gray-700 block text-sm font-bold capitalize">
        nombre
      </label>
      <input id="parada_nombre" v-model="item.nombre" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nombre ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nombre" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="parada_nota" class="text-gray-700 block text-sm font-bold capitalize">
        nota
      </label>
      <input id="parada_nota" v-model="item.nota" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nota ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nota" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nota }}
      </div>
    </div>
    <div class="mb-2">
      <label for="parada_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="parada_status" v-model="item.status" :class="[
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
import FormRepeater from "~~/components/common/FormRepeater.vue";
import type { Parada } from "~~/types/parada";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Parada;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Parada> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Parada): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
