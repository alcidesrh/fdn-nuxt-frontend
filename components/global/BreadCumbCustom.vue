<template>
  <div class=" flex justify-center ">

    <Breadcrumb :model="breadcrumb">
      <template #item="{ item, props }">
        <NuxtLink :to="item.path">
          <div class="breadcrumb-item">
            <div v-if="item.icon">
              <Icon :name="item.icon" class=" cursor-pointer  u-text-0! " mode="svg" />
            </div>
            <span class="capitalize whitespace-nowrap">{{ item.label }}</span>
          </div>
        </NuxtLink>
      </template>

      <template #separator>
        <Icon name="icon-park-outline:right" class="surface-contrast-400 cursor-pointer  u-text-1!" mode="svg" />
      </template>
    </Breadcrumb>
  </div>
</template>
<script setup lang="ts">
const { breadcrumb } = useBreadcrumb();

</script>

<style scoped>
.breadcrumb-item {
  color: var(--p-surface-contrast-400);
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 3px 1px;
  font-size: 16px;
  font-weight: 500;

}

.p-breadcrumb-separator>svg {
  color: var(--p-surface-contrast-400);
}

.breadcrumb-item,
.p-breadcrumb-separator>svg {
  color: var(--p-surface-contrast-400);
}

.breadcrumb-item:hover,
.p-breadcrumb-separator>svg:hover {
  color: var(--p-surface-contrast-700);
}

.p-breadcrumb-list>.p-breadcrumb-item:last-child .breadcrumb-item {
  opacity: 1;
  color: var(--p-surface-contrast-700);
}
</style>
