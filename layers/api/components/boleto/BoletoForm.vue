<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="boleto_usuario"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        usuario
      </label>
      <FormRepeater
        :values="item.usuario"
        @update="(values: any[]) => (item.usuario = values)"
      />
      <div
        v-if="violations?.usuario"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.usuario }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boleto_cliente"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        cliente
      </label>
      <FormRepeater
        :values="item.cliente"
        @update="(values: any[]) => (item.cliente = values)"
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
        for="boleto_salida"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        salida
      </label>
      <FormRepeater
        :values="item.salida"
        @update="(values: any[]) => (item.salida = values)"
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
        for="boleto_asientos"
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
  };
}

let emit = defineEmits<{
  (e: "submit", item: Boleto): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
