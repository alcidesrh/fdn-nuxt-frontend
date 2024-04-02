<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="agencia_users"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        users
      </label>
      <FormRepeater
        :values="item.users"
        @update="(values: any[]) => (item.users = values)"
      />
      <div
        v-if="violations?.users"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.users }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="agencia_alias"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        alias
      </label>
      <input
        id="agencia_alias"
        v-model="item.alias"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.alias ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.alias"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.alias }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="agencia_email"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        email
      </label>
      <input
        id="agencia_email"
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
        for="agencia_telefono"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        telefono
      </label>
      <input
        id="agencia_telefono"
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
        for="agencia_direccion"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        direccion
      </label>
      <input
        id="agencia_direccion"
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
        for="agencia_localidad"
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
    <div class="mb-2">
      <label
        for="agencia_nombre"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nombre
      </label>
      <input
        id="agencia_nombre"
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
        for="agencia_nota"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nota
      </label>
      <input
        id="agencia_nota"
        v-model="item.nota"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.nota ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.nota"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.nota }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="agencia_status"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        status
      </label>
      <input
        id="agencia_status"
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
        for="agencia_legacyId"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        legacyId
      </label>
      <input
        id="agencia_legacyId"
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
import type { Agencia } from "~~/types/agencia";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Agencia;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Agencia> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Agencia): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
