import { createVNode as _createVNode } from "vue";
import { ref, defineComponent } from "vue";
import { isSameValue, createNamespace } from "../utils/index.mjs";
import { useCustomFieldValue } from "@vant/use";
const [name, bem] = createNamespace("check-button");
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
    type: [String, Number, Array],
    default: ""
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
  beforeChange: null,
  disabledItems: {
    type: Array,
    default: () => []
  }
};
var stdin_default = defineComponent({
  name,
  props: checkButtonProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit
  }) {
    let startValue;
    const root = ref();
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
      if (!isSameValue(value, props.modelValue)) {
        emit("update:modelValue", value);
      }
      if (end && !isSameValue(value, startValue)) {
        emit("change", value);
      }
    };
    const selectItem = (value) => () => {
      const {
        modelValue,
        disabled,
        disabledItems,
        single
      } = props;
      if (!disabled && !(disabledItems == null ? void 0 : disabledItems.includes(value))) {
        const newValue = single ? value : modelValue.includes(value) ? modelValue.filter((item) => item !== value) : [...modelValue, value];
        updateValue(newValue, true);
      }
    };
    const renderButtons = () => {
      const {
        single,
        label,
        options,
        needIndex,
        round,
        modelValue,
        disabledItems = []
      } = props;
      return options.map((item, index) => _createVNode("div", {
        "class": bem("item", {
          active: single ? modelValue === (needIndex ? index : item.value) : modelValue.includes(needIndex ? index : item.value),
          disabled: disabledItems.includes(item.value),
          round
        }),
        "style": itemStyle(index),
        "onClick": selectItem(needIndex ? index : item.value)
      }, [item[label]]));
    };
    updateValue(props.modelValue);
    useCustomFieldValue(() => props.modelValue);
    return () => _createVNode("div", {
      "class": "van-check-button"
    }, [_createVNode("div", {
      "ref": root,
      "class": bem("content", {
        horizon: props.horizon,
        disabled: props.disabled
      })
    }, [renderButtons()])]);
  }
});
export {
  checkButtonProps,
  stdin_default as default
};
