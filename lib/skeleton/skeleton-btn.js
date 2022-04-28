"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        isShow: {
            type: Boolean,
            value: false
        },
        selector: {
            type: String
        },
        selectorTypes: {
            type: Array
        }
    },
    data: {
        physicalRadio: 2
    },
    created: function () {
        // 默认的首屏宽高，防止内容闪现
        var windowWidth = wx.getSystemInfoSync().windowWidth;
        this.setData({
            physicalRadio: 750 / windowWidth
        });
    },
    methods: {
        /**
         * 按钮点击
         */
        toggleBtnTap: function () {
            var _this = this;
            if (this.data.isShow) {
                this.triggerEvent('toggleShow', false);
                return;
            }
            this.calcData().then(function (data) {
                _this.print(data);
                _this.triggerEvent('updateData', data);
                _this.triggerEvent('toggleShow', true);
            });
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
            return Promise.all([(0, utils_1.getScrollOffset)(), (0, utils_1.getAllRect)(this, ".".concat(this.data.selector))]).then(function (_a) {
                var scrollOffset = _a[0], container = _a[1][0];
                var width = container.width, height = container.height, top = container.top, left = container.left;
                return _this.calcStyleLists(container).then(function (lists) { return ({
                    container: _this.objToStyle({
                        width: width,
                        height: height,
                        top: top + scrollOffset.scrollTop,
                        left: left + scrollOffset.scrollLeft
                    }),
                    lists: lists
                }); });
            });
        },
        calcStyleLists: function (container) {
            var _this = this;
            var top = container.top, left = container.left, right = container.right, bottom = container.bottom;
            var _a = this.data, selector = _a.selector, selectorTypes = _a.selectorTypes;
            var promises = selectorTypes.map(function (type) {
                return (0, utils_1.getAllRect)(_this, ".".concat(selector, "-").concat(type))
                    .then(function (elements) {
                    return elements
                        .filter(function (vo) {
                        return vo.left < right && vo.right > left && vo.top < bottom && vo.bottom > top;
                    })
                        .map(function (vo) {
                        return _this.objToStyle({
                            width: vo.width,
                            height: vo.height,
                            left: vo.left - left,
                            top: vo.top - top
                        });
                    });
                })
                    .then(function (elements) { return ({
                    type: type,
                    elements: elements
                }); });
            });
            return Promise.all(promises);
        }
    }
});
