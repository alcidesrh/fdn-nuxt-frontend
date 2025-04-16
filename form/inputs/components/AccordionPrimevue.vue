<template>
  <div>
    <Accordion v-bind="attrs" pt:root:class="border-none">
      <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
        <AccordionHeader>
          <div class="flex gap-3 items-center">
            <Icon v-if="icon" size="20" :name="icon" mode="svg" />
            <span class="u-text-1 capitalize ">{{ label }}</span>
          </div>
        </AccordionHeader>
        <AccordionContent>
          <slot v-bind="value" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
const tabs = ref([
  { title: 'Title 1', content: 'Content 1', value: '0' },
]);

const props = defineProps(['value', 'attrs', 'label', 'icon'])

const { icon, label } = props.attrs

</script>
