<template>
  <div>
    <collection-list :store="store">
    </collection-list>
  </div>
</template>
<script setup lang="ts">

const store = useLocalidadStore()

</script>
