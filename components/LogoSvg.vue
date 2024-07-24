<template>
  <svg id="logo" viewBox=" -20 1 780 56" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
    class="z-10 logo-fdn">

    <g transform="matrix(0.8 0 -0.2 1.2 80.487172 0)">
      <text id="logo-text-fdn" dx="-3" dy="-2" transform="matrix(10.099728 0-.999832 7.905066-65.613983 62.982489)"
        class="logo text1">
        <tspan y="2.0" class="text-12px font-600 ">
          FDN
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
      </text>
    </g>
  </svg>
</template>
<style scoped>
.logo-fdn {
  position: fixed;
  height: 70px;
  width: 200px;
  letter-spacing: 2px;
  font-family: 'Fast-Track';
  overflow: visible;
  scale: .8;
}

#logo-text-transporte3>.text2,
#logo-text-fuente1>.text3,
.logo.text1 {
  text-shadow: 0px 0px 16px var(--zinc-900);
  fill: var(--surface-0);
}

.logo.text1 {
  text-shadow: 0px 0px 5px var(--zinc-900) !important;

}
</style>
