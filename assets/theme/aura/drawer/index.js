this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.drawer = (function () {
    'use strict';

    var index = {
      root: {
        background: '{overlay.modal.background}',
        borderColor: '{overlay.modal.border.color}',
        color: '{overlay.modal.color}',
        borderRadius: '{overlay.modal.border.radius}',
        shadow: '{overlay.modal.shadow}'
      },
      header: {
        padding: '{overlay.modal.padding}'
      },
      title: {
        fontSize: '1.5rem',
        fontWeight: '600'
      },
      content: {
        padding: '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}'
      }
    };

    return index;

})();
