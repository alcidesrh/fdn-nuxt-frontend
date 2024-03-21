<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTween } from '@/composables/useTween'

const { animation } = useTween()
const tl = ref()
const main = ref()
const allow_banner_amimation = computed(() => !window.matchMedia('(max-width: 1000px)').matches)
const toggle_animation = () => tl.value.paused(!tl.value.paused())

onMounted(() => {
  if (allow_banner_amimation.value)
    tl.value = animation()
})
function getAxisY() {
  const random = Math.floor(Math.random() * 80)
  if (random < 60)
    return random
  return 80 - random
}
const getRamdon = (min = 0, max = 10) => Math.floor(Math.random() * (max - min) + min)

function starSize(min = 1, max = 7) {
  const size = getRamdon(min, max)
  return { width: `${size}px`, height: `${size}px` }
}
</script>

<template>
  <div class="telon left-0 z-900 bg-black absolute w-full h-120px top-0 opacity-0 " />

<div ref="main" class="absolute h-full w-full overflow-hidden" @click="toggle_animation()">
  <div id="luna" class="to-remove absolute left-50% z-99 h-60px w-60px rounded-full bg-slate-300 brightness-125" />
</div>

<div class="star absolute left-0 h-full w-full" @click="toggle_animation()">
  <div v-for="i, index in 500" :id="`star-${index}`" :key="i" to-remove absolute rounded-full bg-slate-3
    class="star-item z-999"
    :style="{ left: `${Math.floor(Math.random() * 1800)}px`, top: `${getAxisY()}px`, ...starSize(1, 3) }" />
</div>

<div class="cloud1" />
<div class="cloud2" />
<div class="cloud3" />
<div class="cloud4" />

<div class="street1 street left-0 z-10 h-40px w-1920px flex items-center justify-between bg-slate-700 shadow-2xl">
  <span v-for="i in 10" :key="i" class="street-middle h-1.5px w-85px bg-white" />
  </div>

  <!-- <div class="fixed top-130px">
            <div class="fixed left-50% top-180px top-50% z-40">
              <div id="cerradura"
                class="absolute w-262px flex scale-50 items-center justify-center border border-slate-400 border-solid bg-slate-200 px-5 py-3 -right-130px">
                <div id="barra" class="h-20px w-220px flex items-center justify-around rounded bg-zinc-500" />
                <div class="lock_support ml-150px" />
                <div class="lock_support flex items-center" />
                <div class="lock_support -ml-150px" />

                <LockIcon id="lock" theme="filled" size="50" class="absolute z-2 mt-12" fill="#475569" :stroke-width="5"
                  stroke-linecap="square" />

                <UnLockIcon id="unlock" theme="filled" size="50" class="absolute z-1 mt-12" fill="#475569" :stroke-width="5"
                  stroke-linecap="square" />

                <div class="nail2 left-0 top-0 m-1" />
                <div class="nail left-0 top-0 m-1" />
                <div class="nail2 right-0 top-0 m-1" />
                <div class="nail right-0 top-0 m-1" />
                <div class="nail2 bottom-0 right-0 m-1" />
                <div class="nail bottom-0 right-0 m-1" />
                <div class="nail2 bottom-0 left-0 m-1" />
                <div class="nail bottom-0 left-0 m-1" />
              </div>
            </div>
          </div> -->

  <Logo />

  <div id="target"
    class="absolute bottom-0 right-0 z-120 grid max-h-40px max-w-250px w-100% flex items-center border-2 border-slate-3 rounded-full rounded-b-none rounded-r-none border-solid">
    <router-link id="logo-wrap" to="/" class="layout-topbar-logo">
      <div class="relative h-60px w-full">
        <WheelIcon id="wheel1" class="absolute bottom-5px left-40px fill-slate-300 text-25px -z-1" />
        <WheelIcon id="wheel2" class="absolute bottom-5px left-165px fill-slate-300 text-25px -z-1" />
      </div>
    </router-link>
    <div v-if="allow_banner_amimation" id="header-bus"
      class="to-remove absolute bottom-1px z-20 hidden h-40px w-250px overflow-hidden border border-3 border-slate-300 rounded-bl-15px rounded-tl-70px rounded-tr-20px" />
    <img id="img-logo" src="/logo_actual.png" class="absolute left-30px top-12px z-12 h-22px w-100px">
    <div id="grid-wrap" class="absolute top-0 block h-8px w-100% overflow-hidden bg-slate-700/10">
      <div class="p-grid bg-slate-900/10">
        <div class="col-2 flex" />
        <div v-for="i, index in 12" id="bus_half_up" :key="index"
          class="col border-left-2 relative flex justify-center border-yellow-50 px-1px">
          <div class="absolute top-23px h-5px w-5px rounded-full bg-slate-700 -left-8px" />
          <div class="absolute left-7px top-23px h-5px w-5px rounded-full bg-slate-700" />
        </div>
      </div>
    </div>
    <div id="bus_half_down" class="absolute bottom-0 grid h-23px w-100% rounded-tl-full bg-slate-100">
      <div class="border-top-1 mt-9px h-5px w-full bg-red-300" />
      <div class="border-top-1 mt-2px h-5px w-full bg-emerald-500" />
    </div>
  </div>
  <div id="target2"
    class="absolute bottom-0 z-120 grid max-h-40px max-w-250px w-100% flex items-center border-2 border-slate-3 rounded-full rounded-b-none rounded-r-none border-solid">
    <router-link id="logo-wrap" to="/" class="layout-topbar-logo">
      <div class="relative h-60px w-full">
        <WheelIcon id="wheel1" class="absolute bottom-5px left-40px fill-slate-300 text-25px -z-1" />
        <WheelIcon id="wheel2" class="absolute bottom-5px left-165px fill-slate-300 text-25px -z-1" />
      </div>
    </router-link>
    <div v-if="allow_banner_amimation" id="header-bus"
      class="to-remove absolute bottom-1px z-120 hidden h-40px w-250px overflow-hidden border border-3 border-slate-300 rounded-bl-15px rounded-tl-70px rounded-tr-20px" />
    <img id="img-logo" src="/logo_actual.png" class="absolute left-30px top-12px z-12 h-22px w-100px">
    <div id="grid-wrap" class="absolute top-0 block h-8px w-100% overflow-hidden bg-slate-700/10">
      <div class="p-grid bg-slate-900/10">
        <div class="col-2 flex" />
        <div v-for="i, index in 12" id="bus_half_up" :key="index"
          class="col border-left-2 relative flex justify-center border-yellow-50 px-1px">
          <div class="absolute top-23px h-5px w-5px rounded-full bg-slate-700 -left-8px" />
          <div class="absolute left-7px top-23px h-5px w-5px rounded-full bg-slate-700" />
        </div>
      </div>
    </div>
    <div id="bus_half_down" class="absolute bottom-0 grid h-23px w-100% rounded-tl-full bg-slate-100">
      <div class="border-top-1 mt-9px h-5px w-full bg-red-300" />
      <div class="border-top-1 mt-2px h-5px w-full bg-emerald-500" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.street {
  position: fixed;
  top: 60px;
  width: 100%;
}

.lock_support {
  @apply h-25px w-14px bg-slate-3 -mt-2px rounded-0px shadow-slate-8 shadow-slate-4xl s border-slate-400 border-solid border-t-2 border-b-2 rounded-2px z-3 absolute;
}

.nail,
.nail2 {
  @apply w-2 h-2 rounded-full bg-slate-500 absolute border border-slate-500 border-solid z-20;
}

.nail2 {
  @apply bg-yellow-200/60 z-10;
}
</style>
