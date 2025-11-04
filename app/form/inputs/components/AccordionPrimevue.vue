<script setup lang="ts">
const props = defineProps(['value', 'attrs', 'label', 'icon'])

const tabs = ref([
  { title: 'Title 1', content: 'Content 1', value: '0' },
])

const { icon, label } = props.attrs
</script>

<template>
  <div>
    <Accordion v-bind="attrs" pt:root:class="border-none">
      <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
        <AccordionHeader>
          <div class="min-w-20em flex items-center gap-3">
            <Icon v-if="icon" size="16" :name="icon" mode="svg" />
            <span class="capitalize">{{ label }}</span>
          </div>
        </AccordionHeader>
        <AccordionContent>
          <slot v-bind="value" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
