this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.menu = (function () {
    'use strict';

    var index = {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}'
      },
      list: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}'
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}'
        }
      },
      submenuLabel: {
        padding: '{navigation.submenu.label.padding}',
        fontWeight: '{navigation.submenu.label.font.weight}',
        background: '{navigation.submenu.label.background.}',
        color: '{navigation.submenu.label.color}'
      },
      separator: {
        borderColor: '{content.border.color}'
      }
    };

    return index;

})();
