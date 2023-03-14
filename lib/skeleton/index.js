"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
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
        wrapper: {
            type: String,
            value: 'container'
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
        },
        error: {
            type: Boolean,
            value: false,
        },
        errorText: {
            type: String,
            value: '请求失败，请点击重试',
        }
    },
    data: {
        physicalRadio: 2,
        isShowByDev: false,
        devData: {},
        skeletonWidth: 375,
        skeletonHeight: 667,
        selectorTypes: ['bg', 'rect', 'circle']
    },
    created: function () {
        var _a = wx.getSystemInfoSync(), windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
        this.setData({
            physicalRadio: 750 / windowWidth,
            skeletonHeight: windowHeight
        });
    },
    methods: {
        getElements: function (selector) {
            return new Promise(function (resolve) {
                wx.createSelectorQuery()
                    .selectAll(selector)
                    .fields({
                    dataset: true,
                    id: true,
                    rect: true,
                    size: true
                })
                    .exec(function (res) { return resolve(res[0]); });
            });
        },
        toggleBtnTap: function () {
            var _this = this;
            if (this.data.isShowByDev) {
                this.setData({
                    isShowByDev: false
                });
            }
            else {
                this.calcData().then(function (data) {
                    _this.print(data);
                    _this.setData({
                        devData: data,
                        isShowByDev: true
                    });
                });
            }
        },
        print: function (data) {
            console.log(JSON.stringify(data, null, 2));
        },
        objToStyle: function (obj) {
            var physicalRadio = this.data.physicalRadio;
            return Object.keys(obj)
                .map(function (key) { return "".concat(key, ":").concat(obj[key] * physicalRadio, "rpx"); })
                .join(';');
        },
        calcData: function () {
            var _this = this;
            var _a = this.data, wrapper = _a.wrapper, selector = _a.selector;
            return Promise.all([
                (0, utils_1.getScrollOffset)(),
                this.getElements(".".concat(wrapper, " >>> .").concat(selector)),
            ]).then(function (_a) {
                var scrollOffset = _a[0], container = _a[1][0];
                var width = container.width, height = container.height, top = container.top, left = container.left;
                return _this.calcStyleLists(container).then(function (lists) { return ({
                    container: _this.objToStyle({
                        width: width,
                        height: height,
                        top: top + scrollOffset.scrollTop,
                        left: left + scrollOffset.scrollLeft,
                    }),
                    lists: lists,
                }); });
            });
        },
        calcStyleLists: function (container) {
            var _this = this;
            var top = container.top, left = container.left, right = container.right, bottom = container.bottom;
            var _a = this.data, wrapper = _a.wrapper, selector = _a.selector, selectorTypes = _a.selectorTypes;
            var promises = selectorTypes.map(function (type) {
                return _this.getElements(".".concat(wrapper, " >>> .").concat(selector, "-").concat(type))
                    .then(function (elements) {
                    return elements
                        .filter(function (vo) {
                        return vo.left < right &&
                            vo.right > left &&
                            vo.top < bottom &&
                            vo.bottom > top;
                    })
                        .map(function (vo) {
                        return _this.objToStyle({
                            width: vo.width,
                            height: vo.height,
                            left: vo.left - left,
                            top: vo.top - top,
                        });
                    });
                })
                    .then(function (elements) { return ({
                    type: type,
                    elements: elements,
                }); });
            });
            return Promise.all(promises);
        },
        retry: function () {
            this.$emit('retry');
        }
    },
});
