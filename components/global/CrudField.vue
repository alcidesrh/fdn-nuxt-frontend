<template>
  <div>
    <Fieldset v-if="field.wrapper && field.type == 'Fieldset'" v-bind="field.props" class="form-wrapper">
      <template v-if="field.children">
        <slot v-for="(v2, i2) in field.children" :key="i2" :name="v2.wrapper ? v2.props.id : v2.name" :schema="v2"
          :data="data">
          <crud-field v-if="v2.wrapper && v2.children" :field="v2" :data="data" />
          <FormKitSchema v-else :schema="v2" :data="data" />
        </slot>
      </template>
    </Fieldset>
    <div v-else-if="field.wrapper && field.type == 'div'" v-bind="field.props" class="form-wrapper">
      <template v-if="field.children">
        <slot v-for="(v2, i2) in field.children" :key="i2" :name="v2.wrapper ? v2.props.id : v2.name" :schema="v2"
          :data="data">
          <FormKitSchema :schema="v2" :data="data" />
        </slot>
      </template>
    </div>
    <slot v-else :name="field.name" :schema="field" :data="data">
      <FormKitSchema :schema="field" :data="data" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { FormKitMessages } from '@formkit/vue'
interface Props {
  field: any
  data: Ref
}
const { field, data = ref() } = defineProps<Props>()


</script>
