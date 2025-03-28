<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="role_nombre"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nombre
      </label>
      <input
        id="role_nombre"
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
        for="role_parent"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        parent
      </label>
      <FormRepeater
        :values="item.parent"
        @update="(values: any[]) => (item.parent = values)"
      />
      <div
        v-if="violations?.parent"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.parent }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="role_children"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        children
      </label>
      <FormRepeater
        :values="item.children"
        @update="(values: any[]) => (item.children = values)"
      />
      <div
        v-if="violations?.children"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.children }}
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
import type { Role } from "~~/types/role";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Role;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Role> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Role): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
