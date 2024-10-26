<script setup lang="ts">
import Fieldset from 'primevue/fieldset';

const props = defineProps({
  context: Object as any,
  // options: []
})
const value = ref()
watch(() => value.value, (v) => {
  props.context.node.input(v)
})
</script>
<template>

  <Fieldset :legend="context.legend">
    <p class="m-0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </Fieldset>
</template>
