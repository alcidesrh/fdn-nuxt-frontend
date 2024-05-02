<template>
  <form class="py-4" @submit.prevent="emitSubmit">

    <button type="submit" class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600">
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { FDN } from "~~/types/fdn";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: FDN;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<FDN> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: FDN): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
