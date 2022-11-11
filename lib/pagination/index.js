"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../common/color");
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        value: {
            type: Number,
            value: 1
        },
        total: {
            type: Number,
            value: 1
        },
        delimiter: {
            type: String,
            value: '/'
        },
        prevText: {
            type: String,
            value: '上一页'
        },
        nextText: {
            type: String,
            value: '下一页'
        },
        disabled: Boolean,
        showPage: {
            type: Boolean,
            value: true
        },
        hideOnSinglePage: {
            type: Boolean,
            value: false
        },
        theme: {
            type: String,
            value: 'default'
        },
        activeColor: {
            type: String,
            value: color_1.GREEN
        },
        inactiveColor: {
            type: String,
            value: color_1.GRAY_DARK
        }
    },
    methods: {
        prev: function () {
            var _a = this.data, value = _a.value, disabled = _a.disabled;
            if (value === 1 || disabled)
                return;
            this.setData({
                value: value - 1
            });
            this.$emit('change', this.data.value);
        },
        next: function () {
            var _a = this.data, value = _a.value, total = _a.total, disabled = _a.disabled;
            if (value === total || disabled)
                return;
            this.setData({
                value: value + 1
            });
            this.$emit('change', this.data.value);
        },
    }
});
