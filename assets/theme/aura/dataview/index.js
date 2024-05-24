this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.dataview = (function () {
    'use strict';

    var index = {
      root: {
        borderColor: 'transparent',
        borderWidth: '0',
        borderRadius: '0',
        padding: '0'
      },
      header: {
        background: '{content.background}',
        color: '{content.color}',
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.75rem 1rem',
        borderRadius: '0'
      },
      content: {
        background: '{content.background}',
        color: '{content.color}',
        borderColor: 'transparent',
        borderWidth: '0',
        padding: '0',
        borderRadius: '0'
      },
      footer: {
        background: '{content.background}',
        color: '{content.color}',
        borderColor: '{content.border.color}',
        borderWidth: '1px 0 0 0',
        padding: '0.75rem 1rem',
        borderRadius: '0'
      },
      paginatorTop: {
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0'
      },
      paginatorBottom: {
        borderColor: '{content.border.color}',
        borderWidth: '1px 0 0 0'
      }
    };

    return index;

})();
