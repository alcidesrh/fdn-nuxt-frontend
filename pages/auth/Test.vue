<script setup>
import { ref } from 'vue'
import { token } from '@formkit/utils'

definePageMeta({
  layout: false,
  path: '/test',
})

const values = ref([])

// Iterating over this:
const items = ref([token()])

const addItem = () => {
  items.value.push(token())
}

const removeItem = (e) => {
  e.preventDefault()
  const key = e.target.getAttribute('data-key')
  console.log([...items.value])
  items.value = items.value.filter(item => item !== key)
  console.log([...items.value])
}
</script>

<template>
  <FormKit type="list" v-model="values">
    <FormKit v-for="key in items" :key="key" :id="key" type="text" label="Email Address" help="edit me to get started"
      :sections-schema="{
        suffix: {
          $el: 'a',
          attrs: {
            class: '$classes.remove',
            'data-key': '$id',
            href: '#',
            onClick: removeItem
          },
          children: 'Remove'
        }
      }" />
  </FormKit>
  <FormKit type="button" @click.prevent="addItem">
    + Add Email
  </FormKit>
  <pre wrap>{{ values }}</pre>
</template>

<style>
.formkit-remove {
  position: absolute;
  left: calc(100% + .5em);
  color: red;
  font-size: .75em;
}

button {
  align-self: flex-start;
}
</style>
