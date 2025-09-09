<template>
  <CrudForm :store="store" :arg="$route.params.id ? { id: $route.params.id } : null">

  </CrudForm>
</template>

<script setup lang="ts">

const store = useNacionStore()

</script>
