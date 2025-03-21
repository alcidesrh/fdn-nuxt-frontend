<template>
  <CrudForm :store="store" :arg="$route.params.id ? { id: $route.params.id } : null">
    <template #children="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
    <template #parent="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
  </CrudForm>
</template>

<script setup lang="ts">

const store = useMenuStore()

const { options, item } = storeToRefs(store)

const parent = computed(() => options.value.filter(v => item.value.id != v.value && (item.value?.children ? !item.value?.children || !item.value?.children.includes(v.value) : true)))

const children = computed(() => options.value.filter(v => item.value.id != v.value && v.value != item.value.parent))

const data = ref({
  children: children,
  parent: parent
})
</script>
