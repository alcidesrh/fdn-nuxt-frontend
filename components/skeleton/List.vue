<script setup lang="ts">
defineProps({
  rows: {
    type: Number,
    default: 10
  },
  columns: {
    type: Number,
    require: true
  }
})
</script>
<template>

  <div class="grid  gap-2 gap-x-6 border border-slate-300 border-t-0 u-m-l" :class="[`grid-cols-${columns}`]">
    <skeleton v-for="column, i in Number(columns)" :key="i" class="mb-2" height="2rem">sds</skeleton>

    <Skeleton v-for="column, i in Number(columns * rows)" :key="i" class="mb-2"></Skeleton>


  </div>

</template>
