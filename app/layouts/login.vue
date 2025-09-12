<script setup lang="ts"></script>

<template>
  <main>
    <div class="layout-wrapper">
      <div class="flex h-full w-full">
        <div id="layout-content" class="layout-content">
          <div class="content u-p-l md: u-p-xl lg:u-p-5xl lg:u-py-l">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
