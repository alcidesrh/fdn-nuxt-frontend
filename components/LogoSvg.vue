<template>
  <!-- <div id="logo" class="z-998 fixed flex justify-center items-center  h-70px w-380px rounded-tr-full bg-fdn hidden "> -->
  <svg id="logo" class="m-auto font-bold  h-70px w-270px  " xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox=" -20 1 1000 56" shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision">

    <g transform="matrix(0.8 0 -0.2 1.2 80.487172 0)">
      <text id="logo-text-fdn" dx="-3" dy="-2" transform="matrix(10.099728 0-.999832 7.905066-65.613983 62.982489)"
        class="logo text1">
        <tspan y="2.0" class="text-12px font-600 text-white">
          FDN
        </tspan>
      </text>
      <text id="logo-text-transporte" dx="60" dy="0" transform="matrix(2.525159 0 0 1.605208 39.230048 14.044482)"
        stroke-width="0">
        <tspan y="0" x="20" font-weight="600" stroke-width="0" class="logo text2 u-text-3">
          <![CDATA[Transportes]]>
        </tspan>
      </text>
      <text id="logo-text-fuente" dx="60" dy="3.5" font-weight="900"
        transform="matrix(2.2097938 0 0 1.625208 30.29833 50.669444)" stroke-width="0">
        <tspan y="5" x="30" font-weight="600" stroke-width="0" class="logo text3 u-text-3 ">
          <![CDATA[Fuentes del Norte]]>
        </tspan>
      </text>
    </g>

  </svg>
</template>
<style scoped>
#logo {
  @apply fill-white font-bold;
  letter-spacing: 2px;
  font-family: 'Fast-Track';
  background-color: var(--surface-color);
  /* mix-blend-mode: darken; */
}

.text2 {
  letter-spacing: 3px;
  text-shadow: 0px 0px 15px #09090b;
  animation-delay: 4s;
  animation: fadeIn 1.5s linear forwards;
}

.text3 {
  z-index: 1;
  letter-spacing: 2px;
  text-shadow: 0px 0px 15px #09090b;
  animation-delay: 5s;
  animation: fadeIn 1.5s linear forwards;
}

.text1 {
  text-shadow: 0px 0px 5px #3f3f46;
  animation-delay: 2s;
  animation: fadeIn 0.5s linear forwards;
  @apply fill-zinc-100
}

/* .layout-topbar.layout-topbar-sticky .text1,
.layout-topbar.layout-topbar-sticky .text3,
.layout-topbar.layout-topbar-sticky .text2 {
  @apply fill-zinc-600
}

.layout-topbar.layout-topbar-sticky .text1 {
  text-shadow: 0px 0px 3px #fff;
}

.layout-topbar.layout-topbar-sticky .text2,
.layout-topbar.layout-topbar-sticky .text3 {
  text-shadow: 0px 0px 10px #fff;
} */


@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}


.layout-topbar-button:not(.logout-btn) svg path {
  @apply stroke-zinc-500 fill-none;

}

.logout-btn svg path {
  @apply stroke-slate-500;

}
</style>
