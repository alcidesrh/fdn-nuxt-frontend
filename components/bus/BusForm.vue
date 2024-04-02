<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="bus_codigo"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        codigo
      </label>
      <input
        id="bus_codigo"
        v-model="item.codigo"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.codigo ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.codigo"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.codigo }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="bus_asientos"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        asientos
      </label>
      <FormRepeater
        :values="item.asientos"
        @update="(values: any[]) => (item.asientos = values)"
      />
      <div
        v-if="violations?.asientos"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.asientos }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="bus_precioVariacionAsientoA"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        precioVariacionAsientoA
      </label>
      <input
        id="bus_precioVariacionAsientoA"
        v-model="item.precioVariacionAsientoA"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.precioVariacionAsientoA ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        step="0.1"
        placeholder=""
      />
      <div
        v-if="violations?.precioVariacionAsientoA"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.precioVariacionAsientoA }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="bus_precioVariacionAsientoB"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        precioVariacionAsientoB
      </label>
      <input
        id="bus_precioVariacionAsientoB"
        v-model="item.precioVariacionAsientoB"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.precioVariacionAsientoB ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        step="0.1"
        placeholder=""
      />
      <div
        v-if="violations?.precioVariacionAsientoB"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.precioVariacionAsientoB }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="bus_empresa"
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
        for="bus_piloto"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        piloto
      </label>
      <FormRepeater
        :values="item.piloto"
        @update="(values: any[]) => (item.piloto = values)"
      />
      <div
        v-if="violations?.piloto"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.piloto }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="bus_marca"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        marca
      </label>
      <input
        id="bus_marca"
        v-model="item.marca"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.marca ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.marca"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.marca }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="bus_placa"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        placa
      </label>
      <input
        id="bus_placa"
        v-model="item.placa"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.placa ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.placa"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.placa }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="bus_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="bus_createdAt"
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
        for="bus_updatedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        updatedAt
      </label>
      <input
        id="bus_updatedAt"
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
        for="bus_status"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        status
      </label>
      <input
        id="bus_status"
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
    <div class="mb-2">
      <label
        for="bus_legacyId"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        legacyId
      </label>
      <input
        id="bus_legacyId"
        v-model="item.legacyId"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.legacyId ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        placeholder=""
      />
      <div
        v-if="violations?.legacyId"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.legacyId }}
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
import type { Bus } from "~~/types/bus";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Bus;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Bus> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Bus): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
