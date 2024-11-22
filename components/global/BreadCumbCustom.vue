<template>
  <div class=" flex justify-center ">
    <Breadcrumb :model="breadcrumb">
      <template #item="{ item, props }">
        <NuxtLink :to="item.path">
          <div class="flex gap-x-2 items-center  py-3 px-1 rounded">
            <div v-if="item.icon">
              <Icon :name="item.icon as string" class="surface-contrast-600 cursor-pointer  u-text-0!" mode="svg" />
            </div>
            <span class="surface-contrast-600 font-medium  capitalize">{{ item.label }}</span>
          </div>
        </NuxtLink>
      </template>
      <template #separator>
        <Icon name="icon-park-outline:right" class="surface-contrast-500 cursor-pointer  u-text-1!" mode="svg" />
      </template>
    </Breadcrumb>
  </div>
</template>
<script setup lang="ts">
const { breadcrumb } = useBreadcrumb();
</script>
