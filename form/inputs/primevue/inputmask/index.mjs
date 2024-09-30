import { getUserAgent } from '@primeuix/utils/dom';
import { isEmpty } from '@primeuix/utils/object';
import InputText from 'primevue/inputtext';
import { mergeProps, resolveComponent, openBlock, createBlock, normalizeClass } from 'vue';
import BaseComponent from '@primevue/core/basecomponent';
import InputMaskStyle from 'primevue/inputmask/style';

var script$1 = {
  name: 'BaseInputMask',
  "extends": BaseComponent,
  props: {
    modelValue: null,
    slotChar: {
      type: String,
      "default": '_'
    },
    id: {
      type: String,
      "default": null
    },
    "class": {
      type: [String, Object],
      "default": null
    },
    mask: {
      type: String,
      "default": null
    },
    placeholder: {
      type: String,
      "default": null
    },
    autoClear: {
      type: Boolean,
      "default": true
    },
    unmask: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    name: {
      type: String,
      "default": null
    },
    variant: {
      type: String,
      "default": null
    },
    fluid: {
      type: Boolean,
      "default": null
    }
  },
  style: InputMaskStyle,
  provide: function provide() {
    return {
      $pcInputMask: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'InputMask',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'focus', 'blur', 'keydown', 'complete', 'keypress', 'paste'],
  inject: {
    $pcFluid: {
      "default": null
    }
  },
  watch: {
    mask: function mask(newMask, oldMask) {
      if (oldMask !== newMask) {
        this.initMask();
      }
    }
  },
  mounted: function mounted() {
    this.initMask();
  },
  updated: function updated() {
    if (this.isValueUpdated()) {
      this.updateValue();
    }
  },
  methods: {
    onInput: function onInput(event) {
      if (this.androidChrome) this.handleAndroidInput(event);else this.handleInputChange(event);
      this.$emit('update:modelValue', event.target.value);
    },
    onFocus: function onFocus(event) {
      var _this = this;
      if (this.readonly) {
        return;
      }
      this.focus = true;
      clearTimeout(this.caretTimeoutId);
      var pos;
      this.focusText = this.$el.value;
      pos = this.checkVal();
      this.caretTimeoutId = setTimeout(function () {
        if (_this.$el !== document.activeElement) {
          return;
        }
        _this.writeBuffer();
        if (pos === _this.mask.replace('?', '').length) {
          _this.caret(0, pos);
        } else {
          _this.caret(pos);
        }
      }, 10);
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focus = false;
      this.checkVal();
      this.updateModel(event);
      if (this.$el.value !== this.focusText) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent('change', true, false);
        this.$el.dispatchEvent(e);
      }
      this.$emit('blur', event);
    },
    onKeyDown: function onKeyDown(event) {
      if (this.readonly) {
        return;
      }
      var k = event.code,
        pos,
        begin,
        end;
      var iPhone = /iphone/i.test(getUserAgent());
      this.oldVal = this.$el.value;

      //backspace, delete, and escape get special treatment
      if (k === 'Backspace' || k === 'Delete' || iPhone && k === 'Escape') {
        pos = this.caret();
        begin = pos.begin;
        end = pos.end;
        if (end - begin === 0) {
          begin = k !== 'Delete' ? this.seekPrev(begin) : end = this.seekNext(begin - 1);
          end = k === 'Delete' ? this.seekNext(end) : end;
        }
        this.clearBuffer(begin, end);
        this.shiftL(begin, end - 1);
        this.updateModel(event);
        event.preventDefault();
      } else if (k === 'Enter') {
        // enter
        this.$el.blur();
        this.updateModel(event);
      } else if (k === 'Escape') {
        // escape
        this.$el.value = this.focusText;
        this.caret(0, this.checkVal());
        this.updateModel(event);
        event.preventDefault();
      }
      this.$emit('keydown', event);
    },
    onKeyPress: function onKeyPress(event) {
      var _this2 = this;
      if (this.readonly) {
        return;
      }
      var k = event.code,
        pos = this.caret(),
        p,
        c,
        next,
        completed;
      if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey || event.key === 'CapsLock' || event.key === 'Escape' || event.key === 'Tab') {
        //Ignore
        return;
      } else if (k && k !== 'Enter') {
        if (pos.end - pos.begin !== 0) {
          this.clearBuffer(pos.begin, pos.end);
          this.shiftL(pos.begin, pos.end - 1);
        }
        p = this.seekNext(pos.begin - 1);
        if (p < this.len) {
          c = event.key;
          if (this.tests[p].test(c)) {
            this.shiftR(p);
            this.buffer[p] = c;
            this.writeBuffer();
            next = this.seekNext(p);
            if (/android/i.test(getUserAgent())) {
              //Path for CSP Violation on FireFox OS 1.1
              var proxy = function proxy() {
                _this2.caret(next);
              };
              setTimeout(proxy, 0);
            } else {
              this.caret(next);
            }
            if (pos.begin <= this.lastRequiredNonMaskPos) {
              completed = this.isCompleted();
            }
          }
        }
        event.preventDefault();
      }
      this.updateModel(event);
      if (completed) {
        this.$emit('complete', event);
      }
      this.$emit('keypress', event);
    },
    onPaste: function onPaste(event) {
      this.handleInputChange(event);
      this.$emit('paste', event);
    },
    caret: function caret(first, last) {
      var range, begin, end;
      if (!this.$el.offsetParent || this.$el !== document.activeElement) {
        return;
      }
      if (typeof first === 'number') {
        begin = first;
        end = typeof last === 'number' ? last : begin;
        if (this.$el.setSelectionRange) {
          this.$el.setSelectionRange(begin, end);
        } else if (this.$el['createTextRange']) {
          range = this.$el['createTextRange']();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          range.select();
        }
      } else {
        if (this.$el.setSelectionRange) {
          begin = this.$el.selectionStart;
          end = this.$el.selectionEnd;
        } else if (document['selection'] && document['selection'].createRange) {
          range = document['selection'].createRange();
          begin = 0 - range.duplicate().moveStart('character', -100000);
          end = begin + range.text.length;
        }
        return {
          begin: begin,
          end: end
        };
      }
    },
    isCompleted: function isCompleted() {
      for (var i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
        if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
          return false;
        }
      }
      return true;
    },
    getPlaceholder: function getPlaceholder(i) {
      if (i < this.slotChar.length) {
        return this.slotChar.charAt(i);
      }
      return this.slotChar.charAt(0);
    },
    seekNext: function seekNext(pos) {
      while (++pos < this.len && !this.tests[pos]);
      return pos;
    },
    seekPrev: function seekPrev(pos) {
      while (--pos >= 0 && !this.tests[pos]);
      return pos;
    },
    shiftL: function shiftL(begin, end) {
      var i, j;
      if (begin < 0) {
        return;
      }
      for (i = begin, j = this.seekNext(end); i < this.len; i++) {
        if (this.tests[i]) {
          if (j < this.len && this.tests[i].test(this.buffer[j])) {
            this.buffer[i] = this.buffer[j];
            this.buffer[j] = this.getPlaceholder(j);
          } else {
            break;
          }
          j = this.seekNext(j);
        }
      }
      this.writeBuffer();
      this.caret(Math.max(this.firstNonMaskPos, begin));
    },
    shiftR: function shiftR(pos) {
      var i, c, j, t;
      for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
        if (this.tests[i]) {
          j = this.seekNext(i);
          t = this.buffer[i];
          this.buffer[i] = c;
          if (j < this.len && this.tests[j].test(t)) {
            c = t;
          } else {
            break;
          }
        }
      }
    },
    handleAndroidInput: function handleAndroidInput(event) {
      var curVal = this.$el.value;
      var pos = this.caret();
      if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
        // a deletion or backspace happened
        this.checkVal(true);
        while (pos.begin > 0 && !this.tests[pos.begin - 1]) pos.begin--;
        if (pos.begin === 0) {
          while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin]) pos.begin++;
        }
        this.caret(pos.begin, pos.begin);
      } else {
        this.checkVal(true);
        while (pos.begin < this.len && !this.tests[pos.begin]) pos.begin++;
        this.caret(pos.begin, pos.begin);
      }
      if (this.isCompleted()) {
        this.$emit('complete', event);
      }
    },
    clearBuffer: function clearBuffer(start, end) {
      var i;
      for (i = start; i < end && i < this.len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.getPlaceholder(i);
        }
      }
    },
    writeBuffer: function writeBuffer() {
      this.$el.value = this.buffer.join('');
    },
    checkVal: function checkVal(allow) {
      this.isValueChecked = true;
      //try to place characters where they belong
      var test = this.$el.value,
        lastMatch = -1,
        i,
        c,
        pos;
      for (i = 0, pos = 0; i < this.len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.getPlaceholder(i);
          while (pos++ < test.length) {
            c = test.charAt(pos - 1);
            if (this.tests[i].test(c)) {
              this.buffer[i] = c;
              lastMatch = i;
              break;
            }
          }
          if (pos > test.length) {
            this.clearBuffer(i + 1, this.len);
            break;
          }
        } else {
          if (this.buffer[i] === test.charAt(pos)) {
            pos++;
          }
          if (i < this.partialPosition) {
            lastMatch = i;
          }
        }
      }
      if (allow) {
        this.writeBuffer();
      } else if (lastMatch + 1 < this.partialPosition) {
        if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
          // Invalid value. Remove it and replace it with the
          // mask, which is the default behavior.
          if (this.$el.value) this.$el.value = '';
          this.clearBuffer(0, this.len);
        } else {
          // Invalid value, but we opt to show the value to the
          // user and allow them to correct their mistake.
          this.writeBuffer();
        }
      } else {
        this.writeBuffer();
        this.$el.value = this.$el.value.substring(0, lastMatch + 1);
      }
      return this.partialPosition ? i : this.firstNonMaskPos;
    },
    handleInputChange: function handleInputChange(event) {
      var isPasteEvent = event.type === 'paste';
      if (this.readonly || isPasteEvent) {
        return;
      }
      var pos = this.checkVal(true);
      this.caret(pos);
      this.updateModel(event);
      if (this.isCompleted()) {
        this.$emit('complete', event);
      }
    },
    getUnmaskedValue: function getUnmaskedValue() {
      var unmaskedBuffer = [];
      for (var i = 0; i < this.buffer.length; i++) {
        var c = this.buffer[i];
        if (this.tests[i] && c !== this.getPlaceholder(i)) {
          unmaskedBuffer.push(c);
        }
      }
      return unmaskedBuffer.join('');
    },
    updateModel: function updateModel(e) {
      var val = this.unmask ? this.getUnmaskedValue() : e.target.value;
      this.$emit('update:modelValue', this.defaultBuffer !== val ? val : '');
    },
    updateValue: function updateValue() {
      var _this3 = this;
      var updateModel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (this.$el) {
        if (this.modelValue == null) {
          this.$el.value = '';
          updateModel && this.$emit('update:modelValue', '');
        } else {
          this.$el.value = this.modelValue;
          this.checkVal();
          setTimeout(function () {
            if (_this3.$el) {
              _this3.writeBuffer();
              _this3.checkVal();
              if (updateModel) {
                var val = _this3.unmask ? _this3.getUnmaskedValue() : _this3.$el.value;
                _this3.$emit('update:modelValue', _this3.defaultBuffer !== val ? val : '');
              }
            }
          }, 10);
        }
        this.focusText = this.$el.value;
      }
    },
    initMask: function initMask() {
      this.tests = [];
      this.partialPosition = this.mask.length;
      this.len = this.mask.length;
      this.firstNonMaskPos = null;
      this.defs = {
        9: '[0-9]',
        a: '[A-Za-z]',
        '*': '[A-Za-z0-9]'
      };
      var ua = getUserAgent();
      this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
      var maskTokens = this.mask.split('');
      for (var i = 0; i < maskTokens.length; i++) {
        var c = maskTokens[i];
        if (c === '?') {
          this.len--;
          this.partialPosition = i;
        } else if (this.defs[c]) {
          this.tests.push(new RegExp(this.defs[c]));
          if (this.firstNonMaskPos === null) {
            this.firstNonMaskPos = this.tests.length - 1;
          }
          if (i < this.partialPosition) {
            this.lastRequiredNonMaskPos = this.tests.length - 1;
          }
        } else {
          this.tests.push(null);
        }
      }
      this.buffer = [];
      for (var _i = 0; _i < maskTokens.length; _i++) {
        var _c = maskTokens[_i];
        if (_c !== '?') {
          if (this.defs[_c]) this.buffer.push(this.getPlaceholder(_i));else this.buffer.push(_c);
        }
      }
      this.defaultBuffer = this.buffer.join('');
      this.updateValue(false);
    },
    isValueUpdated: function isValueUpdated() {
      return this.unmask ? this.modelValue != this.getUnmaskedValue() : this.defaultBuffer !== this.$el.value && this.$el.value !== this.modelValue;
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    inputClass: function inputClass() {
      return [this.cx('root'), this["class"]];
    },
    rootPTOptions: function rootPTOptions() {
      return mergeProps(this.ptmi('root', this.ptmParams), this.ptm('pcInputText', this.ptmParams));
    },
    ptmParams: function ptmParams() {
      return {
        context: {
          filled: this.filled
        }
      };
    },
    hasFluid: function hasFluid() {
      return isEmpty(this.fluid) ? !!this.$pcFluid : this.fluid;
    }
  },
  components: {
    InputText: InputText
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_InputText = resolveComponent("InputText");
  return openBlock(), createBlock(_component_InputText, {
    id: _ctx.id,
    value: _ctx.modelValue,
    "class": normalizeClass($options.inputClass),
    readonly: _ctx.readonly,
    disabled: _ctx.disabled,
    invalid: _ctx.invalid,
    name: _ctx.name,
    variant: _ctx.variant,
    placeholder: _ctx.placeholder,
    fluid: $options.hasFluid,
    unstyled: _ctx.unstyled,
    onInput: $options.onInput,
    onFocus: $options.onFocus,
    onBlur: $options.onBlur,
    onKeydown: $options.onKeyDown,
    onKeypress: $options.onKeyPress,
    onPaste: $options.onPaste,
    pt: $options.rootPTOptions
  }, null, 8, ["id", "value", "class", "readonly", "disabled", "invalid", "name", "variant", "placeholder", "fluid", "unstyled", "onInput", "onFocus", "onBlur", "onKeydown", "onKeypress", "onPaste", "pt"]);
}

script.render = render;

export { script as default };
//# sourceMappingURL=index.mjs.map
