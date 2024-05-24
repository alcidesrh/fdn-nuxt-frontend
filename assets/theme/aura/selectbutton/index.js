this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.selectbutton = (function () {
    'use strict';

    var index = {
      root: {
        borderRadius: '{form.field.border.radius}'
      },
      colorScheme: {
        light: {
          root: {
            invalidBorderColor: '{form.field.invalid.border.color}'
          }
        },
        dark: {
          root: {
            invalidBorderColor: '{form.field.invalid.border.color}'
          }
        }
      }
    };

    return index;

})();
