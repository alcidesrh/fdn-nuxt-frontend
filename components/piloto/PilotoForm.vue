<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="piloto_licencia"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        licencia
      </label>
      <input
        id="piloto_licencia"
        v-model="item.licencia"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.licencia ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.licencia"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.licencia }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="piloto_licenciaVencimiento"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        licenciaVencimiento
      </label>
      <input
        id="piloto_licenciaVencimiento"
        v-model="item.licenciaVencimiento"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.licenciaVencimiento ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.licenciaVencimiento"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.licenciaVencimiento }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="piloto_dpi"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        dpi
      </label>
      <input
        id="piloto_dpi"
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
        for="piloto_sexo"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        sexo
      </label>
      <input
        id="piloto_sexo"
        v-model="item.sexo"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.sexo ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.sexo"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.sexo }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="piloto_fechaNacimiento"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        fechaNacimiento
      </label>
      <input
        id="piloto_fechaNacimiento"
        v-model="item.fechaNacimiento"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.fechaNacimiento ? 'border-red-500' : 'border-gray-300',
        ]"
        type="date"
        placeholder=""
      />
      <div
        v-if="violations?.fechaNacimiento"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.fechaNacimiento }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="piloto_seguroSocial"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        seguroSocial
      </label>
      <input
        id="piloto_seguroSocial"
        v-model="item.seguroSocial"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.seguroSocial ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.seguroSocial"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.seguroSocial }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="piloto_nacionalidad"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nacionalidad
      </label>
      <input
        id="piloto_nacionalidad"
        v-model="item.nacionalidad"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.nacionalidad ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.nacionalidad"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.nacionalidad }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="piloto_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="piloto_createdAt"
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
        for="piloto_updatedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        updatedAt
      </label>
      <input
        id="piloto_updatedAt"
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
        for="piloto_status"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        status
      </label>
      <input
        id="piloto_status"
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
        for="piloto_legacyId"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        legacyId
      </label>
      <input
        id="piloto_legacyId"
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
        for="piloto_apellido"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        apellido
      </label>
      <input
        id="piloto_apellido"
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
        for="piloto_nombre"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nombre
      </label>
      <input
        id="piloto_nombre"
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
        for="piloto_email"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        email
      </label>
      <input
        id="piloto_email"
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
        for="piloto_nit"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nit
      </label>
      <input
        id="piloto_nit"
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
        for="piloto_telefono"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        telefono
      </label>
      <input
        id="piloto_telefono"
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
        for="piloto_direccion"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        direccion
      </label>
      <input
        id="piloto_direccion"
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
        for="piloto_localidad"
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
import type { Piloto } from "~~/types/piloto";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Piloto;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Piloto> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: Piloto): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
