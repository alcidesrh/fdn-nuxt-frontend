this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.breadcrumb = (function () {
    'use strict';

    var index = {
      root: {
        padding: '1rem',
        background: '{content.background}',
        gap: '0.5rem'
      },
      item: {
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        iconColor: '{navigation.item.icon.color}',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}'
        }
      },
      separator: {
        color: '{navigation.item.icon.color}'
      }
    };

    return index;

})();
