"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var component_1 = require("../common/component");
var props_1 = require("./props");
(0, component_1.VantComponent)({
    field: true,
    classes: ['field-class', 'input-class', 'right-icon-class', 'label-class'],
    props: __assign(__assign(__assign(__assign({}, props_1.commonProps), props_1.inputProps), props_1.textareaProps), { size: String, icon: String, label: String, error: Boolean, center: Boolean, isLink: Boolean, leftIcon: String, rightIcon: String, autosize: null, required: Boolean, iconClass: String, clickable: Boolean, inputAlign: {
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
    created: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.value = this.data.value;
                        return [4 /*yield*/, (0, utils_1.getRect)(this, '.van-field__body')];
                    case 1:
                        res = _a.sent();
                        this.setData({
                            innerValue: this.value,
                            tipLeft: res.left || 0
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    methods: {
        onInput: function (event) {
            var _a = (event.detail || {}).value, value = _a === void 0 ? '' : _a;
            this.value = value;
            this.setShowClear();
            this.setShowTip();
            this.emitChange();
        },
        onFocus: function (event) {
            this.focused = true;
            this.setShowClear();
            this.setShowTip();
            this.$emit('focus', event.detail);
        },
        onBlur: function (event) {
            this.focused = false;
            this.setShowClear();
            this.setShowTip();
            this.$emit('blur', event.detail);
        },
        onClickIcon: function () {
            this.$emit('click-icon');
        },
        onClickInput: function (event) {
            this.$emit('click-input', event.detail);
        },
        onClear: function () {
            var _this = this;
            this.setData({ innerValue: '' });
            this.value = '';
            this.setShowClear();
            (0, utils_1.nextTick)(function () {
                _this.emitChange();
                _this.$emit('clear', '');
            });
        },
        onConfirm: function (event) {
            var _a = (event.detail || {}).value, value = _a === void 0 ? '' : _a;
            this.value = value;
            this.setShowClear();
            this.setShowTip();
            this.$emit('confirm', value);
        },
        setValue: function (value) {
            this.value = value;
            this.setShowClear();
            this.setShowTip();
            if (value === '') {
                this.setData({ innerValue: '' });
            }
            this.emitChange();
        },
        onLineChange: function (event) {
            this.$emit('linechange', event.detail);
        },
        onKeyboardHeightChange: function (event) {
            this.$emit('keyboardheightchange', event.detail);
        },
        emitChange: function () {
            var _this = this;
            this.setData({ value: this.value });
            (0, utils_1.nextTick)(function () {
                _this.$emit('input', _this.value);
                _this.$emit('change', _this.value);
            });
        },
        setShowClear: function () {
            var _a = this.data, clearable = _a.clearable, readonly = _a.readonly, clearTrigger = _a.clearTrigger;
            var _b = this, focused = _b.focused, value = _b.value;
            var showClear = false;
            if (clearable && !readonly) {
                var hasValue = !!value;
                var trigger = clearTrigger === 'always' || (clearTrigger === 'focus' && focused);
                showClear = hasValue && trigger;
            }
            this.setData({ showClear: showClear });
        },
        setShowTip: function () {
            var _this = this;
            var _a = this.data, type = _a.type, showTip = _a.showTip, tipType = _a.tipType, readonly = _a.readonly, passwordTip = _a.passwordTip;
            var _b = this, focused = _b.focused, value = _b.value;
            var tipVisible = false;
            if ((showTip || tipType || (type == 'password' && passwordTip.length > 0)) && !readonly) {
                var hasValue = !!value;
                tipVisible = hasValue && focused;
            }
            if (tipVisible) {
                this.setData({
                    tipVisible: tipVisible,
                }, function () {
                    _this.setData({
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
                }, function () {
                    setTimeout(function () {
                        _this.setData({
                            tipVisible: tipVisible,
                        });
                    }, 400);
                });
            }
        },
        noop: function () { },
    },
});
