<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="boletolog_boleto"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        boleto
      </label>
      <FormRepeater
        :values="item.boleto"
        @update="(values: any[]) => (item.boleto = values)"
      />
      <div
        v-if="violations?.boleto"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.boleto }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boletolog_tipo"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        tipo
      </label>
      <input
        id="boletolog_tipo"
        v-model="item.tipo"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.tipo ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        placeholder=""
      />
      <div
        v-if="violations?.tipo"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.tipo }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boletolog_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="boletolog_createdAt"
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
        for="boletolog_updatedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        updatedAt
      </label>
      <input
        id="boletolog_updatedAt"
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
        for="boletolog_descripcion"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        descripcion
      </label>
      <input
        id="boletolog_descripcion"
        v-model="item.descripcion"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.descripcion ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.descripcion"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.descripcion }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="boletolog_user"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        user
      </label>
      <FormRepeater
        :values="item.user"
        @update="(values: any[]) => (item.user = values)"
      />
      <div
        v-if="violations?.user"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.user }}
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
import type { BoletoLog } from "~~/types/boletolog";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: BoletoLog;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<BoletoLog> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: BoletoLog): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
