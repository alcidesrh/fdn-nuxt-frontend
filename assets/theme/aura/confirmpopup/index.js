this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.confirmpopup = (function () {
    'use strict';

    var index = {
      root: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        color: '{overlay.popover.color}',
        borderRadius: '{overlay.popover.border.radius}',
        padding: '{overlay.popover.padding}',
        shadow: '{overlay.popover.shadow}',
        gutter: '10px'
      },
      content: {
        padding: '{overlay.popover.padding}',
        gap: '1rem'
      },
      icon: {
        size: '1.5rem',
        color: '{overlay.popover.color}'
      },
      footer: {
        gap: '0.5rem',
        padding: '0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}'
      },
      arrowOffset: '1.25rem'
    };

    return index;

})();
