<script setup lang="ts">

const menuStore = useMenuStateStore()

const iconProps = {
  theme: "line",
  size: "16",
  strokeWidth: "5",
}
</script>
<style scoped>
.sidebar-control-btn {

  position: absolute;
  display: flex;
  justify-content: center;
  z-index: 999;
  top: 70px;
  left: 28px;
  z-index: 999;
  gap: .75rem;

  &>button.hidden {
    display: none
  }

  &>button {
    &>span>>>svg {
      stroke: var(--p-button-secondary-color)
    }
  }
}
</style>

<template>

  <div class="sidebar-control-btn" :class="[menuStore.mode]">

    <Button @click="menuStore.collapse = !menuStore.collapse" class="mode-collapse " icon="pi pi-angle-double-up"
      rounded raised severity="secondary" :class="{ 'rotate-180': !menuStore.collapse }" />
    <Button @click="menuStore.setMode('mini')" raised severity="secondary" class=" rounded-full!">
      <template #default>
        <CustomIcon name="freeze-column" v-bind="iconProps" />
      </template>
    </Button>
    <Button @click="menuStore.setMode('close')" class="mode-desktop" raised severity="secondary" rounded
      icon="pi pi-angle-double-left" />
    <Button @click="menuStore.setMode('active');" class="mode-mobile hidden" raised icon="pi pi-angle-double-left"
      rounded severity="secondary" />

  </div>
  <!-- </div> -->

</template>
