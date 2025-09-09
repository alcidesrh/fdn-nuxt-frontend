<template>
  <div>
    <Accordion v-bind="attrs" pt:root:class="border-none">
      <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
        <AccordionHeader>
          <div class="flex gap-3 items-center min-w-20em">
            <Icon v-if="icon" size="16" :name="icon" mode="svg" />
            <span class=" capitalize ">{{ label }}</span>
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
