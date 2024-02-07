<script setup>
import { Login, Logout } from '@icon-park/vue-next';
const props = defineProps(['toggle'])
</script>
<template>
  <login v-if="toggle" theme="outline" size="30" fill="#475569" :strokeWidth="3" strokeLinecap="butt" />
  <logout v-else theme="outline" size="30" fill="#475569" :strokeWidth="3" strokeLinecap="butt" />
</template>
