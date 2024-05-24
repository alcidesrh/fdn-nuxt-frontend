<script setup>
const props = defineProps({
  context: Object,
})
function handleInput(e) {
  props.context.node.input(e.target.value)
}
</script>

<template>
  <InputText type="text" v-model="value" required />
  <div class="grid">
    <label for=" username">Username</label>
    <InputText id="username" v-model="value" aria-describedby="username-help" />
    <small id="username-help">Enter your username to reset your password.</small>
  </div>
  <!-- <FloatLabel> -->
  <!-- <InputText id="username" v-model="value" /> -->
  <!-- <label for="username">Username</label> -->
  <!-- </FloatLabel> -->
</template>
