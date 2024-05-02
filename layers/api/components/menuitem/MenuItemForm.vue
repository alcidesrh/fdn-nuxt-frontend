<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="menuitem_link"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        link
      </label>
      <input
        id="menuitem_link"
        v-model="item.link"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.link ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.link"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.link }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menuitem_nombre"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nombre
      </label>
      <input
        id="menuitem_nombre"
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
        for="menuitem_nota"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        nota
      </label>
      <input
        id="menuitem_nota"
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
        for="menuitem_status"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        status
      </label>
      <input
        id="menuitem_status"
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
        for="menuitem_parent"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        parent
      </label>
      <input
        id="menuitem_parent"
        v-model="item.parent"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.parent ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
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
        for="menuitem_posicion"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        posicion
      </label>
      <input
        id="menuitem_posicion"
        v-model="item.posicion"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.posicion ? 'border-red-500' : 'border-gray-300',
        ]"
        type="number"
        placeholder=""
      />
      <div
        v-if="violations?.posicion"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.posicion }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="menuitem_children"
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
    <div class="mb-2">
      <label
        for="menuitem_slug"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        slug
      </label>
      <input
        id="menuitem_slug"
        v-model="item.slug"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.slug ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.slug"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.slug }}
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
import type { MenuItem } from "~~/types/menuitem";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: MenuItem;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<MenuItem> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: MenuItem): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
