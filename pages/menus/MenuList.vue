<template>
  <div>
    <collection-list :store="store" :collection="collection" @sort="collection.sort"
      @removeMultiple="store.removeMultiple">

    </collection-list>
  </div>
</template>
<script setup lang="ts">

const store = useMenuStore()

const { metadata, collection } = store

collection.iniCollection()

</script>
