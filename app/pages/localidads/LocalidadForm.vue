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

const { items } = storeToRefs(nacionStore)
nacionStore.getItems()
const data = ref({
  naciones: items,
})
</script>
