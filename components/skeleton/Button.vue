<script setup lang="ts">
defineProps({
  rows: {
    type: Number,
    default: 1
  },
  columns: {
    type: Number,
    default: 1
  },
  class: {
    type: String,
    default: 'ml-auto'
  }
})
</script>
<template>

  <div class="grid  gap-2" :class="class"
    :style="`grid-template-columns: repeat(${columns}, 3fr); max-width: ${(columns * 107) + 20}px`">
    <skeleton v-for="column, i in Number(columns * rows)" :key="i" class="min-w-107px u-my-s alcides" height="2rem">
    </skeleton>
  </div>

</template>
