this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.progressspinner = (function () {
    'use strict';

    var index = {
      colorScheme: {
        light: {
          root: {
            'color.1': '{red.500}',
            'color.2': '{blue.500}',
            'color.3': '{green.500}',
            'color.4': '{yellow.500}'
          }
        },
        dark: {
          root: {
            'color.1': '{red.400}',
            'color.2': '{blue.400}',
            'color.3': '{green.400}',
            'color.4': '{yellow.400}'
          }
        }
      }
    };

    return index;

})();
