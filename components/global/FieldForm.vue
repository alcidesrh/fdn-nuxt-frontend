<template>
  <Fieldset v-if="schema && schema.wrapper && schema.type == 'Fieldset'" v-bind="schema.props">
    <template v-if="schema.children">
      <!-- <FormKitSchema :schema="{ ...v, children: `$slots.children` }" :data="data" :library="library"> -->
      <slot v-for="(v2, i2) in schema.children" :key="i2" :name="v2.name">
        <FormKitSchema :schema="v2" :data="data" />
      </slot>
      <!-- </FormKitSchema> -->
    </template>
  </Fieldset>
</template>


<script setup lang="ts">
import Fieldset from '~/form/inputs/fieldset/Fieldset.vue';
interface Props {
  schema: [any]
}
const { schema } = defineProps<Props>()

const library = markRaw({
  Fieldset: Fieldset
})

const data = ref({})

function getSchema(v, i) {
  const temp = useCloned(v).cloned
  cl(v.children)
  temp.value.children = `$slots.${v.props.id}`
  return temp.value
}
</script>
