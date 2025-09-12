<script setup lang="ts">
const store = usePermisoStore()
</script>

<template>
  <div>
    <collection-list :store="store" />
  </div>
</template>
