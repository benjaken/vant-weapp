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
var color_1 = require("../common/color");
var utils_1 = require("../common/utils");
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        show: {
            type: Boolean,
            value: false,
        },
        round: {
            type: Boolean,
            value: true,
        },
        disabled: Boolean,
        closeable: Boolean,
        closeOnClickOverlay: Boolean,
        deviation: {
            type: Number,
            value: 2,
        },
        tip: {
            type: String,
            value: '拖动下方滑块完成拼图',
        },
        activeColor: {
            type: String,
            value: color_1.GREEN,
        },
        remote: Boolean,
        request: {
            type: null,
            value: function () { },
        },
        verity: {
            type: null,
            value: function () { },
        },
    },
    data: {
        img: '',
        uuid: '',
        remoteRadio: 1,
        loading: true,
        sizeX: 0,
        sizeY: 0,
        width: 0,
        height: 0,
        x: 0,
        top: 0,
        left: 0,
        target: 0,
        success: false,
        isDrag: false,
    },
    methods: {
        calcuateWidth: function () {
            var _this = this;
            var _a = this.properties, remote = _a.remote, request = _a.request;
            Promise.all([
                (0, utils_1.getRect)(this, '.van-slide-captcha__content'),
                (0, utils_1.getRect)(this, '.van-slide-captcha__dragger'),
            ]).then(function (_a) {
                var _b = _a[0], width = _b.width, height = _b.height, _c = _a[1], sizeX = _c.width, sizeY = _c.height;
                _this.setData({
                    width: width,
                    height: height,
                    sizeX: sizeX,
                    sizeY: sizeY,
                });
                if (remote) {
                    (0, utils_1.toPromise)(request()).then(function (data) {
                        _this.setData({
                            loading: false,
                            uuid: data.uuid,
                            img: data.backImg,
                            tempFilePath: data.targetImg,
                        });
                        _this.buildImage();
                    });
                }
                else {
                    _this.randomTarget();
                }
            });
        },
        randomTarget: function () {
            return __awaiter(this, void 0, void 0, function () {
                var images, _a, _b, width, _c, height, _d, sizeX, minW, maxW, left, top, target, rand;
                return __generator(this, function (_e) {
                    images = [
                        'https://img.yzcdn.cn/vant/cat.jpeg',
                        'https://img.yzcdn.cn/vant/sand.jpg',
                        'https://img.yzcdn.cn/vant/leaf.jpg',
                        'https://img.yzcdn.cn/vant/tree.jpg',
                    ];
                    _a = this.data, _b = _a.width, width = _b === void 0 ? 0 : _b, _c = _a.height, height = _c === void 0 ? 0 : _c, _d = _a.sizeX, sizeX = _d === void 0 ? 0 : _d;
                    minW = sizeX * 2;
                    maxW = width - sizeX;
                    left = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                    top = Math.floor(Math.random() * (height - 40 + 1));
                    target = Math.floor(Math.random() * (left - 80 + 1)) + 80;
                    rand = Math.floor(Math.random() * images.length);
                    this.setData({
                        loading: false,
                        top: top,
                        left: left,
                        target: target,
                        img: images[rand],
                    });
                    this.buildImage();
                    return [2 /*return*/];
                });
            });
        },
        buildImage: function () {
            var _this = this;
            var remote = this.properties.remote;
            var _a = this.data, width = _a.width, height = _a.height, img = _a.img, left = _a.left, top = _a.top;
            this.createSelectorQuery()
                .select('#canvas')
                .fields({ node: true, size: true })
                .exec(function (res) { return __awaiter(_this, void 0, void 0, function () {
                var canvas, ctx, dpr, image, canvasRatio, _a, path, width_1, height_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            canvas = res[0].node;
                            ctx = canvas.getContext('2d');
                            dpr = wx.getSystemInfoSync().pixelRatio;
                            image = canvas.createImage();
                            canvas.width = width * dpr;
                            canvas.height = height * dpr;
                            canvasRatio = canvas.width / canvas.height;
                            if (!remote) return [3 /*break*/, 1];
                            image.src = img;
                            image.onload = function () {
                                _this.setData({
                                    remoteRadio: image.width * dpr / canvas.width,
                                });
                                var imgRatio = image.width / image.height;
                                if (canvasRatio > imgRatio) {
                                    ctx.drawImage(image, 0, 0, canvas.width, canvas.width / imgRatio);
                                }
                                else {
                                    ctx.drawImage(image, 0, 0, canvas.height * imgRatio, canvas.height);
                                }
                            };
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, wx.getImageInfo({
                                src: img,
                            })];
                        case 2:
                            _a = _b.sent(), path = _a.path, width_1 = _a.width, height_1 = _a.height;
                            image.src = path;
                            image.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                                var imgRatio, tempFilePath;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            imgRatio = width_1 / height_1;
                                            if (canvasRatio > imgRatio) {
                                                ctx.drawImage(image, 0, 0, canvas.width, canvas.width / imgRatio);
                                            }
                                            else {
                                                ctx.drawImage(image, 0, 0, canvas.height * imgRatio, canvas.height);
                                            }
                                            return [4 /*yield*/, wx.canvasToTempFilePath({
                                                    canvas: canvas,
                                                    x: left,
                                                    y: top,
                                                    width: 40,
                                                    height: 40 * canvasRatio,
                                                    destWidth: 40,
                                                    destHeight: 40 * canvasRatio,
                                                    canvasId: 'canvas',
                                                })];
                                        case 1:
                                            tempFilePath = (_a.sent()).tempFilePath;
                                            this.setData({ tempFilePath: tempFilePath });
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        },
        onDragStart: function (_a) {
            var isDrag = _a.isDrag;
            this.setData({ isDrag: isDrag });
        },
        onDragEnd: function (_a) {
            var _this = this;
            var x = _a.x, isDrag = _a.isDrag;
            var _b = this.properties, deviation = _b.deviation, remote = _b.remote, verity = _b.verity;
            var _c = this.data, target = _c.target, uuid = _c.uuid, remoteRadio = _c.remoteRadio;
            if (remote) {
                this.setData({
                    isDrag: isDrag,
                    success: true,
                });
                console.log(x, remoteRadio);
                (0, utils_1.toPromise)(verity(parseInt(x) * remoteRadio, uuid)).then(function (value) {
                    if (value) {
                        _this.$emit('success');
                    }
                    else {
                        _this.$emit('error');
                        _this.reset();
                    }
                });
            }
            else if (x > target + deviation || x < target - deviation) {
                this.$emit('error');
                this.reset();
            }
            else {
                this.setData({
                    isDrag: isDrag,
                    success: true,
                });
                this.$emit('success');
            }
        },
        reset: function () {
            this.setData({
                x: 0,
                success: false,
                loading: true,
                img: '',
            });
            this.calcuateWidth();
        },
        beforeEnter: function () {
            this.setData({
                x: 0,
                success: false,
                loading: true,
                img: '',
            });
        },
        afterEnter: function () {
            this.calcuateWidth();
        },
        onClose: function () {
            this.setData({
                show: false,
            });
            this.$emit('close');
        },
    },
});
