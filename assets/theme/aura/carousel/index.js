this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.carousel = (function () {
    'use strict';

    var index = {
      root: {
        indicatorList: {
          padding: '1rem',
          gap: '0.5rem'
        },
        indicator: {
          width: '2rem',
          height: '0.5rem',
          borderRadius: '{content.border.radius}',
          focusRing: {
            width: '{focus.ring.width}',
            style: '{focus.ring.style}',
            color: '{focus.ring.color}',
            offset: '{focus.ring.offset}',
            shadow: '{focus.ring.shadow}'
          }
        }
      },
      colorScheme: {
        light: {
          indicator: {
            background: '{surface.200}',
            hoverBackground: '{surface.300}',
            activeBackground: '{primary.color}'
          }
        },
        dark: {
          indicator: {
            background: '{surface.700}',
            hoverBackground: '{surface.600}',
            activeBackground: '{primary.color}'
          }
        }
      }
    };

    return index;

})();
