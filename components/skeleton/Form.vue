<script setup lang="ts">
defineProps({
  rows: {
    type: Number,
    default: 10
  },
  columns: {
    type: Number,
    default: 1
  }
})
</script>
<template>

  <div class="grid  gap-2 gap-x-6  u-m-l md:max-w-50% lg:max-w-30% w-full min-w-25%"
    :style="`grid-template-columns: repeat(${columns}, 3fr);`">
    <skeleton v-for="column, i in Number(columns * rows)" :key="i" class="u-my-s min-w-400px" height="2rem"></skeleton>
  </div>

</template>
