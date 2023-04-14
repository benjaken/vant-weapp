var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default,
  fieldProps: () => fieldProps,
  fieldSharedProps: () => fieldSharedProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("./utils");
var import_Cell = require("../cell/Cell");
var import_use = require("@vant/use");
var import_use_id = require("../composables/use-id");
var import_use_expose = require("../composables/use-expose");
var import_icon = require("../icon");
var import_cell = require("../cell");
const [name, bem] = (0, import_utils.createNamespace)("field");
const fieldSharedProps = {
  id: String,
  name: String,
  leftIcon: String,
  rightIcon: String,
  autofocus: Boolean,
  clearable: Boolean,
  maxlength: import_utils.numericProp,
  formatter: Function,
  clearIcon: (0, import_utils.makeStringProp)("clear"),
  modelValue: (0, import_utils.makeNumericProp)(""),
  inputAlign: String,
  placeholder: String,
  autocomplete: String,
  errorMessage: String,
  enterkeyhint: String,
  clearTrigger: (0, import_utils.makeStringProp)("focus"),
  formatTrigger: (0, import_utils.makeStringProp)("onChange"),
  error: {
    type: Boolean,
    default: null
  },
  disabled: {
    type: Boolean,
    default: null
  },
  readonly: {
    type: Boolean,
    default: null
  }
};
const fieldProps = (0, import_utils.extend)({}, import_Cell.cellSharedProps, fieldSharedProps, {
  rows: import_utils.numericProp,
  type: (0, import_utils.makeStringProp)("text"),
  rules: Array,
  autosize: [Boolean, Object],
  labelWidth: import_utils.numericProp,
  labelClass: import_utils.unknownProp,
  labelAlign: String,
  showWordLimit: Boolean,
  errorMessageAlign: String,
  colon: {
    type: Boolean,
    default: null
  },
  showTip: {
    type: Boolean,
    value: false
  },
  FieldTipType: {
    type: String,
    value: ""
  },
  tipUnit: {
    type: String,
    value: ""
  },
  passwordTip: {
    type: Array,
    value: []
  }
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: fieldProps,
  emits: ["blur", "focus", "clear", "keypress", "clickInput", "endValidate", "startValidate", "clickLeftIcon", "clickRightIcon", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const id = (0, import_use_id.useId)();
    const state = (0, import_vue2.reactive)({
      status: "unvalidated",
      focused: false,
      validateMessage: "",
      tipVisible: false
    });
    const tipLeft = (0, import_vue2.ref)(0);
    const inputRef = (0, import_vue2.ref)();
    const clearIconRef = (0, import_vue2.ref)();
    const customValue = (0, import_vue2.ref)();
    const {
      parent: form
    } = (0, import_use.useParent)(import_utils.FORM_KEY);
    const getModelValue = () => {
      var _a;
      return String((_a = props.modelValue) != null ? _a : "");
    };
    const getProp = (key) => {
      if ((0, import_utils.isDef)(props[key])) {
        return props[key];
      }
      if (form && (0, import_utils.isDef)(form.props[key])) {
        return form.props[key];
      }
    };
    const showClear = (0, import_vue2.computed)(() => {
      const readonly = getProp("readonly");
      if (props.clearable && !readonly) {
        const hasValue = getModelValue() !== "";
        const trigger = props.clearTrigger === "always" || props.clearTrigger === "focus" && state.focused;
        return hasValue && trigger;
      }
      return false;
    });
    const showTip = (0, import_vue2.computed)(() => {
      const readonly = getProp("readonly");
      let visible = false;
      if ((props.showTip || props.FieldTipType || props.type === "password" && ((props == null ? void 0 : props.passwordTip) || []).length > 0) && !readonly) {
        const hasValue = getModelValue() !== "";
        visible = hasValue && state.focused;
      }
      return visible;
    });
    const formValue = (0, import_vue2.computed)(() => {
      if (customValue.value && slots.input) {
        return customValue.value();
      }
      return props.modelValue;
    });
    const runRules = (rules) => rules.reduce((promise, rule) => promise.then(() => {
      if (state.status === "failed") {
        return;
      }
      let {
        value
      } = formValue;
      if (rule.formatter) {
        value = rule.formatter(value, rule);
      }
      if (!(0, import_utils2.runSyncRule)(value, rule)) {
        state.status = "failed";
        state.validateMessage = (0, import_utils2.getRuleMessage)(value, rule);
        return;
      }
      if (rule.validator) {
        if ((0, import_utils2.isEmptyValue)(value) && rule.validateEmpty === false) {
          return;
        }
        return (0, import_utils2.runRuleValidator)(value, rule).then((result) => {
          if (result && typeof result === "string") {
            state.status = "failed";
            state.validateMessage = result;
          } else if (result === false) {
            state.status = "failed";
            state.validateMessage = (0, import_utils2.getRuleMessage)(value, rule);
          }
        });
      }
    }), Promise.resolve());
    const resetValidation = () => {
      state.status = "unvalidated";
      state.validateMessage = "";
    };
    const endValidate = () => emit("endValidate", {
      status: state.status,
      message: state.validateMessage
    });
    const validate = (rules = props.rules) => new Promise((resolve) => {
      resetValidation();
      if (rules) {
        emit("startValidate");
        runRules(rules).then(() => {
          if (state.status === "failed") {
            resolve({
              name: props.name,
              message: state.validateMessage
            });
            endValidate();
          } else {
            state.status = "passed";
            resolve();
            endValidate();
          }
        });
      } else {
        resolve();
      }
    });
    const validateWithTrigger = (trigger) => {
      if (form && props.rules) {
        const {
          validateTrigger
        } = form.props;
        const defaultTrigger = (0, import_utils.toArray)(validateTrigger).includes(trigger);
        const rules = props.rules.filter((rule) => {
          if (rule.trigger) {
            return (0, import_utils.toArray)(rule.trigger).includes(trigger);
          }
          return defaultTrigger;
        });
        if (rules.length) {
          validate(rules);
        }
      }
    };
    const limitValueLength = (value) => {
      var _a;
      const {
        maxlength
      } = props;
      if ((0, import_utils.isDef)(maxlength) && (0, import_utils2.getStringLength)(value) > +maxlength) {
        const modelValue = getModelValue();
        if (modelValue && (0, import_utils2.getStringLength)(modelValue) === +maxlength) {
          return modelValue;
        }
        const selectionEnd = (_a = inputRef.value) == null ? void 0 : _a.selectionEnd;
        if (state.focused && selectionEnd) {
          const valueArr = [...value];
          const exceededLength = valueArr.length - +maxlength;
          valueArr.splice(selectionEnd - exceededLength, exceededLength);
          return valueArr.join("");
        }
        return (0, import_utils2.cutString)(value, +maxlength);
      }
      return value;
    };
    const updateValue = (value, trigger = "onChange") => {
      const originalValue = value;
      value = limitValueLength(value);
      const limitDiffLen = (0, import_utils2.getStringLength)(originalValue) - (0, import_utils2.getStringLength)(value);
      if (props.type === "number" || props.type === "digit") {
        const isNumber = props.type === "number";
        value = (0, import_utils.formatNumber)(value, isNumber, isNumber);
      }
      let formatterDiffLen = 0;
      if (props.formatter && trigger === props.formatTrigger) {
        const {
          formatter,
          maxlength
        } = props;
        value = formatter(value);
        if ((0, import_utils.isDef)(maxlength) && (0, import_utils2.getStringLength)(value) > +maxlength) {
          value = (0, import_utils2.cutString)(value, +maxlength);
        }
        if (inputRef.value && state.focused) {
          const {
            selectionEnd
          } = inputRef.value;
          const bcoVal = (0, import_utils2.cutString)(originalValue, selectionEnd);
          formatterDiffLen = (0, import_utils2.getStringLength)(formatter(bcoVal)) - (0, import_utils2.getStringLength)(bcoVal);
        }
      }
      if (inputRef.value && inputRef.value.value !== value) {
        if (state.focused) {
          let {
            selectionStart,
            selectionEnd
          } = inputRef.value;
          inputRef.value.value = value;
          if ((0, import_utils.isDef)(selectionStart) && (0, import_utils.isDef)(selectionEnd)) {
            const valueLen = (0, import_utils2.getStringLength)(value);
            if (limitDiffLen) {
              selectionStart -= limitDiffLen;
              selectionEnd -= limitDiffLen;
            } else if (formatterDiffLen) {
              selectionStart += formatterDiffLen;
              selectionEnd += formatterDiffLen;
            }
            inputRef.value.setSelectionRange(Math.min(selectionStart, valueLen), Math.min(selectionEnd, valueLen));
          }
        } else {
          inputRef.value.value = value;
        }
      }
      if (value !== props.modelValue) {
        emit("update:modelValue", value);
      }
    };
    const onInput = (event) => {
      if (!event.target.composing) {
        updateValue(event.target.value);
      }
    };
    const blur = () => {
      var _a;
      return (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    const focus = () => {
      var _a;
      return (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const adjustTextareaSize = () => {
      const input = inputRef.value;
      if (props.type === "textarea" && props.autosize && input) {
        (0, import_utils2.resizeTextarea)(input, props.autosize);
      }
    };
    const onFocus = (event) => {
      state.focused = true;
      emit("focus", event);
      (0, import_vue2.nextTick)(adjustTextareaSize);
      if (getProp("readonly")) {
        blur();
      }
    };
    const onBlur = (event) => {
      state.focused = false;
      updateValue(getModelValue(), "onBlur");
      emit("blur", event);
      if (getProp("readonly")) {
        return;
      }
      validateWithTrigger("onBlur");
      (0, import_vue2.nextTick)(adjustTextareaSize);
      (0, import_utils.resetScroll)();
    };
    const onClickInput = (event) => emit("clickInput", event);
    const onClickLeftIcon = (event) => emit("clickLeftIcon", event);
    const onClickRightIcon = (event) => emit("clickRightIcon", event);
    const onClear = (event) => {
      (0, import_utils.preventDefault)(event);
      emit("update:modelValue", "");
      emit("clear", event);
    };
    const showError = (0, import_vue2.computed)(() => {
      if (typeof props.error === "boolean") {
        return props.error;
      }
      if (form && form.props.showError && state.status === "failed") {
        return true;
      }
    });
    const labelStyle = (0, import_vue2.computed)(() => {
      const labelWidth = getProp("labelWidth");
      const labelAlign = getProp("labelAlign");
      if (labelWidth && labelAlign !== "top") {
        return {
          width: (0, import_utils.addUnit)(labelWidth)
        };
      }
    });
    const onKeypress = (event) => {
      const ENTER_CODE = 13;
      if (event.keyCode === ENTER_CODE) {
        const submitOnEnter = form && form.props.submitOnEnter;
        if (!submitOnEnter && props.type !== "textarea") {
          (0, import_utils.preventDefault)(event);
        }
        if (props.type === "search") {
          blur();
        }
      }
      emit("keypress", event);
    };
    const getInputId = () => props.id || `${id}-input`;
    const getValidationStatus = () => state.status;
    const renderInput = () => {
      const controlClass = bem("control", [getProp("inputAlign"), {
        error: showError.value,
        custom: !!slots.input,
        "min-height": props.type === "textarea" && !props.autosize
      }]);
      if (slots.input) {
        return (0, import_vue.createVNode)("div", {
          "class": controlClass,
          "onClick": onClickInput
        }, [slots.input()]);
      }
      const inputAttrs = {
        id: getInputId(),
        ref: inputRef,
        name: props.name,
        rows: props.rows !== void 0 ? +props.rows : void 0,
        class: controlClass,
        disabled: getProp("disabled"),
        readonly: getProp("readonly"),
        autofocus: props.autofocus,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        enterkeyhint: props.enterkeyhint,
        "aria-labelledby": props.label ? `${id}-label` : void 0,
        onBlur,
        onFocus,
        onInput,
        onClick: onClickInput,
        onChange: import_utils2.endComposing,
        onKeypress,
        onCompositionend: import_utils2.endComposing,
        onCompositionstart: import_utils2.startComposing
      };
      if (props.type === "textarea") {
        return (0, import_vue.createVNode)("textarea", inputAttrs, null);
      }
      return (0, import_vue.createVNode)("input", (0, import_vue.mergeProps)((0, import_utils2.mapInputType)(props.type), inputAttrs), null);
    };
    const renderLeftIcon = () => {
      const leftIconSlot = slots["left-icon"];
      if (props.leftIcon || leftIconSlot) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("left-icon"),
          "onClick": onClickLeftIcon
        }, [leftIconSlot ? leftIconSlot() : (0, import_vue.createVNode)(import_icon.Icon, {
          "name": props.leftIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };
    const renderRightIcon = () => {
      const rightIconSlot = slots["right-icon"];
      if (props.rightIcon || rightIconSlot) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("right-icon"),
          "onClick": onClickRightIcon
        }, [rightIconSlot ? rightIconSlot() : (0, import_vue.createVNode)(import_icon.Icon, {
          "name": props.rightIcon,
          "classPrefix": props.iconPrefix
        }, null)]);
      }
    };
    const renderWordLimit = () => {
      if (props.showWordLimit && props.maxlength) {
        const count = (0, import_utils2.getStringLength)(getModelValue());
        return (0, import_vue.createVNode)("div", {
          "class": bem("word-limit")
        }, [(0, import_vue.createVNode)("span", {
          "class": bem("word-num")
        }, [count]), (0, import_vue.createTextVNode)("/"), props.maxlength]);
      }
    };
    const renderMessage = () => {
      if (form && form.props.showErrorMessage === false) {
        return;
      }
      const message = props.errorMessage || state.validateMessage;
      if (message) {
        const slot = slots["error-message"];
        const errorMessageAlign = getProp("errorMessageAlign");
        return (0, import_vue.createVNode)("div", {
          "class": bem("error-message", errorMessageAlign)
        }, [slot ? slot({
          message
        }) : message]);
      }
    };
    const tipStyle = (0, import_vue2.computed)(() => {
      const {
        inputAlign
      } = props;
      if (inputAlign === "left") {
        return {
          left: `${tipLeft.value}px`
        };
      }
    });
    const validateValue = (value, reg) => {
      const regExp = new RegExp(reg);
      return regExp.test(value);
    };
    const formatValue = (value, type) => {
      if (type === "mobile") {
        const reg = /^(d{3})(d{0,4})(d{0,4})$/;
        if (value.length <= 3) {
          return value;
        }
        if (value.length <= 7) {
          return value.replace(reg, "$1 $2");
        }
        return value.replace(reg, "$1 $2 $3");
      }
      if (type === "idcard") {
        const isOther = /^[^0-9].*$/;
        const reg = /^(d{6})(d{0,4})(d{0,4})(w{0,4})$/g;
        if (isOther.test(value) || value.length <= 6) {
          return value;
        }
        if (value.length <= 10) {
          return value.replace(reg, "$1 $2");
        }
        if (value.length <= 14) {
          return value.replace(reg, "$1 $2 $3");
        }
        return value.replace(reg, "$1 $2 $3 $4");
      }
      if (type === "bankcard") {
        const reg = /^(d{4})(d{0,4})(d{0,4})(d{0,4})(d{0,4})$/;
        if (value.length <= 4) {
          return value;
        }
        if (value.length <= 8) {
          return value.replace(reg, "$1 $2");
        }
        if (value.length <= 12) {
          return value.replace(reg, "$1 $2 $3");
        }
        if (value.length <= 16) {
          return value.replace(reg, "$1 $2 $3 $4");
        }
        return value.replace(reg, "$1 $2 $3 $4 $5");
      }
      return value;
    };
    const renderTipContent = () => {
      const {
        type,
        FieldTipType,
        passwordTip = []
      } = props;
      if (type === "password" && passwordTip.length > 0) {
        return passwordTip.map((item) => (0, import_vue.createVNode)("div", {
          "class": bem("tip-item")
        }, [(0, import_vue.createVNode)(import_icon.Icon, {
          "class": bem("tip-item-icon"),
          "name": validateValue(getModelValue(), item.reg) ? "success" : "cross",
          "color": validateValue(getModelValue(), item.reg) ? "#07c160" : "#D92324"
        }, null), (0, import_vue.createVNode)("span", null, [item.text])]));
      }
      return (0, import_vue.createVNode)("span", null, [formatValue(getModelValue(), FieldTipType || "mobile")]);
    };
    const renderTip = () => {
      const {
        type,
        inputAlign = "left",
        passwordTip = [],
        tipUnit
      } = props;
      if (showTip.value && type !== "textarea") {
        return (0, import_vue.createVNode)("div", {
          "class": bem("tip", [inputAlign]),
          "style": tipStyle.value
        }, [(0, import_vue.createVNode)("div", {
          "class": bem("tip-inner", {
            password: passwordTip.length > 0
          })
        }, [renderTipContent(), tipUnit ? (0, import_vue.createVNode)("span", {
          "class": bem("tip-unit")
        }, [tipUnit]) : null])]);
      }
    };
    const renderLabel = () => {
      const labelWidth = getProp("labelWidth");
      const labelAlign = getProp("labelAlign");
      const colon = getProp("colon") ? ":" : "";
      if (slots.label) {
        return [slots.label(), colon];
      }
      if (props.label) {
        return (0, import_vue.createVNode)("label", {
          "id": `${id}-label`,
          "for": getInputId(),
          "style": labelAlign === "top" && labelWidth ? {
            width: (0, import_utils.addUnit)(labelWidth)
          } : void 0
        }, [props.label + colon]);
      }
    };
    const renderFieldBody = () => [(0, import_vue.createVNode)("div", {
      "class": bem("body")
    }, [renderInput(), showClear.value && (0, import_vue.createVNode)(import_icon.Icon, {
      "ref": clearIconRef,
      "name": props.clearIcon,
      "class": bem("clear")
    }, null), renderRightIcon(), slots.button && (0, import_vue.createVNode)("div", {
      "class": bem("button")
    }, [slots.button()])]), renderWordLimit(), renderMessage(), renderTip()];
    (0, import_use_expose.useExpose)({
      blur,
      focus,
      validate,
      formValue,
      resetValidation,
      getValidationStatus
    });
    (0, import_vue2.provide)(import_use.CUSTOM_FIELD_INJECTION_KEY, {
      customValue,
      resetValidation,
      validateWithTrigger
    });
    (0, import_vue2.watch)(() => props.modelValue, () => {
      updateValue(getModelValue());
      resetValidation();
      validateWithTrigger("onChange");
      (0, import_vue2.nextTick)(adjustTextareaSize);
    });
    (0, import_vue2.onMounted)(() => {
      updateValue(getModelValue(), props.formatTrigger);
      (0, import_vue2.nextTick)(adjustTextareaSize);
    });
    (0, import_use.useEventListener)("touchstart", onClear, {
      target: (0, import_vue2.computed)(() => {
        var _a;
        return (_a = clearIconRef.value) == null ? void 0 : _a.$el;
      })
    });
    return () => {
      const disabled = getProp("disabled");
      const labelAlign = getProp("labelAlign");
      const LeftIcon = renderLeftIcon();
      const renderTitle = () => {
        const Label = renderLabel();
        if (labelAlign === "top") {
          return [LeftIcon, Label].filter(Boolean);
        }
        return Label || [];
      };
      return (0, import_vue.createVNode)(import_cell.Cell, {
        "size": props.size,
        "class": bem({
          error: showError.value,
          disabled,
          [`label-${labelAlign}`]: labelAlign
        }),
        "center": props.center,
        "border": props.border,
        "isLink": props.isLink,
        "clickable": props.clickable,
        "titleStyle": labelStyle.value,
        "valueClass": bem("value"),
        "titleClass": [bem("label", [labelAlign, {
          required: props.required
        }]), props.labelClass],
        "arrowDirection": props.arrowDirection
      }, {
        icon: LeftIcon && labelAlign !== "top" ? () => LeftIcon : null,
        title: renderTitle,
        value: renderFieldBody,
        extra: slots.extra
      });
    };
  }
});
