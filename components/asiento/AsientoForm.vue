<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="asiento_numero"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        numero
      </label>
      <input
        id="asiento_numero"
        v-model="item.numero"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.numero ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        placeholder=""
      />
      <div
        v-if="violations?.numero"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.numero }}
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
import type { Asiento } from "~~/types/asiento";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Asiento;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Asiento> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Asiento): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
