"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../common/color");
var utils_1 = require("../common/utils");
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        size: {
            type: Number,
            value: 40,
        },
        inertia: Boolean,
        disabled: Boolean,
        bottom: Boolean,
        damping: {
            type: Number,
            value: 20,
        },
        friction: {
            type: Number,
            value: 2,
        },
        deviation: {
            type: Number,
            value: 2
        },
        placeholder: {
            type: String,
            value: '拖动滑块至虚线框内'
        },
        successText: {
            type: String,
            value: '验证通过'
        },
        activeColor: {
            type: String,
            value: color_1.ORANGE
        },
    },
    data: {
        width: 0,
        x: 0,
        target: 0,
        success: false
    },
    mounted: function () {
        var _this = this;
        (0, utils_1.getRect)(this, '.van-slide-verify').then(function (_a) {
            var width = _a.width;
            _this.setData({ width: width });
            _this.randomTarget();
        });
    },
    methods: {
        randomTarget: function () {
            var min = this.data.size * 2;
            var max = this.data.width - this.data.size;
            var target = Math.floor(Math.random() * (max - min + 1)) + min;
            this.setData({
                target: this.data.bottom ? max : target
            });
        },
        onDragEnd: function (_a) {
            var x = _a.x;
            var deviation = this.properties.deviation;
            var target = this.data.target;
            if (x > target + deviation || x < target - deviation) {
                this.setData({
                    x: 0,
                    success: false
                });
                this.$emit('error');
            }
            else {
                this.setData({
                    success: true
                });
                this.$emit('success');
            }
        },
        reset: function () {
            var _this = this;
            this.setData({
                x: 0,
                success: false
            });
            (0, utils_1.getRect)(this, '.van-slide-verify').then(function (_a) {
                var width = _a.width;
                _this.setData({ width: width });
                _this.randomTarget();
            });
        },
    }
});
