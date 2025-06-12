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

const { items, entity } = storeToRefs(store)
store.getItems()

const parents = computed(() => items.value.filter(v => entity.value.item.id != v.value && (entity.value.item?.children ? !entity.value.item?.children.includes(v.value) : true)))
  
const children = computed(() => items.value.filter(v => entity.value.item.id != v.value && (entity.value.item.parents ? !entity.value.item.parents || !entity.value.item.parents.includes(v.value) : true)))

const data = ref({
  children: children,
  parents: parents,
  item: computed(() => entity.value.item),
})
</script>
