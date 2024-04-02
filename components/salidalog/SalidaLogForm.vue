<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="salidalog_tipo"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        tipo
      </label>
      <input
        id="salidalog_tipo"
        v-model="item.tipo"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.tipo ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
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
        for="salidalog_salida"
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
        for="salidalog_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="salidalog_createdAt"
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
        for="salidalog_updatedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        updatedAt
      </label>
      <input
        id="salidalog_updatedAt"
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
        for="salidalog_descripcion"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        descripcion
      </label>
      <input
        id="salidalog_descripcion"
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
        for="salidalog_user"
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
import type { SalidaLog } from "~~/types/salidalog";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: SalidaLog;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<SalidaLog> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: SalidaLog): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
