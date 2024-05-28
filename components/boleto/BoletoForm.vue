<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="boleto_cliente"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        cliente
      </label>
      <input
        id="boleto_cliente"
        v-model="item.cliente"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.cliente ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.cliente"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.cliente }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boleto_precio"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        precio
      </label>
      <input
        id="boleto_precio"
        v-model="item.precio"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.precio ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        step="0.1"
        placeholder=""
      />
      <div
        v-if="violations?.precio"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.precio }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boleto_boletoLogs"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        boletoLogs
      </label>
      <FormRepeater
        :values="item.boletoLogs"
        @update="(values: any[]) => (item.boletoLogs = values)"
      />
      <div
        v-if="violations?.boletoLogs"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.boletoLogs }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boleto_asiento"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        asiento
      </label>
      <input
        id="boleto_asiento"
        v-model="item.asiento"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.asiento ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.asiento"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.asiento }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boleto_salida"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        salida
      </label>
      <input
        id="boleto_salida"
        v-model="item.salida"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.salida ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.salida"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.salida }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boleto_status"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        status
      </label>
      <input
        id="boleto_status"
        v-model="item.status"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.status ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.status"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boleto_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="boleto_createdAt"
        v-model="item.createdAt"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.createdAt ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.createdAt"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.createdAt }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boleto_updatedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        updatedAt
      </label>
      <input
        id="boleto_updatedAt"
        v-model="item.updatedAt"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.updatedAt ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.updatedAt"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.updatedAt }}
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
import FormRepeater from "~~/components/common/FormRepeater.vue";
import type { Boleto } from "~~/types/boleto";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Boleto;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Boleto> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Boleto): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
