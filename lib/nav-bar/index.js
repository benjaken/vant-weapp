"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
(0, component_1.VantComponent)({
    classes: ['title-class'],
    props: {
        title: String,
        fixed: {
            type: Boolean,
            observer: 'setHeight',
        },
        placeholder: {
            type: Boolean,
            observer: 'setHeight',
        },
        leftText: String,
        rightText: String,
        customStyle: String,
        leftArrow: Boolean,
        showHome: Boolean,
        border: {
            type: Boolean,
            value: false,
        },
        zIndex: {
            type: Number,
            value: 1,
        },
        safeAreaInsetTop: {
            type: Boolean,
            value: true,
        },
        beforeQuit: null
    },
    data: {
        height: 46,
    },
    created: function () {
        var statusBarHeight = (0, utils_1.getSystemInfoSync)().statusBarHeight;
        this.setData({
            statusBarHeight: statusBarHeight,
            height: 46 + statusBarHeight,
        });
    },
    mounted: function () {
        this.setHeight();
    },
    methods: {
        onClickLeft: function () {
            var _this = this;
            var beforeQuit = this.data.beforeQuit;
            if (beforeQuit) {
                (0, utils_1.toPromise)(beforeQuit()).then(function (value) {
                    if (value) {
                        _this.$emit('click-left');
                    }
                });
            }
            else {
                this.$emit('click-left');
            }
        },
        onClickTitle: function () {
            this.$emit('click-title');
        },
        onClickRight: function () {
            this.$emit('click-right');
        },
        onClickHome: function () {
            var _this = this;
            var beforeQuit = this.data.beforeQuit;
            if (beforeQuit) {
                (0, utils_1.toPromise)(beforeQuit()).then(function (value) {
                    if (value) {
                        _this.$emit('click-home');
                    }
                });
            }
            else {
                this.$emit('click-home');
            }
        },
        setHeight: function () {
            var _this = this;
            if (!this.data.fixed || !this.data.placeholder) {
                return;
            }
            wx.nextTick(function () {
                (0, utils_1.getRect)(_this, '.van-nav-bar').then(function (res) {
                    if (res && 'height' in res) {
                        _this.setData({ height: res.height });
                    }
                });
            });
        },
    },
});
