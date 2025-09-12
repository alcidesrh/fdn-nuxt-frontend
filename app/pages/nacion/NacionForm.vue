<script setup lang="ts">
const store = useNacionStore()
</script>

<template>
  <CrudForm :store="store" :arg="$route.params.id ? { id: $route.params.id } : null" />
</template>
