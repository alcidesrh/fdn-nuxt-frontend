<template>
  <Fieldset v-bind="attrs">
    <slot :value="value"></slot>
  </Fieldset>
</template>

<script setup lang="ts">
import Fieldset from 'primevue/fieldset';

const props = defineProps(['value', 'attrs'])

</script>
