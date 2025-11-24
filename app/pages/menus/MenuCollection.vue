<script setup lang="ts">
const store = useMenuStore()
</script>

<template>
  <div>
    <collection-list :store="store" />
  </div>
</template>
