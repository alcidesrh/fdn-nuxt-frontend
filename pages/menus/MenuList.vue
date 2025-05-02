<template>
  <div>
    <collection-list :store="store" :collection="collection" @sort="collection.sort"
      @removeMultiple="store.removeMultiple">
      <template #icon="{ data }">
        <Icon v-if="data" class="" :name="data" mode="svg" aria-haspopup="true" aria-controls="overlay_menu"
          size="20" />
        <span v-else>---</span>
      </template>
    </collection-list>
  </div>
</template>
<script setup lang="ts">

const store = useMenuStore()

const { collection } = store

collection.iniCollection()

const classfromserver = 'grid grid-cols-2 gap-8'

</script>
