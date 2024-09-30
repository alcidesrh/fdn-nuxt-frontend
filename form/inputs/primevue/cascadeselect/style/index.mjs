import BaseStyle from '@primevue/core/base/style';

var theme = function theme(_ref) {
  var dt = _ref.dt;
  return "\n.p-cascadeselect {\n    display: inline-flex;\n    cursor: pointer;\n    position: relative;\n    user-select: none;\n    background: ".concat(dt('cascadeselect.background'), ";\n    border: 1px solid ").concat(dt('cascadeselect.border.color'), ";\n    transition: background ").concat(dt('cascadeselect.transition.duration'), ", color ").concat(dt('cascadeselect.transition.duration'), ", border-color ").concat(dt('cascadeselect.transition.duration'), ", outline-color ").concat(dt('cascadeselect.transition.duration'), ", box-shadow ").concat(dt('cascadeselect.transition.duration'), ";\n    border-radius: ").concat(dt('cascadeselect.border.radius'), ";\n    outline-color: transparent;\n    box-shadow: ").concat(dt('cascadeselect.shadow'), ";\n}\n\n.p-cascadeselect:not(.p-disabled):hover {\n    border-color: ").concat(dt('cascadeselect.hover.border.color'), ";\n}\n\n.p-cascadeselect:not(.p-disabled).p-focus {\n    border-color: ").concat(dt('cascadeselect.focus.border.color'), ";\n    box-shadow: ").concat(dt('cascadeselect.focus.ring.shadow'), ";\n    outline: ").concat(dt('cascadeselect.focus.ring.width'), " ").concat(dt('cascadeselect.focus.ring.style'), " ").concat(dt('cascadeselect.focus.ring.color'), ";\n    outline-offset: ").concat(dt('multiscascadeselectelect.focus.ring.offset'), ";\n}\n\n.p-cascadeselect.p-variant-filled {\n    background: ").concat(dt('cascadeselect.filled.background'), ";\n}\n\n.p-cascadeselect.p-variant-filled.p-focus {\n    background: ").concat(dt('cascadeselect.filled.focus.background'), ";\n}\n\n.p-cascadeselect.p-invalid {\n    border-color: ").concat(dt('cascadeselect.invalid.border.color'), ";\n}\n\n.p-cascadeselect.p-disabled {\n    opacity: 1;\n    background: ").concat(dt('cascadeselect.disabled.background'), ";\n}\n\n.p-cascadeselect-dropdown {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    background: transparent;\n    color: ").concat(dt('cascadeselect.dropdown.color'), ";\n    width: ").concat(dt('cascadeselect.dropdown.width'), ";\n    border-top-right-radius: ").concat(dt('border.radius.md'), ";\n    border-bottom-right-radius: ").concat(dt('border.radius.md'), ";\n}\n\n.p-cascadeselect-label {\n    display: block;\n    white-space: nowrap;\n    overflow: hidden;\n    flex: 1 1 auto;\n    width: 1%;\n    text-overflow: ellipsis;\n    cursor: pointer;\n    padding: ").concat(dt('cascadeselect.padding.y'), " ").concat(dt('cascadeselect.padding.x'), ";\n    background: transparent;\n    border: 0 none;\n    outline: 0 none;\n}\n\n.p-cascadeselect-label.p-placeholder {\n    color: ").concat(dt('cascadeselect.placeholder.color'), ";\n}\n\n.p-cascadeselect-clearable .p-cascadeselect-label {\n    padding-right: 1.75rem;\n}\n\n.p-cascadeselect.p-disabled .p-cascadeselect-label {\n    color: ").concat(dt('cascadeselect.disabled.color'), ";\n}\n\n.p-cascadeselect-label-empty {\n    overflow: hidden;\n    visibility: hidden;\n}\n\n.p-cascadeselect-fluid {\n    display: flex;\n}\n\n.p-cascadeselect-fluid .p-cascadeselect-label {\n    width: 1%;\n}\n\n.p-cascadeselect-overlay {\n    background: ").concat(dt('cascadeselect.overlay.background'), ";\n    color: ").concat(dt('cascadeselect.overlay.color'), ";\n    border: 1px solid ").concat(dt('cascadeselect.overlay.border.color'), ";\n    border-radius: ").concat(dt('cascadeselect.overlay.border.radius'), ";\n    box-shadow: ").concat(dt('cascadeselect.overlay.shadow'), ";\n}\n\n.p-cascadeselect .p-cascadeselect-overlay {\n    min-width: 100%;\n}\n\n.p-cascadeselect-option-list {\n    display: none;\n    min-width: 100%;\n    position: absolute;\n    z-index: 1;\n}\n\n.p-cascadeselect-list {\n    min-width: 100%;\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    padding: ").concat(dt('cascadeselect.list.padding'), ";\n    display: flex;\n    flex-direction: column;\n    gap: ").concat(dt('cascadeselect.list.gap'), "\n}\n\n.p-cascadeselect-option {\n    cursor: pointer;\n    font-weight: normal;\n    white-space: nowrap;\n    border: 0 none;\n    color: ").concat(dt('cascadeselect.option.color'), ";\n    background: transparent;\n    transition: background ").concat(dt('cascadeselect.transition.duration'), ", color ").concat(dt('cascadeselect.transition.duration'), ", border-color ").concat(dt('cascadeselect.transition.duration'), ", box-shadow ").concat(dt('cascadeselect.transition.duration'), ", outline-color ").concat(dt('cascadeselect.transition.duration'), ";\n    border-radius: ").concat(dt('cascadeselect.option.border.radius'), ";\n}\n\n.p-cascadeselect-option-active {\n    overflow: visible;\n    background: ").concat(dt('cascadeselect.option.focus.background'), ";\n    color: ").concat(dt('cascadeselect.option.focus.color'), ";\n}\n\n.p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled).p-focus {\n    background: ").concat(dt('cascadeselect.option.focus.background'), ";\n    color: ").concat(dt('cascadeselect.option.focus.color'), ";\n}\n\n.p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled).p-focus .p-cascadeselect-group-icon {\n    color: ").concat(dt('cascadeselect.option.icon.focus.color'), ";\n}\n\n.p-cascadeselect-option-selected {\n    background: ").concat(dt('cascadeselect.option.selected.background'), ";\n    color: ").concat(dt('cascadeselect.option.selected.color'), ";\n}\n\n.p-cascadeselect-option-selected.p-focus {\n    background: ").concat(dt('cascadeselect.option.selected.focus.background'), ";\n    color: ").concat(dt('cascadeselect.option.selected.focus.color'), ";\n}\n\n.p-cascadeselect-option-active > .p-cascadeselect-option-list {\n    display: block;\n    left: 100%;\n    top: 0;\n}\n\n.p-cascadeselect-option-content {\n    display: flex;\n    align-items: center;\n    overflow: hidden;\n    position: relative;\n    padding: ").concat(dt('cascadeselect.option.padding'), ";\n}\n\n.p-cascadeselect-group-icon {\n    margin-left: auto;\n    font-size: ").concat(dt('cascadeselect.option.icon.size'), ";\n    width: ").concat(dt('cascadeselect.option.icon.size'), ";\n    height: ").concat(dt('cascadeselect.option.icon.size'), ";\n    color: ").concat(dt('cascadeselect.option.icon.color'), ";\n}\n");
};
var inlineStyles = {
  root: function root(_ref2) {
    var props = _ref2.props;
    return {
      position: props.appendTo === 'self' ? 'relative' : undefined
    };
  }
};
var classes = {
  root: function root(_ref3) {
    var instance = _ref3.instance,
      props = _ref3.props;
    return ['p-cascadeselect p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled' || instance.$primevue.config.inputVariant === 'filled',
      'p-focus': instance.focused,
      'p-inputwrapper-filled': props.modelValue,
      'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
      'p-cascadeselect-open': instance.overlayVisible,
      'p-cascadeselect-fluid': instance.hasFluid
    }];
  },
  label: function label(_ref4) {
    var instance = _ref4.instance,
      props = _ref4.props;
    return ['p-cascadeselect-label', {
      'p-placeholder': instance.label === props.placeholder,
      'p-cascadeselect-label-empty': !instance.$slots['value'] && (instance.label === 'p-emptylabel' || instance.label.length === 0)
    }];
  },
  dropdown: 'p-cascadeselect-dropdown',
  loadingIcon: 'p-cascadeselect-loading-icon',
  dropdownIcon: 'p-cascadeselect-dropdown-icon',
  overlay: 'p-cascadeselect-overlay p-component',
  listContainer: 'p-cascadeselect-list-container',
  list: 'p-cascadeselect-list',
  option: function option(_ref5) {
    var instance = _ref5.instance,
      processedOption = _ref5.processedOption;
    return ['p-cascadeselect-option', {
      'p-cascadeselect-option-active': instance.isOptionActive(processedOption),
      'p-cascadeselect-option-selected': instance.isOptionSelected(processedOption),
      'p-focus': instance.isOptionFocused(processedOption),
      'p-disabled': instance.isOptionDisabled(processedOption)
    }];
  },
  optionContent: 'p-cascadeselect-option-content',
  optionText: 'p-cascadeselect-option-text',
  groupIcon: 'p-cascadeselect-group-icon',
  optionList: 'p-cascadeselect-overlay p-cascadeselect-option-list'
};
var CascadeSelectStyle = BaseStyle.extend({
  name: 'cascadeselect',
  theme: theme,
  classes: classes,
  inlineStyles: inlineStyles
});

export { CascadeSelectStyle as default };
//# sourceMappingURL=index.mjs.map
