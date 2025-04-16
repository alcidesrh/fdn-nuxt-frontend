<template>
  <div class=" bg-slate-700 u-text-2 font-medium text-black  top-0 left-0
  w-full  u-p-l line-height-loose ">

    <Accordion :value="[0, 1, 2]" class="flex w-full gap-4  " multiple>
      <AccordionPanel v-for="(data, i) in value" :key="i" :value="i"
        class="  bg-white max-h-95vh overflow-y-scroll w-full ">
        <AccordionHeader class="p-0 u-px-xs">
          <div v-if="data.header" v-text="data.header + ' :'" class="u-text-2 u-p-xs"></div>
        </AccordionHeader>
        <AccordionContent class="bg-white max-h-95vh overflow-scroll w-full">
          <!-- <div style="width: 100%; height: 100%; overflow: scroll;" > -->
          <pre contenteditable="true" v-text="data" class="bg-white max-h-95vh overflow-scroll w-full" />

          <!-- </div> -->
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
<script setup lang="ts">
// const props = defineProps(['value'])
const value = ref()

const channel = new BroadcastChannel('app-data');
channel.addEventListener('message', (event) => {
  value.value = useCloned(event.data).cloned.value

});

</script>
