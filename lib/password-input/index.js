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
                    this.setData({
                        value: val.slice(0, this.properties.length),
                    });
                }
                else if (val.length === this.properties.length) {
                    this.$emit('complete', val);
                }
            }
        },
        info: String,
        errorInfo: String,
        length: {
            type: Number,
            value: 6
        },
        gutter: {
            type: Number,
            value: 0
        },
        mask: {
            type: Boolean,
            value: true,
        },
        focused: Boolean
    },
    methods: {
        onFocus: function () {
            this.$emit('focus');
        }
    }
});
