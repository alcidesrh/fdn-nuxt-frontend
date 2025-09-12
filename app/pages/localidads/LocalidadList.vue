<script setup lang="ts">
const store = useLocalidadStore()
</script>

<template>
  <div>
    <collection-list :store="store" />
  </div>
</template>
