<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="cliente_dpi"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        dpi
      </label>
      <input
        id="cliente_dpi"
        v-model="item.dpi"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.dpi ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.dpi"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.dpi }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="cliente_createdAt"
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
        for="cliente_updatedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        updatedAt
      </label>
      <input
        id="cliente_updatedAt"
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
        for="cliente_status"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        status
      </label>
      <input
        id="cliente_status"
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
        for="cliente_legacyId"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        legacyId
      </label>
      <input
        id="cliente_legacyId"
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
    <div class="mb-2">
      <label
        for="cliente_apellido"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        apellido
      </label>
      <input
        id="cliente_apellido"
        v-model="item.apellido"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.apellido ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.apellido"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.apellido }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_nombre"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nombre
      </label>
      <input
        id="cliente_nombre"
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
        for="cliente_email"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        email
      </label>
      <input
        id="cliente_email"
        v-model="item.email"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.email ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.email"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.email }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_nit"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nit
      </label>
      <input
        id="cliente_nit"
        v-model="item.nit"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.nit ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.nit"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.nit }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_telefono"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        telefono
      </label>
      <input
        id="cliente_telefono"
        v-model="item.telefono"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.telefono ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.telefono"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.telefono }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_direccion"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        direccion
      </label>
      <input
        id="cliente_direccion"
        v-model="item.direccion"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.direccion ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.direccion"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.direccion }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="cliente_localidad"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        localidad
      </label>
      <FormRepeater
        :values="item.localidad"
        @update="(values: any[]) => (item.localidad = values)"
      />
      <div
        v-if="violations?.localidad"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.localidad }}
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
import type { Cliente } from "~~/types/cliente";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Cliente;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Cliente> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Cliente): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
