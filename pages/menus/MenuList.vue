<template>
  <div>
    <collection-list :store="store" :collection="collection" @sort="collection.sort"
      @removeMultiple="store.removeMultiple">

    </collection-list>
  </div>
</template>
<script setup lang="ts">

const store = useMenuStore()

const { collection } = store

collection.iniCollection()

const classfromserver = 'grid grid-cols-2 gap-8'

</script>
