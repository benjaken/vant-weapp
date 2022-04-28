"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        scrollY: {
            type: Boolean,
            value: true
        },
        height: {
            type: String,
            value: '100%'
        },
        loading: {
            type: Boolean,
            value: false
        },
        finished: {
            type: Boolean,
            value: false
        },
        loadMoreText: {
            type: String,
            value: '加载中...'
        },
        finishedText: {
            type: String,
            value: '没有更多了'
        },
        hideEnd: {
            type: Boolean,
            value: false
        },
        refresherEnabled: {
            type: Boolean,
            value: false
        },
        refresherDefaultStyle: {
            type: String,
            value: 'black'
        },
        refresherBackground: {
            type: String,
            value: '#f2f3f5'
        },
        customStyle: {
            type: String,
            value: ''
        }
    },
    methods: {
        onScroll: function (_a) {
            var detail = _a.detail;
            this.triggerEvent('scroll', detail);
        },
        onReachBottom: function (_a) {
            var detail = _a.detail;
            if (this.properties.loading || this.properties.finished)
                return;
            this.triggerEvent('scrolltolower', detail);
        },
        onRefresh: function () {
            this.setData({
                refresherTriggered: true
            });
            this.triggerEvent('refresh');
        },
        stopRefresh: function () {
            this.setData({
                refresherTriggered: false
            });
        }
    }
});
