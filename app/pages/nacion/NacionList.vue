<script setup lang="ts">
const store = useNacionStore()

const { metadata, collection } = store

collection.iniCollection()
</script>

<template>
  <div>
    <collection-list
      :store="store" :collection="collection" @sort="collection.sort"
      @remove-multiple="store.removeMultiple"
    />
  </div>
</template>
