"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        show: Boolean,
        title: String,
        value: String,
        theme: {
            type: String,
            value: 'default'
        },
        maxlength: {
            type: Number,
            value: 100
        },
        zIndex: {
            type: Number,
            value: 100,
        },
        closeButtonText: String,
        deleteButtonText: String,
        extraKey: null,
        randomKeyOrder: Boolean,
        password: Boolean,
        passwordInfo: String,
        passwordErrorInfo: String,
        round: {
            type: Boolean,
            value: false,
        },
        showDeleteKey: {
            type: Boolean,
            value: true,
        },
        hideOnClickOutside: {
            type: Boolean,
            value: true,
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        keys: [],
        value: ''
    },
    mounted: function () {
        var _a = this.properties, theme = _a.theme, showDeleteKey = _a.showDeleteKey, randomKeyOrder = _a.randomKeyOrder;
        var extraKey = this.properties.extraKey;
        var keys = [];
        extraKey = extraKey ? (Array.isArray(extraKey) ? extraKey : [extraKey]) : [];
        var origin = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        if (randomKeyOrder) {
            origin = origin.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
        }
        if (theme === 'custom') {
            keys = __spreadArray([], origin, true);
            if (extraKey.length === 1) {
                keys.push.apply(keys, ['0', extraKey[0]]);
            }
            else if (extraKey.length === 2) {
                keys.push.apply(keys, [extraKey[1], '0', extraKey[0]]);
            }
            else {
                keys.push.apply(keys, ['0']);
            }
            this.setData({ keys: keys });
        }
        else {
            keys = __spreadArray(__spreadArray([], origin, true), [(extraKey.length === 1 ? extraKey[0] : 'collapse'), '0'], false);
            if (showDeleteKey)
                keys.push('delete');
            this.setData({
                keys: keys,
                value: this.properties.value
            });
        }
    },
    methods: {
        onClickOverlay: function () {
            this.setData({
                show: false
            });
            this.triggerEvent('close');
        },
        onKeyboardShow: function () {
            this.triggerEvent('show');
        },
        onKeyboardHide: function () {
            this.triggerEvent('hide');
        },
        onClickKey: function (_a) {
            var dataset = _a.currentTarget.dataset;
            var maxlength = this.properties.maxlength;
            var value = this.data.value;
            var key = dataset.key || '';
            if (!key)
                return;
            if (key === 'collapse') {
                this.setData({
                    show: false
                });
            }
            else if (key === 'delete') {
                if (value.length > 0) {
                    value = value.slice(0, value.length - 1);
                }
                this.setData({ value: value });
                this.triggerEvent('input', value);
                this.triggerEvent('delete');
            }
            else {
                if (value.length >= maxlength)
                    return;
                value += key;
                this.setData({ value: value });
                this.triggerEvent('input', value);
            }
        },
        onPasswordComplete: function (_a) {
            var detail = _a.detail;
            console.log(detail);
            this.triggerEvent('complete', detail);
        }
    }
});
