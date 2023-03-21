var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getRect, nextTick } from '../common/utils';
import { VantComponent } from '../common/component';
import { commonProps, inputProps, textareaProps } from './props';
VantComponent({
    field: true,
    classes: ['field-class', 'input-class', 'right-icon-class', 'label-class'],
    props: Object.assign(Object.assign(Object.assign(Object.assign({}, commonProps), inputProps), textareaProps), { size: String, icon: String, label: String, error: Boolean, center: Boolean, isLink: Boolean, leftIcon: String, rightIcon: String, autosize: null, required: Boolean, iconClass: String, clickable: Boolean, inputAlign: {
            type: String,
            value: 'left',
        }, customStyle: String, errorMessage: String, arrowDirection: String, showWordLimit: Boolean, errorMessageAlign: String, tipMessage: String, readonly: {
            type: Boolean,
            observer: 'setShowClear',
        }, clearable: {
            type: Boolean,
            observer: 'setShowClear',
        }, clearTrigger: {
            type: String,
            value: 'focus',
        }, border: {
            type: Boolean,
            value: true,
        }, titleWidth: {
            type: String,
            value: '6.2em',
        }, clearIcon: {
            type: String,
            value: 'clear',
        }, showTip: {
            type: Boolean,
            value: false,
        }, tipType: {
            type: String,
            value: '',
        }, tipUnit: {
            type: String,
            value: '',
        }, passwordTip: {
            type: Array,
            value: []
        } }),
    data: {
        focused: false,
        innerValue: '',
        showClear: false,
        tipVisible: false,
    },
    created() {
        return __awaiter(this, void 0, void 0, function* () {
            this.value = this.data.value;
            const res = yield getRect(this, '.van-field__body');
            this.setData({
                innerValue: this.value,
                tipLeft: res.left || 0
            });
        });
    },
    methods: {
        onInput(event) {
            const { value = '' } = event.detail || {};
            this.value = value;
            this.setShowClear();
            this.setShowTip();
            this.emitChange();
        },
        onFocus(event) {
            this.focused = true;
            this.setShowClear();
            this.setShowTip();
            this.$emit('focus', event.detail);
        },
        onBlur(event) {
            this.focused = false;
            this.setShowClear();
            this.setShowTip();
            this.$emit('blur', event.detail);
        },
        onClickIcon() {
            this.$emit('click-icon');
        },
        onClickInput(event) {
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
        onConfirm(event) {
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
        onLineChange(event) {
            this.$emit('linechange', event.detail);
        },
        onKeyboardHeightChange(event) {
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
                const trigger = clearTrigger === 'always' || (clearTrigger === 'focus' && focused);
                showClear = hasValue && trigger;
            }
            this.setData({ showClear });
        },
        setShowTip() {
            const { type, showTip, tipType, readonly, passwordTip } = this.data;
            const { focused, value } = this;
            let tipVisible = false;
            if ((showTip || tipType || (type == 'password' && passwordTip.length > 0)) && !readonly) {
                const hasValue = !!value;
                tipVisible = hasValue && focused;
            }
            if (tipVisible) {
                this.setData({
                    tipVisible,
                }, () => {
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
                });
            }
            else {
                this.setData({
                    animationData: wx
                        .createAnimation({
                        timingFunction: 'ease-in-out',
                    })
                        .opacity(0)
                        .step()
                        .export(),
                }, () => {
                    setTimeout(() => {
                        this.setData({
                            tipVisible,
                        });
                    }, 400);
                });
            }
        },
        noop() { },
    },
});
