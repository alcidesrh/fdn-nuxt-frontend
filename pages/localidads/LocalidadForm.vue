<template>

  <CrudForm :store="store" :arg="$route.params.id ? { id: $route.params.id } : null">
    <template #nacion="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
  </CrudForm>
</template>

<script setup lang="ts">

const store = useLocalidadStore()
const nacionStore = useNacionStore()

const { naciones } = storeToRefs(nacionStore)
nacionStore.getNaciones()

const { item } = storeToRefs(store)

const data = ref({
  naciones: naciones,
})
</script>
