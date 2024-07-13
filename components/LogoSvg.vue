<script setup>
const props = defineProps({

  flag: {
    type: Boolean,
    default: false
  },

})
const menuStore = useMenuStateStore()
</script>
<template>
  <!-- <div id="logo" class="z-998 fixed flex justify-center items-center  h-70px w-380px rounded-tr-full bg-fdn hidden "> -->
  <svg :class="['logo-svg', menuStore.mode, 'flag' ?? flag]" id="logo" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox=" -20 1 780 56" shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision">

    <g transform="matrix(0.8 0 -0.2 1.2 80.487172 0)">
      <text id="logo-text-fdn" dx="-3" dy="-2" transform="matrix(10.099728 0-.999832 7.905066-65.613983 62.982489)"
        class="logo text1">
        <tspan y="2.0" class="text-12px font-600 text-white">
          FDN
        </tspan>
      </text>
      <text id="logo-text-fdn" dx="-3" dy="-2" transform="matrix(10.099728 0-.999832 7.905066-65.613983 62.982489)"
        class="logo text1">
        <tspan y="2.0" class="text-12px font-600 text-white">
          FDN
        </tspan>
      </text>
      <text id="logo-text-fdn" dx="-3" dy="-2" transform="matrix(10.099728 0-.999832 7.905066-65.613983 62.982489)"
        class="logo text1">
        <tspan y="2.0" class="text-12px font-600 text-white">
          FDN
        </tspan>
      </text>
      <text id="logo-text-transporte1" dx="60" dy="0" transform="matrix(2.525159 0 0 1.605208 39.230048 14.044482)"
        stroke-width="0">
        <tspan y="-1" x="20" font-weight="600" stroke-width="0" class="logo text2 u-text-">
          <![CDATA[Transportes]]>
        </tspan>
      </text>
      <text id="logo-text-transporte2" dx="60" dy="0" transform="matrix(2.525159 0 0 1.605208 39.230048 14.044482)"
        stroke-width="0">
        <tspan y="-1" x="20" font-weight="600" stroke-width="0" class="logo text2 u-text-2">
          <![CDATA[Transportes]]>
        </tspan>
      </text>
      <text id="logo-text-transporte3" dx="60" dy="0" transform="matrix(2.525159 0 0 1.605208 39.230048 14.044482)"
        stroke-width="0">
        <tspan y="-1" x="20" font-weight="600" stroke-width="0" class="logo text2 u-text-2">
          <![CDATA[Transportes]]>
        </tspan>
      </text>


      <text id="logo-text-fuente1" dx="60" dy="3.5" font-weight="900"
        transform="matrix(2.2097938 0 0 1.625208 30.29833 50.669444)" stroke-width="0">
        <tspan y="6" x="30" font-weight="600" stroke-width="0" class="logo text3 u-text-2 ">
          <![CDATA[Fuentes del Norte]]>
        </tspan>
      </text> <text id="logo-text-fuente2" dx="60" dy="3.5" font-weight="900"
        transform="matrix(2.2097938 0 0 1.625208 30.29833 50.669444)" stroke-width="0">
        <tspan y="6" x="30" font-weight="600" stroke-width="0" class="logo text3 u--text-2 ">
          <![CDATA[Fuentes del Norte]]>
        </tspan>
      </text>
      <text id="logo-text-fuente3" dx="60" dy="3.5" font-weight="900"
        transform="matrix(2.2097938 0 0 1.625208 30.29833 50.669444)" stroke-width="0">
        <tspan y="5" x="30" font-weight="600" stroke-width="0" class="logo text3 u-text-2 ">
          <![CDATA[Fuentes del Norte]]>
        </tspan>
      </text>
    </g>
  </svg>
</template>
<style scoped>
#logo {
  /* left: calc(50vw - 85.1px); */
  @apply fixed fill-zinc-700 h-70px w-200px top-0;
  letter-spacing: 2px;
  font-family: 'Fast-Track';
  overflow: visible;
  mix-blend-mode: luminosity;
}


#logo-text-transporte1>.text2 {

  mix-blend-mode: luminosity;
  z-index: 1;
  letter-spacing: 2px;
  text-shadow: 5px -4px 30px var(--yellow-50);
  animation-delay: 5s;
  animation: fadeIn 1.5s linear forwards;
}

#logo-text-transporte2>.text2 {

  mix-blend-mode: luminosity;
  z-index: 1;
  letter-spacing: 2px;
  text-shadow: 5px 0px 30px var(--yellow-50);
  animation-delay: 5s;
  animation: fadeIn 1.5s linear forwards;
}

#logo-text-transporte3>.text2 {
  mix-blend-mode: luminosity;
  z-index: 1;
  letter-spacing: 2px;
  text-shadow: -10px 5px 25px var(--yellow-300);
  animation-delay: 5s;
  animation: fadeIn 1.5s linear forwards;
}

#logo-text-fuente1>.text3 {

  mix-blend-mode: luminosity;
  z-index: 1;
  letter-spacing: 2px;
  text-shadow: 14px 10px 33px var(--yellow-50);
  animation-delay: 5s;
  animation: fadeIn 1.5s linear forwards;
}

#logo-text-fuente2>.text3 {
  mix-blend-mode: luminosity;
  z-index: 1;
  letter-spacing: 2px;
  text-shadow: -10px 2px 17px var(--slate-100);
  animation-delay: 5s;
  animation: fadeIn 1.5s linear forwards;
}

#logo-text-fuente3>.text3 {
  mix-blend-mode: luminosity;
  z-index: 1;
  letter-spacing: 2px;
  text-shadow: -1px 0px 44px white;
  animation-delay: 5s;
  animation: fadeIn 1.5s linear forwards;
}

.text1 {
  text-shadow: 0px 0px 5px var(--slate-300);
  animation-delay: 2s;
  animation: fadeIn 0.5s linear forwards;
  @apply fill-zinc-700
}


@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
