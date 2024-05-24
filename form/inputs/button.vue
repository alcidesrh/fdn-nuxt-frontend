<template>
  <component :is="component" :to="to" :href="href" @click="$emit('click')" :class="buttonClasses" v-bind="{ type }"
    :disabled="isLoading">
    <span v-if="!isLoading" class="d-flex align-items-center justify-content-center">
      <span v-if="$slots.icon" class="d-inline-block me-1">
        <slot name="icon"></slot>
      </span>
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
const { variant, size, to, href, label } = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  type: {
    type: String as PropType<'submit' | 'reset' | 'button'>,
    default: 'button',
  },
  to: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'default'>,
    default: 'primary',
  },
});

const component = computed(() => {
  if (to || href) return resolveComponent('NuxtLink');
  return 'button';
});

const buttonClasses = computed(() => {
  return `btn btn-${variant} btn-${size}`;
});
</script>

<style lang="scss">
.btn-default {
  border-color: #c2ccd6 !important;

  &:hover,
  &:focus {
    background-color: #f0f2f5 !important;
  }
}
</style>
