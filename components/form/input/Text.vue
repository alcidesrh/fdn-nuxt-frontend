<script setup>
const props = defineProps(['modelValue'])
</script>

<template>
  <div class="flex-column flex gap-2">
    <label for="username">Username</label>
    <InputText :value="modelValue" aria-describedby="username-help" @input="$emit('update:modelValue', $event.target.value)" />
    <small id="username-help">Enter your username to reset your password.</small>
  </div>
</template>
