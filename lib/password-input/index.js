"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        value: {
            type: String,
            value: '',
            observer: function (val) {
                if (val.length > this.properties.length) {
                    var value = val.slice(0, this.properties.length);
                    this.setData({ value: value });
                }
                else if (val.length === this.properties.length) {
                    this.$emit('complete', val);
                }
            },
        },
        info: String,
        errorInfo: String,
        length: {
            type: Number,
            value: 6,
        },
        gutter: {
            type: Number,
            value: 0,
        },
        mask: {
            type: Boolean,
            value: true,
        },
        theme: {
            type: String,
            value: 'square',
        },
        background: {
            type: String,
            value: '#fff',
        },
        gutterRadius: {
            type: String,
            value: '0',
        },
    },
    data: {
        focused: false,
    },
    methods: {
        onFocus: function () {
            this.$emit('focus');
            this.setData({ focused: true });
        },
        onInput: function (_a) {
            var detail = _a.detail;
            this.$emit('change', detail.value);
        },
        onInputFocus: function () {
            this.setData({ focused: true });
        },
        onInputBlur: function () {
            this.setData({ focused: false });
        },
        focus: function () {
            this.setData({ focused: true });
        }
    },
});
