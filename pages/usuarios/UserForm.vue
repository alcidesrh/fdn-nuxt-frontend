<template>
  <CrudForm :data="data" :store="store" :arg="$route.params.id ? { username: $route.params.id } : null">

    <template #localidad="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
  </CrudForm>
</template>
<script setup lang="ts">

const store = useUserStore()
const {entity} = storeToRefs(store)

const nacionStore = useNacionStore()
const { naciones } = storeToRefs(nacionStore)
const data = ref({
  localidades: naciones,
  item: computed(() => entity.value.item),
})
</script>
