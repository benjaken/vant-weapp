"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        options: {
            type: Array,
            value: [],
        },
        value: {
            type: Array,
            value: [],
        },
        round: {
            type: Boolean,
            value: false,
        },
        single: {
            type: Boolean,
            value: false,
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        horizon: {
            type: Boolean,
            value: false,
        },
        row: {
            type: Number,
            value: 2,
        },
        needIndex: {
            type: Boolean,
            value: false,
        },
        beforeChange: null,
    },
    methods: {
        selectItem: function (_a) {
            var _this = this;
            var target = _a.target;
            var beforeChange = this.data.beforeChange;
            var item = target.dataset.item;
            var value = this.properties.value;
            var _b = this.properties, single = _b.single, disabled = _b.disabled;
            if (!disabled) {
                if (value.indexOf(item) > -1) {
                    value = single ? value : value.filter(function (v) { return v !== item; });
                }
                else if (single) {
                    value = [item];
                }
                else {
                    value.push(item);
                }
                if (beforeChange) {
                    (0, utils_1.toPromise)(beforeChange()).then(function () {
                        _this.setData({ value: value });
                        _this.$emit('change', value);
                    });
                }
                else {
                    this.setData({ value: value });
                    this.$emit('change', value);
                }
            }
        },
    },
});
