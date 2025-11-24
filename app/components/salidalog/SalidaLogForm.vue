<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="salidalog_tipo" class="text-gray-700 block text-sm font-bold capitalize">
        tipo
      </label>
      <input id="salidalog_tipo" v-model="item.tipo" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.tipo ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.tipo" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.tipo }}
      </div>
    </div>
    <div class="mb-2">
      <label for="salidalog_salida" class="text-gray-700 block text-sm font-bold capitalize">
        salida
      </label>
      <input id="salidalog_salida" v-model="item.salida" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.salida ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.salida" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.salida }}
      </div>
    </div>
    <div class="mb-2">
      <label for="salidalog_createdAt" class="text-gray-700 block text-sm font-bold capitalize">
        createdAt
      </label>
      <input id="salidalog_createdAt" v-model="item.createdAt" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.createdAt ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.createdAt" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.createdAt }}
      </div>
    </div>
    <div class="mb-2">
      <label for="salidalog_updatedAt" class="text-gray-700 block text-sm font-bold capitalize">
        updatedAt
      </label>
      <input id="salidalog_updatedAt" v-model="item.updatedAt" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.updatedAt ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="Returns updatedAt." />
      <div v-if="violations?.updatedAt" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.updatedAt }}
      </div>
    </div>
    <div class="mb-2">
      <label for="salidalog_descripcion" class="text-gray-700 block text-sm font-bold capitalize">
        descripcion
      </label>
      <input id="salidalog_descripcion" v-model="item.descripcion" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.descripcion ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.descripcion" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.descripcion }}
      </div>
    </div>
    <div class="mb-2">
      <label for="salidalog_user" class="text-gray-700 block text-sm font-bold capitalize">
        user
      </label>
      <input id="salidalog_user" v-model="item.user" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.user ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.user" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.user }}
      </div>
    </div>
    <div class="mb-2">
      <label for="salidalog_id" class="text-gray-700 block text-sm font-bold capitalize">
        id
      </label>
      <input id="salidalog_id" v-model="item.id" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.id ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.id" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.id }}
      </div>
    </div>
    <div class="mb-2">
      <label for="salidalog_label" class="text-gray-700 block text-sm font-bold capitalize">
        label
      </label>
      <input id="salidalog_label" v-model="item.label" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.label ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.label" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.label }}
      </div>
    </div>

    <button type="submit" class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600">
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { Ref } from "vue";
import type { SalidaLog } from "~/types/salidalog";
import type { SubmissionErrors } from "~/types/error";

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
