this.primevue = this.primevue || {};
this.primevue.themes = this.primevue.themes || {};
this.primevue.themes.aura = this.primevue.themes.aura || {};
this.primevue.themes.aura.listbox = (function () {
    'use strict';

    var index = {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        shadow: '{form.field.shadow}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}'
        }
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
        header: {
          padding: '{list.header.padding}'
        }
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}'
      },
      optionGroup: {
        background: '{list.option.group.background}',
        color: '{list.option.group.color}',
        fontWeight: '{list.option.group.font.weight}',
        padding: '{list.option.group.padding}'
      },
      checkmark: {
        color: '{list.option.color}'
      },
      emptyMessage: {
        padding: '{list.option.padding}'
      }
    };

    return index;

})();
