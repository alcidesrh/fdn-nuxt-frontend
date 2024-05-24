<script setup lang="ts">

import { ref } from "vue";
import type { MenuItem } from "~~/types/menuitem";
import type { SubmissionErrors } from "~~/types/error";

const online = useOnline()

const props = defineProps<{
  values?: MenuItem;
  errors?: SubmissionErrors;
}>();
let schema = ref([])
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

onMounted(async () => {
  const data = await useFetchItem<MenuItem>("create_forms/Menu");
  // reset('entityForm')
  schema.value = data.retrieved.value['hydra:member']

})

const router = useRouter()
const list = ref([])
router.getRoutes().every(element => {
  let match = element.name.match(/(\w+)s-\w*/);

  if (match) {
    list.value.push({ nombre: match[1], nombreRouter: element.name, path: element.path })
  }
  else {
    console.log(element);

  }
  return true
});
console.log(router.getRoutes().length, list.value.length)



</script>
<template>
  <div class="bg-yellow-600">
    <!-- <FormKit id="entityForm" v-if="schema.length" type="form">
      <FormKitSchema :schema="schema" :key="schema" />
    </FormKit> -->
    <div class="card">
      <DataTable :value="list" scrollable scrollHeight="400px" class="u-tsext-5">
        <Column field="nombre" header="Nombre" class="capitalize"></Column>
        <Column field="nombreRouter" header="Router Nombre " class="capitalize"></Column>
        <Column field="path" header="Path"></Column>
      </DataTable>
    </div>
  </div>
</template>
