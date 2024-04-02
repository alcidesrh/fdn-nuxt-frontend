<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="salida_fecha"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        fecha
      </label>
      <input
        id="salida_fecha"
        v-model="item.fecha"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.fecha ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.fecha"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.fecha }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="salida_bus"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        bus
      </label>
      <FormRepeater
        :values="item.bus"
        @update="(values: any[]) => (item.bus = values)"
      />
      <div
        v-if="violations?.bus"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.bus }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="salida_recorrido"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        recorrido
      </label>
      <FormRepeater
        :values="item.recorrido"
        @update="(values: any[]) => (item.recorrido = values)"
      />
      <div
        v-if="violations?.recorrido"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.recorrido }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="salida_empresa"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        empresa
      </label>
      <FormRepeater
        :values="item.empresa"
        @update="(values: any[]) => (item.empresa = values)"
      />
      <div
        v-if="violations?.empresa"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.empresa }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="salida_salidaLogs"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        salidaLogs
      </label>
      <FormRepeater
        :values="item.salidaLogs"
        @update="(values: any[]) => (item.salidaLogs = values)"
      />
      <div
        v-if="violations?.salidaLogs"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.salidaLogs }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="salida_boletos"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        boletos
      </label>
      <FormRepeater
        :values="item.boletos"
        @update="(values: any[]) => (item.boletos = values)"
      />
      <div
        v-if="violations?.boletos"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.boletos }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="salida_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="salida_createdAt"
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
        for="salida_updatedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        updatedAt
      </label>
      <input
        id="salida_updatedAt"
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
    <div class="mb-2">
      <label
        for="salida_status"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        status
      </label>
      <input
        id="salida_status"
        v-model="item.status"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.status ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        placeholder=""
      />
      <div
        v-if="violations?.status"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.status }}
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
import type { Salida } from "~~/types/salida";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Salida;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Salida> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Salida): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
