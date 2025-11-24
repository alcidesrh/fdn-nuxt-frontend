<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="user_username" class="text-gray-700 block text-sm font-bold capitalize">
        username
      </label>
      <input id="user_username" v-model="item.username" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.username ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.username" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.username }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_password" class="text-gray-700 block text-sm font-bold capitalize">
        password
      </label>
      <input id="user_password" v-model="item.password" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.password ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="The hashed password" />
      <div v-if="violations?.password" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.password }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_apiTokens" class="text-gray-700 block text-sm font-bold capitalize">
        apiTokens
      </label>
      <input id="user_apiTokens" v-model="item.apiTokens" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.apiTokens ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.apiTokens" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.apiTokens }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_userRoles" class="text-gray-700 block text-sm font-bold capitalize">
        userRoles
      </label>
      <input id="user_userRoles" v-model="item.userRoles" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.userRoles ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.userRoles" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.userRoles }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_permisos" class="text-gray-700 block text-sm font-bold capitalize">
        permisos
      </label>
      <FormRepeater :values="item.permisos" @update="(values: any[]) => (item.permisos = values)" />
      <div v-if="violations?.permisos" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.permisos }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_createdAt" class="text-gray-700 block text-sm font-bold capitalize">
        createdAt
      </label>
      <input id="user_createdAt" v-model="item.createdAt" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.createdAt ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.createdAt" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.createdAt }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_updatedAt" class="text-gray-700 block text-sm font-bold capitalize">
        updatedAt
      </label>
      <input id="user_updatedAt" v-model="item.updatedAt" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.updatedAt ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="Returns updatedAt." />
      <div v-if="violations?.updatedAt" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.updatedAt }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_status" class="text-gray-700 block text-sm font-bold capitalize">
        status
      </label>
      <input id="user_status" v-model="item.status" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.status ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.status" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.status }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_legacyId" class="text-gray-700 block text-sm font-bold capitalize">
        legacyId
      </label>
      <input id="user_legacyId" v-model="item.legacyId" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.legacyId ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.legacyId" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.legacyId }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_apellido" class="text-gray-700 block text-sm font-bold capitalize">
        apellido
      </label>
      <input id="user_apellido" v-model="item.apellido" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.apellido ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.apellido" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.apellido }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_nombre" class="text-gray-700 block text-sm font-bold capitalize">
        nombre
      </label>
      <input id="user_nombre" v-model="item.nombre" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nombre ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nombre" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nombre }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_email" class="text-gray-700 block text-sm font-bold capitalize">
        email
      </label>
      <input id="user_email" v-model="item.email" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.email ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.email" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.email }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_nit" class="text-gray-700 block text-sm font-bold capitalize">
        nit
      </label>
      <input id="user_nit" v-model="item.nit" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.nit ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.nit" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.nit }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_telefono" class="text-gray-700 block text-sm font-bold capitalize">
        telefono
      </label>
      <input id="user_telefono" v-model="item.telefono" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.telefono ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.telefono" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.telefono }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_direccion" class="text-gray-700 block text-sm font-bold capitalize">
        direccion
      </label>
      <input id="user_direccion" v-model="item.direccion" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.direccion ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.direccion" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.direccion }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_localidad" class="text-gray-700 block text-sm font-bold capitalize">
        localidad
      </label>
      <input id="user_localidad" v-model="item.localidad" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.localidad ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.localidad" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.localidad }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_fullName" class="text-gray-700 block text-sm font-bold capitalize">
        fullName
      </label>
      <input id="user_fullName" v-model="item.fullName" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.fullName ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.fullName" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.fullName }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_id" class="text-gray-700 block text-sm font-bold capitalize">
        id
      </label>
      <input id="user_id" v-model="item.id" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.id ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.id" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.id }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_userIdentifier" class="text-gray-700 block text-sm font-bold capitalize">
        userIdentifier
      </label>
      <input id="user_userIdentifier" v-model="item.userIdentifier" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.userIdentifier ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.userIdentifier" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.userIdentifier }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_roles" class="text-gray-700 block text-sm font-bold capitalize">
        roles
      </label>
      <FormRepeater :values="item.roles" @update="(values: any[]) => (item.roles = values)" />
      <div v-if="violations?.roles" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.roles }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_token" class="text-gray-700 block text-sm font-bold capitalize">
        token
      </label>
      <input id="user_token" v-model="item.token" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.token ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.token" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.token }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_validTokenStrings" class="text-gray-700 block text-sm font-bold capitalize">
        validTokenStrings
      </label>
      <input id="user_validTokenStrings" v-model="item.validTokenStrings" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.validTokenStrings ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.validTokenStrings" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.validTokenStrings }}
      </div>
    </div>
    <div class="mb-2">
      <label for="user_label" class="text-gray-700 block text-sm font-bold capitalize">
        label
      </label>
      <input id="user_label" v-model="item.label" :class="[
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
import FormRepeater from "~/components/common/FormRepeater.vue";
import type { User } from "~/types/user";
import type { SubmissionErrors } from "~/types/error";

const props = defineProps<{
  values?: User;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<User> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

let emit = defineEmits<{
  (e: "submit", item: User): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
