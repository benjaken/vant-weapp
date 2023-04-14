import {
  ref,
  defineComponent,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue';

// Utils
import {
  isSameValue,
  createNamespace,
} from '../utils';

// Composables
import { useCustomFieldValue } from '@vant/use';

const [name, bem] = createNamespace('check-button');

type CheckButtonValue = string | number;

export const checkButtonProps = {
  options: {
    type: Array as PropType<string[]>,
    default: []
  },
  modelValue: {
    type: Array as PropType<CheckButtonValue[]>,
    default: [],
  },
  round: Boolean,
  disabled: Boolean,
  single: Boolean,
  horizon: Boolean,
  row: {
    type: Number,
    default: 2,
  },
  needIndex: Boolean,
  beforeChange: null
};

export type CheckButtonProps = ExtractPropTypes<typeof checkButtonProps>;

export default defineComponent({
  name,

  props: checkButtonProps,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    let startValue: CheckButtonValue;

    const root = ref<HTMLElement>();

    const itemStyle = (index: number): CSSProperties => {
      const { row, horizon } = props;
      const style: CSSProperties = {};
      style.flex = `0 0 ${100 / row - 1}%`;
      style.marginRight = (index + 1) % row === 0 && !horizon ? '0' : (row / (row - 1) + '%');
      return style;
    };


    const updateValue = (value: CheckButtonValue[], end?: boolean) => {
      if (!isSameValue(value, props.modelValue)) {
        emit('update:modelValue', value);
      }

      if (end && !isSameValue(value, startValue)) {
        emit('change', value);
      }
    };

    const selectItem = (value: CheckButtonValue) => () => {
      const { modelValue, disabled, single } = props;
      if (!disabled) {
        const newValue = single ? [value] : modelValue.includes(value) ? modelValue.filter((item) => item !== value) : [...modelValue, value];
        updateValue(newValue, true);
      }
    };

    const renderButtons = () => {
      const { options, needIndex, round, modelValue } = props;
      return options.map((item, index) => (
          <div
            class={bem('item', {
              active: modelValue.includes((needIndex ? index : item)),
              round,
            })}
            style={itemStyle(index)}
            onClick={selectItem(needIndex ? index : item)}
          >{item}</div>
        ))
    }

    // format initial value
    updateValue(props.modelValue);
    useCustomFieldValue(() => props.modelValue);

    return () => (
      <div class="van-check-button">
        <div
          ref={root}
          class={bem('content', {
            horizon: props.horizon,
            disabled: props.disabled,
          })}
        >
          {renderButtons()}
        </div>
      </div>
    );
  },
});
