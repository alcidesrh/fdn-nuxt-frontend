<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="loading-wall">
    <!-- app/spa-loading-template.html -->
    <div>
      <div class="loading-spinner">
        <!-- <div class="spinner"></div> -->
        <div class="logo-fdn">
          <span>F</span>
          <span>D</span>
          <span>N</span>
        </div>
        <div class="wheel-container">
          <div class="wheel ">

            <!-- <div class="spoke"></div>
        <div class="spoke"></div>
        <div class="spoke"></div>
        <div class="spoke"></div>
        <div class="spoke"></div>
        <div class="spoke"></div> -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style>
@font-face {
  font-family: "diplomata-sc-regular";
  font-weight: 100 1000;
  font-stretch: 25% 151%;
  src: url("/fonts/DiplomataSC-Regular.ttf") format("truetype");
}

.loading-wall {
  /* w-screen h-screen bg-slate-300/60 z-999 fixed */
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  background-color: --alpha(var(--p-surface-contrast-100) / 30%);
  backdrop-filter: blur(5px);
}

.logo-fdn {
  z-index: 90;
  position: absolute;
  color: var(--p-surface-contrast-400);
  transition: color 0.2s;
  font-size: 55px;
  font-weight: 400;
  font-family: "diplomata-sc-regular";
  /* opacity: .5; */
}

.loading-spinner {
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Center the wheel in the viewport */
.wheel-container {
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  background-color: none;
}

/* Wheel styling */
.wheel {
  position: relative;
  width: 30px;
  height: 30px;
  background-color: none;
  border-radius: 50%;
  border: 6px dashed var(--p-surface-contrast-200);
  animation: spin .5s linear infinite;
  /* margin-left: -5px; */
  background-color: var(--p-surface-contrast-600)
}

/* Spokes (6 total, evenly spaced) */


/* .spoke:nth-child(7) { transform: rotate(180deg); }
    .spoke:nth-child(8) { transform: rotate(210deg); }
    .spoke:nth-child(9) { transform: rotate(240deg); }
    .spoke:nth-child(10) { transform: rotate(270deg); }
    .spoke:nth-child(11) { transform: rotate(300deg); }
    .spoke:nth-child(12) { transform: rotate(330deg); } */

/* @keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
} */
</style>
