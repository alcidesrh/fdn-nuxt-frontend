this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.floatlabel = (function () {
    'use strict';

    var index = {
      root: {
        color: '{form.field.float.label.color}',
        focusColor: '{form.field.float.label.focus.color}',
        invalidColor: '{form.field.float.label.invalid.color}',
        transitionDuration: '0.2s'
      }
    };

    return index;

})();
