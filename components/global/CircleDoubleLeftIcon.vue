<script setup>
// import { ToLeft, ToBottom, DoubleDown, DoubleLeft  } from '@icon-park/vue-next';
import { SortThree } from '@icon-park/vue-next';

defineProps({
  direction: String
})
</script>
<template>
  <SortThree :class="{ 'rotate-90': direction == 'horizontal' }" />
</template>
