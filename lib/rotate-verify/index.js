"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var color_1 = require("../common/color");
var utils_1 = require("../common/utils");
(0, component_1.VantComponent)({
    props: {
        show: {
            type: Boolean,
            value: false
        },
        img: {
            type: String,
            value: 'https://img.yzcdn.cn/vant/logo.png',
        },
        disabled: Boolean,
        closeable: Boolean,
        closeOnClickOverlay: Boolean,
        deviation: {
            type: Number,
            value: 2,
        },
        tip: {
            type: String,
            value: '拖动滑块，使图片角度为正',
        },
        activeColor: {
            type: String,
            value: color_1.ORANGE,
        },
    },
    data: {
        loading: true,
        size: 0,
        width: 0,
        x: 0,
        target: 0,
        targetAngle: 0,
        success: false,
        isDrag: false,
    },
    methods: {
        calcuateWidth: function () {
            var _this = this;
            Promise.all([
                (0, utils_1.getRect)(this, '.van-rotate-verify__wrapper'),
                (0, utils_1.getRect)(this, '.van-rotate-verify__dragger'),
            ]).then(function (_a) {
                var width = _a[0].width, size = _a[1].width;
                _this.setData({
                    loading: false,
                    width: width,
                    size: size
                });
                _this.randomTarget();
            });
        },
        randomTarget: function () {
            var _a = this.data, _b = _a.width, width = _b === void 0 ? 0 : _b, _c = _a.size, size = _c === void 0 ? 0 : _c;
            var min = (width - size) / 2;
            var max = width - size;
            var target = Math.floor(Math.random() * (max - min + 1)) + min;
            this.setData({
                target: target,
                targetAngle: -(target || 0) / max * 360
            });
        },
        onDragStart: function (_a) {
            var isDrag = _a.isDrag;
            this.setData({ isDrag: isDrag });
        },
        onDragEnd: function (_a) {
            var x = _a.x, isDrag = _a.isDrag;
            var deviation = this.properties.deviation;
            var target = this.data.target;
            if (x > target + deviation || x < target - deviation) {
                this.setData({
                    x: 0,
                    isDrag: isDrag,
                    success: false,
                });
                this.$emit('error');
            }
            else {
                this.setData({
                    isDrag: isDrag,
                    success: true,
                });
                this.$emit('success');
            }
        },
        reset: function () {
            this.setData({
                x: 0,
                success: false,
                loading: true
            });
            this.calcuateWidth();
        },
        beforeEnter: function () {
            this.setData({
                x: 0,
                success: false,
                loading: true
            });
        },
        afterEnter: function () {
            this.calcuateWidth();
        },
        onClose: function () {
            this.setData({
                show: false
            });
            this.$emit('close');
        },
    },
});
