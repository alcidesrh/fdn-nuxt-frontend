<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="localidad_nombre"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nombre
      </label>
      <input
        id="localidad_nombre"
        v-model="item.nombre"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.nombre ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.nombre"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="localidad_pais"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        pais
      </label>
      <FormRepeater
        :values="item.pais"
        @update="(values: any[]) => (item.pais = values)"
      />
      <div
        v-if="violations?.pais"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.pais }}
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
import type { Localidad } from "~~/types/localidad";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Localidad;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Localidad> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Localidad): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
