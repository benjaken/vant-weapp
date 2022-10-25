"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var button_1 = require("../mixins/button");
var color_1 = require("../common/color");
var utils_1 = require("../common/utils");
(0, component_1.VantComponent)({
    mixins: [button_1.button],
    props: {
        show: {
            type: Boolean,
            observer: function (show) {
                !show && this.stopLoading();
            },
        },
        title: String,
        message: String,
        theme: {
            type: String,
            value: 'default',
        },
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        beforeClose: null,
        overlayStyle: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        width: null,
        zIndex: {
            type: Number,
            value: 2000,
        },
        confirmButtonText: {
            type: String,
            value: '确认',
        },
        cancelButtonText: {
            type: String,
            value: '取消',
        },
        confirmButtonColor: {
            type: String,
            value: color_1.RED,
        },
        cancelButtonColor: {
            type: String,
            value: '',
        },
        showConfirmButton: {
            type: Boolean,
            value: true,
        },
        overlay: {
            type: Boolean,
            value: true,
        },
        transition: {
            type: String,
            value: 'scale',
        },
        moreButtons: {
            type: Array,
            value: []
        }
    },
    data: {
        loading: {
            confirm: false,
            cancel: false,
        },
        callback: (function () { }),
    },
    methods: {
        onConfirm: function () {
            this.handleAction('confirm');
        },
        onCancel: function () {
            this.handleAction('cancel');
        },
        onClickMore: function (_a) {
            var dataset = _a.currentTarget.dataset;
            var index = dataset.index;
            this.handleAction('more', parseInt(index));
        },
        onClickOverlay: function () {
            this.close('overlay');
        },
        close: function (action, index) {
            var _this = this;
            this.setData({ show: false });
            wx.nextTick(function () {
                _this.$emit('close', action);
                var callback = _this.data.callback;
                if (callback) {
                    callback(action, _this, index);
                }
            });
        },
        stopLoading: function () {
            this.setData({
                loading: {
                    confirm: false,
                    cancel: false,
                },
            });
        },
        handleAction: function (action, index) {
            var _a;
            var _this = this;
            this.$emit(action, { dialog: this, index: index });
            var _b = this.data, asyncClose = _b.asyncClose, beforeClose = _b.beforeClose;
            if (!asyncClose && !beforeClose) {
                this.close(action, index);
                return;
            }
            this.setData((_a = {},
                _a["loading.".concat(action)] = true,
                _a));
            if (beforeClose) {
                (0, utils_1.toPromise)(beforeClose(action, index)).then(function (value) {
                    if (value) {
                        _this.close(action, index);
                    }
                    else {
                        _this.stopLoading();
                    }
                });
            }
        },
    },
});
