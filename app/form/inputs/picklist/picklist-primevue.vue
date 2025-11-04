<script setup>
const props = defineProps({
  context: Object,
})

const schema = ref(
  [{
    $formkit: 'group',
    name: `search_${props.context.field}`,
    modelValue: '$search',
    ignore: true,
    children: [
      {
        $formkit: 'text_primevue',
        name: 'term',
        placeholder: '...buscar...',
        size: 'small',
        icon: 'pi pi-times cursor-pointer',
        outerClass: 'mb-2! min-w-auto! px-0!',
      },
    ],
  }],
)
const term = ref({})
const data = ref({
  search: term.value,
})

const value = ref()
const options = ref(props.context.attrs.options)

const picklist = computed(() => {
  const noallow = []
  const allow = []
  options.value.forEach((element) => {
    if ((props.context.allowItems && props.context.allowItems.map(v => v?.value || v).includes(element.value))) {
      allow.push(element)
    }
    else if (!term.value?.term || element.label.toLowerCase().includes(term.value.term.toLowerCase())) {
      noallow.push(element)
    }
  })
  return [noallow, allow]
})
value.value = picklist.value

watch(() => picklist.value, (v) => {
  value.value = v
}, { deep: true })

watch(() => value.value, (v) => {
  props.context.node.input(v[1] ? v[1].map(v => v.value) : [])
})

// watch(() => term.value, (needle) => {

//   if (typeof needle.term == 'undefined') {
//     return
//   }
//   value.value = [!!needle.term ? value.value[0].filter(v => v.label.toLowerCase().includes(needle.term.toLowerCase())) : options.value, [...value.value[1]]]
// },
//   { deep: true })

function reset() {
  loading.value = false
  value.value = null
  props.context.node.input(null)
}
</script>

<template>
  <div>
    <PickList
      v-model="value" data-key="label" breakpoint="600px" :show-target-controls="false" :show-source-controls="false"
      scroll-height="20rem" class="max-w-40em min-h-25em u-mt-s"
    >
      <template #option="{ option }">
        <div class="w-full">
          {{ option.label }}
          <divider :pt="{ root: 'mb-0 w-full' }" />
        </div>
      </template>

      <template #sourceheader="{ header }">
        <div class="font-medium u-text-2">
          {{ context.sourceText }}
        </div>
        <div class="u-pt-xs">
          <FormKitSchema :schema="schema" :data="data" />
        </div>
      </template>
      <template #targetheader="{ header }">
        <div class="u-pb-xs u-text-1">
          {{ context.targetText }}
        </div>
      </template>
    </PickList>
  </div>
</template>
