<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label for="menu_menuItems" class="text-gray-700 block text-sm font-bold capitalize">
        menuItems
      </label>
      <FormRepeater :values="item.menuItems" @update="(values: any[]) => (item.menuItems = values)" />
      <div v-if="violations?.menuItems" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.menuItems }}
      </div>
    </div>
    <div class="mb-2">
      <label for="menu_seccion" class="text-gray-700 block text-sm font-bold capitalize">
        seccion
      </label>
      <input id="menu_seccion" v-model="item.seccion" :class="[
        'mt-1 w-full px-3 py-2 border rounded',
        violations?.seccion ? 'border-red-500' : 'border-gray-300',
      ]" type="text" placeholder="" />
      <div v-if="violations?.seccion" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm">
        {{ violations.seccion }}
      </div>
    </div>

    <button type="submit" class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600">
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FormRepeater from "~~/components/common/FormRepeater.vue";
import type { Menu } from "~~/types/menu";
import type { SubmissionErrors } from "~~/types/error";

const props = defineProps<{
  values?: Menu;
  errors?: SubmissionErrors;
}>();

const violations = toRef(props, "errors");

let item: Ref<Menu> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
  };
}

let emit = defineEmits<{
  (e: "submit", item: Menu): void;
}>();

function emitSubmit() {
  emit("submit", item.value);
}
</script>
