<script setup lang="ts">
const { breadcrumb } = useBreadcrumb()
</script>

<template>
  <div class="breadcrumb-wrap">
    <Breadcrumb :model="breadcrumb">
      <template #item="{ item, props }">
        <NuxtLink v-if="item.path" :to="item.path">
          <div class="breadcrumb-item">
            <!-- <div v-if="item.icon">
              <Icon :name="item.icon" class="cursor-pointer" mode="svg" />
            </div> -->
            <span class="whitespace-nowrap capitalize ">{{ item.label }}</span>
          </div>
        </NuxtLink>
        <div v-else class="breadcrumb-item">
          <!-- <div v-if="item.icon">
            <Icon :name="item.icon" class="cursor-pointer" mode="svg" />
          </div> -->
          <span class="whitespace-nowrap capitalize ">{{ item.label }}</span>
        </div>
      </template>

      <!-- <template #separator>
        <Icon name="icon-park-outline:right" mode="svg" />
      </template> -->
    </Breadcrumb>
  </div>
</template>

<style scoped>
.breadcrumb-wrap {
  /* background-color: var(--p-surface-contrast-400); */
  z-index: 999;
  position: fixed;
  left: calc(35px + 1.2rem);
  height: var(--topbar);
  display: flex;
  align-items: center;
  position: relative;
}

:deep(.p-breadcrumb-separator-icon) {
  color: var(--p-surface-contrast-400);
  width: 10px;

}

.breadcrumb-item {
  display: flex;
  gap: 5px;
  border-radius: 8px;
  align-items: center;
  padding: 0px 3px;
  font-size: .8rem;
  font-weight: 600;
  color: var(--p-surface-contrast-400);
  /* font-style: italic; */

  &>div>svg {
    font-size: 4 !important;

    &>* {
      stroke-width: 3
    }
  }

  &:hover {
    color: var(--p-surface-contrast-700);
  }
}
</style>
