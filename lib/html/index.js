"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var component_1 = require("../common/component");
var Parser = require('./parser');
var plugins = [];
(0, component_1.VantComponent)({
    data: {
        nodes: []
    },
    props: {
        /**
         * @description 容器的样式
         * @type {String}
         */
        containerStyle: String,
        /**
         * @description 用于渲染的 html 字符串
         * @type {String}
         */
        content: {
            type: String,
            value: '',
            observer: function (content) {
                this.setContent(content);
            }
        },
        /**
         * @description 是否允许外部链接被点击时自动复制
         * @type {Boolean}
         * @default true
         */
        copyLink: {
            type: Boolean,
            value: true
        },
        /**
         * @description 主域名，用于拼接链接
         * @type {String}
         */
        domain: String,
        /**
         * @description 图片出错时的占位图链接
         * @type {String}
         */
        errorImg: String,
        /**
         * @description 是否开启图片懒加载
         * @type {Boolean}
         * @default false
         */
        lazyLoad: Boolean,
        /**
         * @description 图片加载过程中的占位图链接
         * @type {String}
         */
        loadingImg: String,
        /**
         * @description 是否在播放一个视频时自动暂停其他视频
         * @type {Boolean}
         * @default true
         */
        pauseVideo: {
            type: Boolean,
            value: true
        },
        /**
         * @description 是否允许图片被点击时自动预览
         * @type {Boolean}
         * @default true
         */
        previewImg: {
            type: Boolean,
            value: true
        },
        /**
         * @description 是否给每个表格添加一个滚动层使其能单独横向滚动
         * @type {Boolean}
         * @default false
         */
        scrollTable: Boolean,
        /**
         * @description 是否开启长按复制
         * @type {Boolean | String}
         * @default false
         */
        selectable: null,
        /**
         * @description 是否将 title 标签的内容设置到页面标题
         * @type {Boolean}
         * @default true
         */
        setTitle: {
            type: Boolean,
            value: true
        },
        /**
         * @description 是否允许图片被长按时显示菜单
         * @type {Boolean}
         * @default true
         */
        showImgMenu: {
            type: Boolean,
            value: true
        },
        /**
         * @description 标签的默认样式
         * @type {Object}
         */
        tagStyle: Object,
        /**
         * @description 是否使用锚点链接
         * @type {Boolean | Number}
         * @default false
         */
        useAnchor: null
    },
    created: function () {
        this.plugins = [];
        for (var i_1 = plugins.length; i_1--;) {
            this.plugins.push(new plugins[i_1](this));
        }
        // #ifdef MP-ALIPAY
        if (this.properties.content) {
            this.setContent(this.properties.content);
        }
        // #endif
    },
    destroyed: function () {
        // 注销插件
        this._hook('onDetached');
    },
    methods: {
        /**
         * @description 将锚点跳转的范围限定在一个 scroll-view 内
         * @param {Object} page scroll-view 所在页面的示例
         * @param {String} selector scroll-view 的选择器
         * @param {String} scrollTop scroll-view scroll-top 属性绑定的变量名
         */
        in: function (page, selector, scrollTop) {
            if (page && selector && scrollTop) {
                this._in = {
                    page: page,
                    selector: selector,
                    scrollTop: scrollTop
                };
            }
        },
        /**
         * @description 锚点跳转
         * @param {String} id 要跳转的锚点 id
         * @param {Number} offset 跳转位置的偏移量
         * @returns {Promise}
         */
        navigateTo: function (id, offset) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!_this.properties.useAnchor) {
                    reject(Error('Anchor is disabled'));
                    return;
                }
                // 跨组件选择器
                var deep = 
                // #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO
                '>>>';
                // #endif
                // #ifdef MP-BAIDU || MP-ALIPAY
                ' '; // eslint-disable-line
                // #endif
                var selector = wx.createSelectorQuery()
                    // #ifndef MP-ALIPAY
                    .in(_this._in ? _this._in.page : _this)
                    // #endif
                    .select((_this._in ? _this._in.selector : '._root') + (id ? "".concat(deep, "#").concat(id) : '')).boundingClientRect();
                if (_this._in) {
                    selector.select(_this._in.selector).scrollOffset()
                        .select(_this._in.selector).boundingClientRect();
                }
                else {
                    // 获取 scroll-view 的位置和滚动距离
                    selector.selectViewport().scrollOffset(); // 获取窗口的滚动距离
                }
                selector.exec(function (res) {
                    var _a;
                    if (!res[0]) {
                        reject(Error('Label not found'));
                        return;
                    }
                    var scrollTop = res[1].scrollTop + res[0].top - (res[2] ? res[2].top : 0) + (offset || parseInt(_this.properties.useAnchor) || 0);
                    if (_this._in) {
                        // scroll-view 跳转
                        _this._in.page.setData((_a = {},
                            _a[_this._in.scrollTop] = scrollTop,
                            _a));
                    }
                    else {
                        // 页面跳转
                        wx.pageScrollTo({
                            scrollTop: scrollTop,
                            duration: 300
                        });
                    }
                    resolve('success');
                });
            });
        },
        /**
         * @description 获取文本内容
         * @returns {String}
         */
        getText: function (nodes) {
            var text = '';
            (function traversal(nodes) {
                for (var i_2 = 0; i_2 < nodes.length; i_2++) {
                    var node = nodes[i_2];
                    if (node.type === 'text') {
                        text += node.text.replace(/&amp;/g, '&');
                    }
                    else if (node.name === 'br') {
                        text += '\n';
                    }
                    else {
                        // 块级标签前后加换行
                        var isBlock = node.name === 'p' || node.name === 'div' || node.name === 'tr' || node.name === 'li' || (node.name[0] === 'h' && node.name[1] > '0' && node.name[1] < '7');
                        if (isBlock && text && text[text.length - 1] !== '\n') {
                            text += '\n';
                        }
                        // 递归获取子节点的文本
                        if (node.children) {
                            traversal(node.children);
                        }
                        if (isBlock && text[text.length - 1] !== '\n') {
                            text += '\n';
                        }
                        else if (node.name === 'td' || node.name === 'th') {
                            text += '\t';
                        }
                    }
                }
            })(nodes || this.data.nodes);
            return text;
        },
        /**
         * @description 获取内容大小
         * @returns {Promise}
         */
        getRect: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                wx.createSelectorQuery()
                    // #ifndef MP-ALIPAY
                    .in(_this)
                    // #endif
                    .select('._root').boundingClientRect().exec(function (res) { return res[0] ? resolve(res[0]) : reject(Error('Root label not found')); });
            });
        },
        /**
         * @description 暂停播放媒体
         */
        pauseMedia: function () {
            for (var i_3 = (this._videos || []).length; i_3--;) {
                this._videos[i_3].pause();
            }
        },
        /**
         * @description 设置媒体播放速率
         * @param {Number} rate 播放速率
         */
        setPlaybackRate: function (rate) {
            this.playbackRate = rate;
            for (var i_4 = (this._videos || []).length; i_4--;) {
                this._videos[i_4].playbackRate(rate);
            }
        },
        /**
         * @description 设置富文本内容
         * @param {string} content 要渲染的 html 字符串
         * @param {boolean} append 是否在尾部追加
         */
        setContent: function (content, append) {
            if (append === void 0) { append = false; }
            return __awaiter(this, void 0, void 0, function () {
                var data, nodes, i_5, j, height_1, callback_1, rect;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.imgList || !append) {
                                this.imgList = [];
                            }
                            this._videos = [];
                            data = {};
                            nodes = new Parser(this).parse(content);
                            // 尾部追加内容
                            if (append) {
                                for (i_5 = this.data.nodes.length, j = nodes.length; j--;) {
                                    data["nodes[".concat(i_5 + j, "]")] = nodes[j];
                                }
                            }
                            else {
                                data.nodes = nodes;
                            }
                            this.setData(data, 
                            // #ifndef MP-TOUTIAO
                            function () { return __awaiter(_this, void 0, void 0, function () {
                                var height;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, utils_1.getRect)(this, '._root')];
                                        case 1:
                                            height = (_a.sent()).height;
                                            this._hook('onLoad');
                                            this.triggerEvent('load', height);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }
                            // #endif
                            );
                            if (!(this.properties.lazyLoad || this.imgList._unloadimgs < this.imgList.length / 2)) return [3 /*break*/, 1];
                            callback_1 = function (rect) {
                                // 350ms 总高度无变化就触发 ready 事件
                                if (rect.height === height_1) {
                                    _this.triggerEvent('ready', rect);
                                }
                                else {
                                    height_1 = rect.height;
                                    setTimeout(function () {
                                        _this.getRect().then(callback_1);
                                    }, 350);
                                }
                            };
                            this.getRect().then(callback_1);
                            return [3 /*break*/, 3];
                        case 1:
                            if (!!this.imgList._unloadimgs) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.getRect()];
                        case 2:
                            rect = _a.sent();
                            this.triggerEvent('ready', rect);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * @description 调用插件的钩子函数
         * @private
         */
        _hook: function (name) {
            for (var i_6 = plugins.length; i_6--;) {
                if (this.plugins[i_6][name]) {
                    this.plugins[i_6][name]();
                }
            }
        },
        /**
         * @description 添加子组件
         * @private
         */
        _add: function (e) {
            e.detail.root = this;
        }
    }
});
