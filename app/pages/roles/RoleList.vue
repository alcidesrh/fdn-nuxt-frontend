<script setup lang="ts">
const store = useRoleStore()
</script>

<template>
  <div>
    <collection-list :store="store" />
  </div>
</template>
