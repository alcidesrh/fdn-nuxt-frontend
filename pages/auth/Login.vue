<script setup>
import { computed } from "vue";

definePageMeta({
  layout: false,
  path: "/login",
});
const allow_banner_amimation = computed(
  () => !window.matchMedia("(max-width: 1000px)").matches
);
</script>
<template>
  <div class="layout-wrapper z-10">
    <div class="layout-topbar left-0 top-0 text-slate-800 shadow">
      <HeaderAnimation v-if="allow_banner_amimation" class="z-10 sm:relative" />
    </div>
    <div class="layout-sidebar z-1 h-full">
      <Skeleton class="mb-2" />
      <Skeleton width="10rem" class="mb-2" />
      <Skeleton width="5rem" class="mb-2" />
      <Skeleton height="2rem" class="mb-2" />
      <Skeleton width="10rem" height="4rem" />
      <Skeleton class="mb-2" />
      <Skeleton width="10rem" class="mb-2" />
      <Skeleton width="5rem" class="mb-2" />
      <Skeleton height="2rem" class="mb-2" />
      <Skeleton width="10rem" height="4rem" />
      <ul class="layout-menu">
        <li class="menu-option mb-2 mt-3" />
      </ul>
    </div>

    <div class="layout-main-container h-full">
      <div class="layout-main">
        <div class="overlay left-0 z-2" />
        <div class="overlay2 right-0 z-2" />

        <FormLogin />
      </div>
    </div>
  </div>
</template>

<style>
.overlay,
.overlay2 {
  @apply bg-sky-400/50 fixed h-full w-50% bottom-0 top-80px;
}
</style>
