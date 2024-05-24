this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.divider = (function () {
    'use strict';

    var index = {
      root: {
        borderColor: '{content.border.color}'
      },
      content: {
        background: '{content.background}',
        color: '{text.color}'
      },
      horizontal: {
        margin: '1rem 0',
        padding: '0 1rem',
        content: {
          padding: '0 0.5rem'
        }
      },
      vertical: {
        margin: '0 1rem',
        padding: '0.5rem 0',
        content: {
          padding: '0.5rem 0'
        }
      }
    };

    return index;

})();
