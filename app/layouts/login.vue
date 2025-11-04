<script setup lang="ts"></script>

<template>
  <main>
    <div class="layout-wrapper">
      <div class="h-full w-full flex">
        <div id="layout-content" class="layout-content">
          <div class="content md: u-p-l u-p-xl lg:u-p-5xl lg:u-py-l">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
