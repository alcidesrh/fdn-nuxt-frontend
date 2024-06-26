this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.scrollpanel = (function () {
    'use strict';

    var index = {
      bar: {
        size: '9px',
        borderRadius: '{border.radius.sm}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}'
        }
      },
      colorScheme: {
        light: {
          bar: {
            background: '{surface.100}'
          }
        },
        dark: {
          bar: {
            background: '{surface.800}'
          }
        }
      }
    };

    return index;

})();
