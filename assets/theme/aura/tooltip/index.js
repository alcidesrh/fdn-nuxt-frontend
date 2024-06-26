this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.tooltip = (function () {
    'use strict';

    var index = {
      root: {
        maxWidth: '12.5rem',
        gutter: '0.25rem',
        shadow: '{overlay.popover.shadow}',
        padding: '0.5rem 0.75rem',
        borderRadius: '{overlay.popover.border.radius}'
      },
      colorScheme: {
        light: {
          root: {
            background: '{surface.700}',
            color: '{surface.0}'
          }
        },
        dark: {
          root: {
            background: '{surface.700}',
            color: '{surface.0}'
          }
        }
      }
    };

    return index;

})();
