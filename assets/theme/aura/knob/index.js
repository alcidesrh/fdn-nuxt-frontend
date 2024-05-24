this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.knob = (function () {
    'use strict';

    var index = {
      value: {
        background: '{primary.color}'
      },
      range: {
        background: '{content.border.color}'
      },
      text: {
        color: '{text.muted.color}'
      }
    };

    return index;

})();
