<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="bus_asientosClaseA"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        asientosClaseA
      </label>
      <input
        id="bus_asientosClaseA"
        v-model="item.asientosClaseA"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.asientosClaseA ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        placeholder=""
      />
      <div
        v-if="violations?.asientosClaseA"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.asientosClaseA }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="bus_asientosClaseB"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        asientosClaseB
      </label>
      <input
        id="bus_asientosClaseB"
        v-model="item.asientosClaseB"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.asientosClaseB ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        placeholder=""
      />
      <div
        v-if="violations?.asientosClaseB"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.asientosClaseB }}
      </div>
    </div>
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
  };
}

let emit = defineEmits<{
  (e: "submit", item: Bus): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
