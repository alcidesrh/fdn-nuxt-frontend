this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.tree = (function () {
    'use strict';

    var index = {
      root: {
        background: '{content.background}',
        color: '{content.color}',
        padding: '1rem',
        gap: '2px',
        indent: '1rem'
      },
      node: {
        padding: '0.25rem 0.5rem',
        borderRadius: '{content.border.radius}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{text.color}',
        hoverColor: '{text.hover.color}',
        selectedColor: '{highlight.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}'
        },
        gap: '0.25rem'
      },
      nodeIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        selectedColor: '{highlight.color}'
      },
      nodeToggleButton: {
        borderRadius: '50%',
        size: '1.75rem',
        hoverBackground: '{content.hover.background}',
        selectedHoverBackground: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        selectedHoverColor: '{primary.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}'
        }
      },
      loadingIcon: {
        size: '2rem'
      }
    };

    return index;

})();