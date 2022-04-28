"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        data: {
            type: Object,
            value: {}
        },
        isDev: {
            type: Boolean,
            value: false
        },
        selector: {
            type: String,
            value: 'skeleton'
        },
        bgcolor: {
            type: String,
            value: '#f2f2f2'
        },
        loading: {
            type: String,
            value: 'shine'
        }
    },
    data: {
        isShowByDev: false,
        devData: null,
        skeletonWidth: 375,
        skeletonHeight: 667,
        selectorTypes: ['bg', 'rect', 'circle']
    },
    created: function () {
        // 默认的首屏宽高，防止内容闪现
        var windowHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({
            skeletonHeight: windowHeight
        });
    },
    methods: {
        handleToggleShow: function (_a) {
            var detail = _a.detail;
            this.setData({
                isShowByDev: detail
            });
        },
        handleUpdateData: function (_a) {
            var detail = _a.detail;
            this.setData({
                devData: detail
            });
        }
    }
});
