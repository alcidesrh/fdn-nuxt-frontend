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

  <div class="grid  gap-2 gap-x-6 border border-slate-300 border-t-0 u-m-l"
    :style="`grid-template-columns: repeat(${columns}, 1fr);`">
    <skeleton v-for="column, i in Number(columns)" :key="i" class="u-my-s" height="2rem"></skeleton>

    <Skeleton v-for="column, i in Number(columns * rows)" :key="i" class="u-my-s"></Skeleton>


  </div>

</template>
