<template>

  <CrudForm :store="store" :arg="$route.params.id ? { id: $route.params.id } : null">
    <template #children="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
    <template #parents="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
  </CrudForm>
</template>

<script setup lang="ts">

const store = usePermisoStore()

const { items, item } = storeToRefs(store)
store.getItems()

const parents = computed(() => items.value.filter(v => item.value.id != v.value && (item.value?.children ? !item.value?.children || !item.value?.children.includes(v.value) : true)))

const children = computed(() => items.value.filter(v => item.value.id != v.value && (item.value?.parents ? !item.value?.parents || !item.value?.parents.includes(v.value) : true)))

const data = ref({
  children: children,
  parents: parents
})
</script>
