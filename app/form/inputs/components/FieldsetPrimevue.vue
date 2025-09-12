<script setup lang="ts">
import Fieldset from 'primevue/fieldset'

const props = defineProps(['value', 'attrs'])
</script>

<template>
  <Fieldset v-bind="attrs" class="h-fit">
    <slot :value="value" />
  </Fieldset>
</template>
