"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        images: {
            type: Array,
            value: []
        },
        autoplay: {
            type: Boolean,
            value: false
        },
        interval: {
            type: Number,
            value: 5000
        },
        circular: {
            type: Boolean,
            value: false
        },
        vertical: {
            type: Boolean,
            value: false
        },
        showToggle: {
            type: Boolean,
            value: false
        },
        showIndicator: {
            type: Boolean,
            value: true
        },
        indicatorColor: {
            type: String,
            value: 'rgba(0, 0, 0, 0.5)'
        },
        indicatorTextColor: {
            type: String,
            value: '#fff'
        },
        height: {
            type: String,
            value: '500rpx'
        },
        clickable: {
            type: Boolean,
            value: false
        }
    },
    data: {
        active: '',
        current: 0,
        currentIndex: 0
    },
    methods: {
        toggleType: function (_a) {
            var dataset = _a.currentTarget.dataset;
            var current = dataset.index || 0;
            this.setData({
                current: current,
                currentIndex: current,
            });
        },
        getImages: function () {
            var images = this.properties.images;
            var swipeImages = [];
            images.forEach(function (i) { return swipeImages.push.apply(swipeImages, i.images); });
            return swipeImages;
        },
        onSwipeChange: function (_a) {
            var current = _a.detail.current;
            var images = this.properties.images;
            var swipeImages = this.getImages();
            var image = swipeImages[current];
            var target = images.find(function (item) { return item.images.includes(image); });
            this.setData({
                currentIndex: current,
                active: target.name
            });
        },
        onImagePreview: function (_a) {
            var dataset = _a.currentTarget.dataset;
            if (this.data.clickable) {
                return this.$emit('click', dataset.index);
            }
            var swipeImages = this.getImages();
            var current = dataset.url || swipeImages[0];
            return wx.previewImage({
                current: current,
                urls: swipeImages,
                fail: function () {
                    wx.showToast({ title: '预览图片失败', icon: 'none' });
                }
            });
        }
    }
});
