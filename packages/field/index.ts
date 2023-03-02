import { getRect, nextTick } from '../common/utils';
import { VantComponent } from '../common/component';
import { commonProps, inputProps, textareaProps } from './props';

VantComponent({
  field: true,

  classes: ['input-class', 'right-icon-class', 'label-class'],

  props: {
    ...commonProps,
    ...inputProps,
    ...textareaProps,
    size: String,
    icon: String,
    label: String,
    error: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    rightIcon: String,
    autosize: null,
    required: Boolean,
    iconClass: String,
    clickable: Boolean,
    inputAlign: {
      type: String,
      value: 'left',
    },
    customStyle: String,
    errorMessage: String,
    arrowDirection: String,
    showWordLimit: Boolean,
    errorMessageAlign: String,
    tipMessage: String,
    readonly: {
      type: Boolean,
      observer: 'setShowClear',
    },
    clearable: {
      type: Boolean,
      observer: 'setShowClear',
    },
    clearTrigger: {
      type: String,
      value: 'focus',
    },
    border: {
      type: Boolean,
      value: true,
    },
    titleWidth: {
      type: String,
      value: '6.2em',
    },
    clearIcon: {
      type: String,
      value: 'clear',
    },
    showTip: {
      type: Boolean,
      value: false,
    },
    tipType: {
      type: String,
      value: '',
    },
    tipUnit: {
      type: String,
      value: '',
    },
  },

  data: {
    focused: false,
    innerValue: '',
    showClear: false,
    tipVisible: false,
  },

  async created() {
    this.value = this.data.value;
    const { left } = await getRect(this, '.van-field__body');
    this.setData({
      innerValue: this.value,
      tipLeft: left
    });
  },

  methods: {
    onInput(event: WechatMiniprogram.Input | WechatMiniprogram.TextareaInput) {
      const { value = '' } = event.detail || {};

      this.value = value;
      this.setShowClear();
      this.setShowTip();
      this.emitChange();
    },

    onFocus(
      event: WechatMiniprogram.InputFocus | WechatMiniprogram.TextareaFocus
    ) {
      this.focused = true;
      this.setShowClear();
      this.setShowTip();
      this.$emit('focus', event.detail);
    },

    onBlur(
      event: WechatMiniprogram.InputBlur | WechatMiniprogram.TextareaBlur
    ) {
      this.focused = false;
      this.setShowClear();
      this.setShowTip();
      this.$emit('blur', event.detail);
    },

    onClickIcon() {
      this.$emit('click-icon');
    },

    onClickInput(event: WechatMiniprogram.TouchEvent) {
      this.$emit('click-input', event.detail);
    },

    onClear() {
      this.setData({ innerValue: '' });
      this.value = '';
      this.setShowClear();

      nextTick(() => {
        this.emitChange();
        this.$emit('clear', '');
      });
    },

    onConfirm(
      event: WechatMiniprogram.InputConfirm | WechatMiniprogram.TextareaConfirm
    ) {
      const { value = '' } = event.detail || {};
      this.value = value;
      this.setShowClear();
      this.setShowTip();
      this.$emit('confirm', value);
    },

    setValue(value) {
      this.value = value;
      this.setShowClear();
      this.setShowTip();

      if (value === '') {
        this.setData({ innerValue: '' });
      }

      this.emitChange();
    },

    onLineChange(event: WechatMiniprogram.TextareaLineChange) {
      this.$emit('linechange', event.detail);
    },

    onKeyboardHeightChange(
      event:
        | WechatMiniprogram.InputKeyboardHeightChange
        | WechatMiniprogram.TextareaKeyboardHeightChange
    ) {
      this.$emit('keyboardheightchange', event.detail);
    },

    emitChange() {
      this.setData({ value: this.value });

      nextTick(() => {
        this.$emit('input', this.value);
        this.$emit('change', this.value);
      });
    },

    setShowClear() {
      const { clearable, readonly, clearTrigger } = this.data;
      const { focused, value } = this;

      let showClear = false;

      if (clearable && !readonly) {
        const hasValue = !!value;
        const trigger =
          clearTrigger === 'always' || (clearTrigger === 'focus' && focused);

        showClear = hasValue && trigger;
      }

      this.setData({ showClear });
    },

    setShowTip() {
      const { showTip, tipType, readonly } = this.data;
      const { focused, value } = this;

      let tipVisible = false;

      if ((showTip || tipType) && !readonly) {
        const hasValue = !!value;
        tipVisible = hasValue && focused;
      }

      if (tipVisible) {
        this.setData(
          {
            tipVisible,
          },
          () => {
            this.setData({
              animationData: wx
                .createAnimation({
                  timingFunction: 'ease-in-out',
                })
                .top(0)
                .opacity(1)
                .step()
                .export(),
            });
          }
        );
      } else {
        this.setData(
          {
            animationData: wx
              .createAnimation({
                timingFunction: 'ease-in-out',
              })
              .opacity(0)
              .step()
              .export(),
          },
          () => {
            setTimeout(() => {
              this.setData({
                tipVisible,
              })
            }, 400);
          }
        );
      }
    },

    noop() {},
  },
});
