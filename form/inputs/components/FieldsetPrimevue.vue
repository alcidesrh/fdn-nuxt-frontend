<template>
  <div>
    <Fieldset v-bind="attrs">
      <slot :value="value"></slot>
    </Fieldset>
  </div>
</template>

<script setup lang="ts">
import Fieldset from 'primevue/fieldset';

const props = defineProps(['value', 'attrs'])
cl(props.attrs)

</script>
