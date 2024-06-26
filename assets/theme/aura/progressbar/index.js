this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.progressbar = (function () {
    'use strict';

    var index = {
      root: {
        background: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        height: '1.25rem'
      },
      value: {
        background: '{primary.color}'
      },
      label: {
        color: '{primary.contrast.color}',
        fontSize: '0.75rem',
        fontWeight: '600'
      }
    };

    return index;

})();
