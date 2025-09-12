<script setup lang="ts">
const store = useMenuStore()
</script>

<template>
  <div>
    <collection-expanded-list :store="store">
      <template #icon="{ data }">
        <Icon v-if="data" :name="data" mode="svg" class="" />
      </template>
    </collection-expanded-list>
  </div>
</template>
