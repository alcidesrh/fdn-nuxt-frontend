this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.terminal = (function () {
    'use strict';

    var index = {
      root: {
        background: '{form.field.background}',
        borderColor: '{form.field.border.color}',
        color: '{form.field.color}',
        height: '18rem',
        padding: '{form.field.padding.y} {form.field.padding.x}',
        borderRadius: '{form.field.border.radius}'
      },
      prompt: {
        gap: '0.25rem'
      },
      commandResponse: {
        margin: '2px 0'
      }
    };

    return index;

})();
