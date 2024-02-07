
<template>
  <WheelIcon id="wheel-logo" class="absolute z-99 fill-slate-400 text-25px opacity-0" />

  <div class="logo hidden h-80px w-full w-full w-full items-center" style="font-family: 'Fast-Track';">

    <div class="name-wrap">
      <span v-for="el, i in `Transportes `" :key="i" class="char name1 text-stone-500 shadow-2xl" v-text="el" />
    </div>
    <div class="name-wrap">
      <span v-for="el, i in `Fuente del Norte`" :key="i" class="char name2 text-stone-500" v-text="el" />
    </div>
  </div>
</template>
