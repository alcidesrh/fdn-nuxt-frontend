this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.treetable = (function () {
    'use strict';

    var index = {
      header: {
        background: '{content.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.75rem 1rem',
        fontWeight: '600'
      },
      headerCell: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        fontWeight: '600',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}'
        }
      },
      row: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}'
        }
      },
      bodyCell: {
        borderColor: '{treetable.border.color}',
        padding: '0.75rem 1rem',
        gap: '0.5rem'
      },
      footerCell: {
        background: '{content.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        padding: '0.75rem 1rem',
        fontWeight: '600'
      },
      footer: {
        background: '{content.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}'
      },
      columnResizerWidth: '0.5rem',
      resizeIndicator: {
        width: '1px',
        color: '{primary.color}'
      },
      sortIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}'
      },
      loadingIcon: {
        size: '2rem'
      },
      nodeToggleButton: {
        hoverBackground: '{content.hover.background}',
        selectedHoverBackground: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        selectedHoverColor: '{primary.color}',
        size: '1.75rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}'
        }
      },
      paginatorTop: {
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0'
      },
      paginatorBottom: {
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0'
      },
      colorScheme: {
        light: {
          root: {
            borderColor: '{content.border.color}'
          },
          bodyCell: {
            selectedBorderColor: '{primary.100}'
          }
        },
        dark: {
          root: {
            borderColor: '{surface.800}'
          },
          bodyCell: {
            selectedBorderColor: '{primary.900}'
          }
        }
      }
    };

    return index;

})();
