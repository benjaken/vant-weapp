"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        scrollY: {
            type: Boolean,
            value: true
        },
        scrollTop: {
            type: Number,
            value: 0
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
        toView: {
            type: String,
            value: ''
        },
        customStyle: {
            type: String,
            value: ''
        },
        reverse: {
            type: Boolean,
            value: false
        },
    },
    methods: {
        onScroll: function (_a) {
            var detail = _a.detail;
            this.$emit('scroll', detail);
        },
        onReachTop: function (_a) {
            var detail = _a.detail;
            if (this.properties.loading || this.properties.finished || !this.properties.reverse)
                return;
            this.$emit('scrolltoupper', detail);
        },
        onReachBottom: function (_a) {
            var detail = _a.detail;
            if (this.properties.loading || this.properties.finished || this.properties.reverse)
                return;
            this.$emit('scrolltolower', detail);
        },
        onRefresh: function () {
            this.setData({
                refresherTriggered: true
            });
            this.$emit('refresh');
        },
        stopRefresh: function () {
            this.setData({
                refresherTriggered: false
            });
        }
    }
});
