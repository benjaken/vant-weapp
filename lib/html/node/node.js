"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../../common/component");
(0, component_1.VantComponent)({
    data: {
        ctrl: {},
        isiOS: wx.getSystemInfoSync().system.includes('iOS')
    },
    props: {
        childs: Array,
        opts: Array // 设置 [是否开启懒加载, 加载中占位图, 错误占位图, 是否使用长按菜单]
    },
    mounted: function () {
        this.triggerEvent('add', this, {
            bubbles: true,
            composed: true
        });
    },
    methods: {
        noop: function () { },
        /**
         * @description 获取标签
         * @param {String} path 路径
         */
        getNode: function (path) {
            try {
                var nums = path.split('_');
                var node = this.properties.childs[nums[0]];
                for (var i_1 = 1; i_1 < nums.length; i_1++) {
                    node = node.children[nums[i_1]];
                }
                return node;
            }
            catch (_a) {
                return {
                    text: '',
                    attrs: {},
                    children: []
                };
            }
        },
        /**
         * @description 播放视频事件
         * @param {Event} e
         */
        play: function (e) {
            this.root.triggerEvent('play');
            if (this.root.properties.pauseVideo) {
                var flag = false;
                var id = e.target.id;
                for (var i_2 = this.root._videos.length; i_2--;) {
                    if (this.root._videos[i_2].id === id) {
                        flag = true;
                    }
                    else {
                        this.root._videos[i_2].pause(); // 自动暂停其他视频
                    }
                }
                // 将自己加入列表
                if (!flag) {
                    var ctx = wx.createVideoContext(id, this);
                    if (this.root.playbackRate) {
                        ctx.playbackRate(this.root.playbackRate);
                    }
                    this.root._videos.push(ctx);
                }
            }
        },
        /**
         * @description 图片点击事件
         * @param {Event} e
         */
        imgTap: function (e) {
            var node = this.getNode(e.target.dataset.i);
            // 父级中有链接
            if (node.a)
                return this.linkTap(node.a);
            if (node.attrs.ignore)
                return;
            this.root.triggerEvent('imgtap', node.attrs);
            if (this.root.properties.previewImg) {
                var current = this.root.imgList[node.i];
                // 自动预览图片
                wx.previewImage({
                    showmenu: this.root.properties.showImgMenu,
                    current: current,
                    urls: this.root.imgList
                });
            }
        },
        /**
         * @description 图片加载完成事件
         * @param {Event} e
         */
        imgLoad: function (e) {
            var _a;
            var i = e.target.dataset.i;
            var node = this.getNode(i);
            var val;
            if (!node.w) {
                val = e.detail.width;
            }
            else if ((this.properties.opts[1] && !this.data.ctrl[i]) || this.data.ctrl[i] === -1) {
                // 加载完毕，取消加载中占位图
                val = 1;
            }
            if (val) {
                this.setData((_a = {},
                    _a['ctrl.' + i] = val,
                    _a));
            }
            this.checkReady();
        },
        /**
         * @description 检查是否所有图片加载完毕
         */
        checkReady: function () {
            var _this = this;
            if (!this.root.properties.lazyLoad) {
                this.root.imgList._unloadimgs -= 1;
                if (!this.root.imgList._unloadimgs) {
                    setTimeout(function () {
                        _this.root.getRect().then(function (rect) {
                            _this.root.triggerEvent('ready', rect);
                        });
                    }, 350);
                }
            }
        },
        /**
         * @description 链接点击事件
         * @param {Event} e
         */
        linkTap: function (e) {
            var node = e.currentTarget ? this.getNode(e.currentTarget.dataset.i) : {};
            var attrs = node.attrs || e;
            var href = attrs.href;
            this.root.triggerEvent('linktap', Object.assign({
                innerText: this.root.getText(node.children || []) // 链接内的文本内容
            }, attrs));
            if (href) {
                if (href[0] === '#') {
                    // 跳转锚点
                    this.root.navigateTo(href.substring(1)).catch(function () { });
                }
                else if (href.split('?')[0].includes('://')) {
                    // 复制外部链接
                    if (this.root.properties.copyLink) {
                        wx.setClipboardData({
                            data: href,
                            success: function () {
                                return wx.showToast({
                                    title: '链接已复制'
                                });
                            }
                        });
                    }
                }
                else {
                    // 跳转页面
                    wx.navigateTo({
                        url: href,
                        fail: function () {
                            wx.switchTab({
                                url: href,
                                fail: function () { }
                            });
                        }
                    });
                }
            }
        },
        /**
         * @description 错误事件
         * @param {Event} e
         */
        mediaError: function (e) {
            var _a, _b;
            var i = e.target.dataset.i;
            var node = this.getNode(i);
            if (node.name === 'video' || node.name === 'audio') {
                // 加载其他源
                var index = (this.data.ctrl[i] || 0) + 1;
                if (index > node.src.length) {
                    index = 0;
                }
                if (index < node.src.length) {
                    return this.setData((_a = {},
                        _a['ctrl.' + i] = index,
                        _a));
                }
            }
            else if (node.name === 'img') {
                // 显示错误占位图
                if (this.properties.opts[2]) {
                    this.setData((_b = {},
                        _b['ctrl.' + i] = -1,
                        _b));
                }
                this.checkReady();
            }
            if (this.root) {
                this.root.triggerEvent('error', {
                    source: node.name,
                    attrs: node.attrs,
                    errMsg: e.detail.errMsg
                });
            }
        }
    }
});
