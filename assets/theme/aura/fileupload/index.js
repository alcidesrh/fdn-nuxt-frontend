this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.fileupload = (function () {
    'use strict';

    var index = {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}'
      },
      header: {
        background: 'transparent',
        color: '{text.color}',
        padding: '1.125rem',
        borderWidth: '0',
        borderRadius: '0',
        gap: '0.5rem'
      },
      content: {
        highlightBorderColor: '{primary.color}',
        padding: '0 1.125rem 1.125rem 1.125rem'
      },
      file: {
        padding: '1rem',
        gap: '1rem',
        borderColor: '{content.border.color}',
        info: {
          gap: '0.5rem'
        }
      },
      progressbar: {
        height: '0.25rem'
      },
      basic: {
        gap: '0.5rem'
      }
    };

    return index;

})();
