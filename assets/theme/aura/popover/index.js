this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.popover = (function () {
    'use strict';

    var index = {
      root: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        color: '{overlay.popover.color}',
        borderRadius: '{overlay.popover.border.radius}',
        shadow: '{overlay.popover.shadow}',
        gutter: '10px'
      },
      content: {
        padding: '{overlay.popover.padding}'
      },
      arrowOffset: '1.25rem'
    };

    return index;

})();
