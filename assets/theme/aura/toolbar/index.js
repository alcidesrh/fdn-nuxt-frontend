this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.toolbar = (function () {
    'use strict';

    var index = {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        gap: '0.5rem',
        padding: '0.75rem'
      }
    };

    return index;

})();
