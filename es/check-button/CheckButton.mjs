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
        single
      } = props;
      if (!disabled) {
        const newValue = single ? [value] : modelValue.includes(value) ? modelValue.filter((item) => item !== value) : [...modelValue, value];
        updateValue(newValue, true);
      }
    };
    const renderButtons = () => {
      const {
        options,
        needIndex,
        round,
        modelValue
      } = props;
      return options.map((item, index) => _createVNode("div", {
        "class": bem("item", {
          active: modelValue.includes(needIndex ? index : item),
          round
        }),
        "style": itemStyle(index),
        "onClick": selectItem(needIndex ? index : item)
      }, [item]));
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
