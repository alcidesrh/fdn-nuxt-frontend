<template>
  <div>
    <CrudForm :form-id="'actionForm'" :data="data" :store="store"
      :arg="$route.params.id ? { id: $route.params.id } : null" />
  </div>
</template>
<script setup lang="ts">

const store = useActionStore()
const { entity } = storeToRefs(store)
const data = ref({
  item: computed(() => entity.value.item)
})


</script>
