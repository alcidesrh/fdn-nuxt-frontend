<script setup lang="ts">
const store = useActionStore()
</script>

<template>
  <div>
    <collection-list :store="store">
      <template #icon="{ data }">
        <Icon
          v-if="data" class="" :name="data" mode="svg" aria-haspopup="true" aria-controls="overlay_menu"
          size="20"
        />
        <span v-else>---</span>
      </template>
    </collection-list>
  </div>
</template>
