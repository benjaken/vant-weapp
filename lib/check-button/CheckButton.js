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
  checkButtonProps: () => checkButtonProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
const [name, bem] = (0, import_utils.createNamespace)("check-button");
const checkButtonProps = {
  options: {
    type: Array,
    default: []
  },
  label: {
    type: String,
    default: "text"
  },
  modelValue: {
    type: Array,
    default: []
  },
  round: Boolean,
  disabled: Boolean,
  single: Boolean,
  horizon: Boolean,
  row: {
    type: Number,
    default: 2
  },
  needIndex: Boolean,
  beforeChange: null
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: checkButtonProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit
  }) {
    let startValue;
    const root = (0, import_vue2.ref)();
    const itemStyle = (index) => {
      const {
        row,
        horizon
      } = props;
      const style = {};
      style.flex = `0 0 ${100 / row - 1}%`;
      style.marginRight = (index + 1) % row === 0 && !horizon ? "0" : row / (row - 1) + "%";
      return style;
    };
    const updateValue = (value, end) => {
      if (!(0, import_utils.isSameValue)(value, props.modelValue)) {
        emit("update:modelValue", value);
      }
      if (end && !(0, import_utils.isSameValue)(value, startValue)) {
        emit("change", value);
      }
    };
    const selectItem = (value) => () => {
      const {
        modelValue,
        disabled,
        single
      } = props;
      if (!disabled) {
        const newValue = single ? [value] : modelValue.includes(value) ? modelValue.filter((item) => item !== value) : [...modelValue, value];
        updateValue(newValue, true);
      }
    };
    const renderButtons = () => {
      const {
        label,
        options,
        needIndex,
        round,
        modelValue
      } = props;
      return options.map((item, index) => (0, import_vue.createVNode)("div", {
        "class": bem("item", {
          active: modelValue.includes(needIndex ? index : item.value),
          round
        }),
        "style": itemStyle(index),
        "onClick": selectItem(needIndex ? index : item.value)
      }, [item[label]]));
    };
    updateValue(props.modelValue);
    (0, import_use.useCustomFieldValue)(() => props.modelValue);
    return () => (0, import_vue.createVNode)("div", {
      "class": "van-check-button"
    }, [(0, import_vue.createVNode)("div", {
      "ref": root,
      "class": bem("content", {
        horizon: props.horizon,
        disabled: props.disabled
      })
    }, [renderButtons()])]);
  }
});
