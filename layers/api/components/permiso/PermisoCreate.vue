<template>
  <nuxt-link :to="{ name: 'permisos' }" class="text-blue-600 hover:text-blue-800">
    &lt; Back to list
  </nuxt-link>
  <!-- <h1 class="text-3xl my-4">Create Permiso</h1>

  <div v-if="isLoading" class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm" role="status">
    Loading...
  </div> -->

  <!-- <div v-if="error" class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm" role="alert">
    {{ error }}
  </div> -->


  <!-- <Form :errors="violations" @submit="create" /> -->
  <div class="grid grid-cols-2 gap-5">
    <div>
      <FormKit v-if="schemaEntities" type="form" v-model="entity" :actions="false" form-class="u-mt-m">
        <FormKitSchema :schema="schemaEntities" />
      </FormKit>

      <divider class="u-my-l" />

      <FormKit id="entityForm" v-if="schema.length" type="form" :actions="false">
        <FormKitSchema :schema="schema" :key="schema" :data="dato" />
      </FormKit>



    </div>
    <!-- <div v-html="dato" class="break-all" contenteditable="true"> -->

    <!-- </div> -->

  </div>

</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch, reactive, unref } from "vue";
import { storeToRefs } from "pinia";
import Form from "~~/components/permiso/PermisoForm.vue";
import { usePermisoCreateStore } from "~~/stores/permiso/create";
import { useCreateItem, useFetchItem } from "~~/composables/api";
import { getIdFromIri } from "~~/utils/resource";
import type { Permiso } from "~~/types/permiso";
import { FormKitSchema } from "@formkit/vue";
import { reset } from '@formkit/core'
const permisoCreateStore = usePermisoCreateStore();
const { created, isLoading, violations, error } = storeToRefs(permisoCreateStore);


let schema = ref([])
const schemaEntities = ref()
const entity = ref()
let dato = reactive([])

const datetime12h = ref();
const datetime24h = ref();
const time = ref();

async function create(item: Permiso) {
  const data = await useCreateItem<Permiso>("permisos", item);
  permisoCreateStore.setData(data);

  if (!created?.value?.["@id"]) {
    permisoCreateStore.setError("Missing item id. Please reload");
    return;
  }

  navigateTo({
    name: "permisos-id-edit",
    params: { id: getIdFromIri(created?.value?.["@id"]) },
  });
}

async function getEntities() {

  permisoCreateStore.setError("Missing item id. Please reload");
  const data = await useFetchItem<Permiso>("create_forms/entity")

  schemaEntities.value = data.retrieved.value['hydra:member']
  return;

}


async function getResources() {

  const data = await useFetchItem<Permiso>("resources")

  const result = data.retrieved.value['hydra:member']
  return;

}
async function getForm() {

  permisoCreateStore.setError("Missing item id. Please reload");
  const data = await useFetchItem<Permiso>("create_forms/" + entity.value.entity);
  reset('entityForm')
  schema.value = data.retrieved.value['hydra:member']
  dato = reactive(JSON.stringify(schema.value))
  // console.log((unref(await data.retrieved.value['hydra:member'])));


  return;

}
watch(entity, async (input, old) => {

  if (entity.value.entity) {

    getForm()
  }

})
onBeforeUnmount(() => {
  permisoCreateStore.$reset();
});

onMounted(() => {
  // getForm();
  getEntities();
  getResources();
});
</script>
