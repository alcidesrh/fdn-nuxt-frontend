<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="salida_ruta"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        ruta
      </label>
      <FormRepeater
        :values="item.ruta"
        @update="(values: any[]) => (item.ruta = values)"
      />
      <div
        v-if="violations?.ruta"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.ruta }}
      </div>
    </div>
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
  };
}

let emit = defineEmits<{
  (e: "submit", item: Salida): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
