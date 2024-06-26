this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.skeleton = (function () {
    'use strict';

    var index = {
      root: {
        borderRadius: '{content.border.radius}'
      },
      colorScheme: {
        light: {
          root: {
            background: '{surface.200}',
            animationBackground: 'rgba(255,255,255,0.4)'
          }
        },
        dark: {
          root: {
            background: 'rgba(255, 255, 255, 0.06)',
            animationBackground: 'rgba(255, 255, 255, 0.04)'
          }
        }
      }
    };

    return index;

})();
