<script setup lang="ts">
import Entities from './Entities.vue'

const visible = ref(false)
</script>

<template>
  <div>
    <Drawer v-model:visible="visible" :modal="false" class="h-full overflow-y-auto" header="Admin&Config" position="right">
      <divider />
      <div>
        <Entities />
      </div>
    </Drawer>
    <div class="fixed-center-vertical text-slate-6 bg-slate-3">
      <Icon name="icon-park-outline:setting-two" mode="svg" @click="visible = true" />
    </div>
  </div>
</template>

<style src="~/assets/layout/admin/_drawer.css" />

<style scoped></style>
