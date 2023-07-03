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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toast_1 = __importDefault(require("../toast/toast"));
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        cropperRatio: {
            type: Number,
            value: 0.7,
        },
        cutRatio: {
            type: Number,
            value: 1,
        },
        image: {
            type: String,
            value: '',
        },
        cropperWidth: {
            type: Number,
            value: 720,
        },
        minCropperW: {
            type: Number,
            value: 100,
        },
        quality: {
            type: Number,
            value: 1,
        }
    },
    data: {
        showImg: false,
        cropperW: 0,
        cropperH: 0,
        scaleP: 0,
        cutL: 0,
        cutT: 0,
        cutB: 0,
        cutR: 0,
        qualityWidth: 0,
        innerAspectRadio: 0,
        filePath: '',
    },
    methods: {
        cancel: function () {
            toast_1.default.clear();
            this.triggerEvent('cancel');
        },
        initStaticData: function () {
            this.drag = {
                CUT_L: null,
                CUT_T: null,
                CUT_R: null,
                CUT_B: null,
                CUT_W: null,
                CUT_H: null,
                IS_TOUCH_CONTENT: false,
                IS_TOUCH_SIDE: false,
                IS_NO_DRAG: false,
                TOUCH_OFFSET_X: null,
                TOUCH_OFFSET_Y: null,
                TOUCH_MAX_MOVE_SECTION_X: null,
                TOUCH_MAX_MOVE_SECTION_Y: null,
                MOVE_PAGE_X: null,
                MOVE_PAGE_Y: null,
                SPACE_TOP_POSITION: null,
                SPACE_LEFT_POSITION: null,
                SPACE_RIGHT_POSITION: null,
                SPACE_BOTTOM_POSITION: null,
            };
            this.conf = {
                IMG_RATIO: null,
                IMG_REAL_W: null,
                IMG_REAL_H: null,
                CROPPER_HEIGHT: null,
                CROPPER_WIDTH: null,
                CUT_MIN_W: null,
                CUT_MIN_H: null,
                DRAG_MOVE_RATIO: 750 / wx.getSystemInfoSync().windowWidth,
                INIT_DRAG_POSITION: 0,
                DRAW_IMAGE_W: null,
                MAX_QW: 2550,
                MIN_CROPPER_DIS: 100,
            };
        },
        loadImage: function (src) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, image, cropperWidth, _b, width, height, path, scaleP, qualityWidth, p;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.data, image = _a.image, cropperWidth = _a.cropperWidth;
                            wx.showLoading({
                                title: '图片加载中...',
                            });
                            return [4 /*yield*/, wx.getImageInfo({
                                    src: src || image,
                                })];
                        case 1:
                            _b = _c.sent(), width = _b.width, height = _b.height, path = _b.path;
                            this.conf.DRAW_IMAGE_W = this.conf.IMG_REAL_W = width;
                            this.conf.IMG_REAL_H = height;
                            this.conf.IMG_RATIO = Number((this.conf.IMG_REAL_W / this.conf.IMG_REAL_H).toFixed(5));
                            this.conf.CROPPER_HEIGHT = Math.ceil(cropperWidth / this.conf.IMG_RATIO);
                            scaleP = Number((this.conf.IMG_REAL_W / cropperWidth).toFixed(5));
                            qualityWidth = this.conf.DRAW_IMAGE_W > this.conf.MAX_QW
                                ? this.conf.MAX_QW
                                : this.conf.DRAW_IMAGE_W;
                            p = this.initPosition();
                            if (this.conf.IMG_RATIO >= 1) {
                                this.conf.CROPPER_WIDTH = cropperWidth;
                                this.setData({
                                    cropperW: cropperWidth,
                                    cropperH: this.conf.CROPPER_HEIGHT,
                                    cutL: p.left,
                                    cutT: p.top,
                                    cutR: p.right,
                                    cutB: p.bottom,
                                    scaleP: scaleP,
                                    qualityWidth: qualityWidth,
                                    innerAspectRadio: this.conf.IMG_RATIO,
                                    filePath: path,
                                });
                            }
                            else {
                                this.setData({
                                    cropperW: this.conf.CROPPER_WIDTH,
                                    cropperH: this.conf.CROPPER_HEIGHT,
                                    cutL: p.left,
                                    cutT: p.top,
                                    cutR: p.right,
                                    cutB: p.bottom,
                                    scaleP: scaleP,
                                    qualityWidth: qualityWidth,
                                    innerAspectRadio: this.conf.IMG_RATIO,
                                    filePath: path,
                                });
                            }
                            this.setMinCutInfo();
                            this.setData({
                                showImg: true,
                            });
                            wx.hideLoading();
                            return [2 /*return*/];
                    }
                });
            });
        },
        getImageInfo: function () {
            var _this = this;
            var _a = this.data, quality = _a.quality, qualityWidth = _a.qualityWidth, innerAspectRadio = _a.innerAspectRadio, filePath = _a.filePath, cropperW = _a.cropperW, cropperH = _a.cropperH, cutL = _a.cutL, cutR = _a.cutR, cutT = _a.cutT, cutB = _a.cutB;
            wx.showLoading({
                title: '图片处理中...',
            });
            this.drag.IS_NO_DRAG = true;
            var ctx = wx.createCanvasContext('wxCropperCanvas', this);
            var w = qualityWidth;
            var h = Math.ceil(qualityWidth / innerAspectRadio);
            ctx.drawImage(filePath, 0, 0, w, h);
            ctx.draw(true, function () { return __awaiter(_this, void 0, void 0, function () {
                var canvasW, canvasH, canvasL, canvasT, tempFilePath, img;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            canvasW = Math.ceil(((cropperW - cutL - cutR) / cropperW) * w);
                            canvasH = Math.ceil(((cropperH - cutT - cutB) / cropperH) * h);
                            canvasL = Math.ceil((cutL / cropperW) * w);
                            canvasT = Math.ceil((cutT / cropperH) * h);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, wx.canvasToTempFilePath({
                                    x: canvasL,
                                    y: canvasT,
                                    width: canvasW,
                                    height: canvasH,
                                    destWidth: canvasW,
                                    destHeight: canvasH,
                                    quality: quality,
                                    fileType: 'jpg',
                                    canvasId: 'wxCropperCanvas',
                                }, this)];
                        case 2:
                            tempFilePath = (_a.sent()).tempFilePath;
                            img = {
                                path: tempFilePath,
                                width: canvasW,
                                height: canvasH,
                            };
                            this.$emit('confirm', img);
                            return [3 /*break*/, 4];
                        case 3:
                            wx.hideLoading();
                            this.drag.IS_NO_DRAG = false;
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        },
        setMinCutInfo: function () {
            var _a = this.data, minCropperW = _a.minCropperW, cutRatio = _a.cutRatio;
            this.conf.CUT_MIN_W = minCropperW;
            if (cutRatio) {
                this.conf.CUT_MIN_H = this.conf.CUT_MIN_W / cutRatio;
                return;
            }
            this.conf.CUT_MIN_H = this.conf.CUT_MIN_W;
        },
        initPosition: function () {
            var _a = this.data, cropperWidth = _a.cropperWidth, cropperRatio = _a.cropperRatio, cutRatio = _a.cutRatio;
            var left = 0, right = 0, top = 0, bottom = 0;
            if (cutRatio === 0 && this.conf.IMG_RATIO >= 1) {
                return { left: left, right: right, top: top, bottom: bottom };
            }
            if (this.conf.IMG_RATIO >= 1) {
                if (this.conf.IMG_RATIO >= cutRatio) {
                    var leftRight = Math.ceil((cropperWidth - this.conf.CROPPER_HEIGHT * cutRatio) / 2);
                    return {
                        left: leftRight,
                        right: leftRight,
                        top: 0,
                        bottom: 0,
                    };
                }
                var bottomTop_1 = Math.ceil((this.conf.CROPPER_HEIGHT - cropperWidth / cutRatio) / 2);
                return {
                    left: 0,
                    right: 0,
                    top: bottomTop_1,
                    bottom: bottomTop_1,
                };
            }
            if (cropperRatio > this.conf.IMG_RATIO) {
                this.conf.CROPPER_WIDTH =
                    (cropperWidth / cropperRatio) * this.conf.IMG_RATIO;
                this.conf.CROPPER_HEIGHT = cropperWidth / cropperRatio;
            }
            else {
                this.conf.CROPPER_WIDTH = cropperWidth;
                this.conf.CROPPER_HEIGHT = cropperWidth / this.conf.IMG_RATIO;
            }
            if (cutRatio === 0)
                return { left: left, right: right, top: top, bottom: bottom };
            if (this.conf.IMG_RATIO >= cutRatio) {
                var leftRight = Math.ceil((this.conf.CROPPER_WIDTH - this.conf.CROPPER_HEIGHT * cutRatio) / 2);
                return {
                    left: leftRight,
                    right: leftRight,
                    top: 0,
                    bottom: 0,
                };
            }
            var bottomTop = Math.ceil((this.conf.CROPPER_HEIGHT - this.conf.CROPPER_WIDTH / cutRatio) / 2);
            return {
                left: 0,
                right: 0,
                top: bottomTop,
                bottom: bottomTop,
            };
        },
        contentDragStart: function (_a) {
            var touches = _a.touches;
            var _b = this.data, cutL = _b.cutL, cutT = _b.cutT;
            if (this.drag.IS_NO_DRAG)
                return;
            this.drag.IS_TOUCH_CONTENT = true;
            this.drag.TOUCH_OFFSET_X =
                touches[0].pageX * this.conf.DRAG_MOVE_RATIO - cutL;
            this.drag.TOUCH_OFFSET_Y =
                touches[0].pageY * this.conf.DRAG_MOVE_RATIO - cutT;
            var cc = this.cropperCurrentInfo();
            this.drag.TOUCH_MAX_MOVE_SECTION_X = cc.x;
            this.drag.TOUCH_MAX_MOVE_SECTION_Y = cc.y;
        },
        cropperCurrentInfo: function () {
            var _a = this.data, cutL = _a.cutL, cutT = _a.cutT, cutR = _a.cutR, cutB = _a.cutB, cropperW = _a.cropperW, cropperH = _a.cropperH;
            var x = cutL + cutR;
            var y = cutT + cutB;
            this.drag.CUT_W = cropperW - x;
            this.drag.CUT_H = cropperH - y;
            return {
                x: x,
                y: y,
            };
        },
        contentDragMove: function (e) {
            if (this.drag.IS_NO_DRAG)
                return;
            if (!this.drag.IS_TOUCH_CONTENT)
                return;
            var MOVE_X = e.touches[0].pageX * this.conf.DRAG_MOVE_RATIO - this.drag.TOUCH_OFFSET_X;
            var MOVE_Y = e.touches[0].pageY * this.conf.DRAG_MOVE_RATIO - this.drag.TOUCH_OFFSET_Y;
            var drag_x = Math.min(this.drag.TOUCH_MAX_MOVE_SECTION_X, Math.max(0, MOVE_X));
            var drag_y = Math.min(this.drag.TOUCH_MAX_MOVE_SECTION_Y, Math.max(0, MOVE_Y));
            this.setData({
                cutL: Math.ceil(drag_x),
                cutR: Math.ceil(this.data.cropperW - this.drag.CUT_W - drag_x),
                cutT: Math.ceil(drag_y),
                cutB: Math.ceil(this.data.cropperH - this.drag.CUT_H - drag_y)
            });
            this.drag.TOUCH_OFFSET_X = e.touches[0].pageX * this.conf.DRAG_MOVE_RATIO - this.data.cutL;
            this.drag.TOUCH_OFFSET_Y = e.touches[0].pageY * this.conf.DRAG_MOVE_RATIO - this.data.cutT;
        },
        contentTouchEnd: function () {
            this.drag.IS_TOUCH_CONTENT = false;
        },
        sideDragStart: function (_a) {
            var touches = _a.touches;
            var _b = this.data, cutL = _b.cutL, cutT = _b.cutT, cutR = _b.cutR, cutB = _b.cutB;
            if (this.drag.IS_NO_DRAG)
                return;
            this.drag.IS_TOUCH_SIDE = true;
            this.drag.MOVE_PAGE_X = touches[0].pageX;
            this.drag.MOVE_PAGE_Y = touches[0].pageY;
            this.conf.CUT_T = cutT;
            this.conf.CUT_L = cutL;
            this.conf.CUT_R = cutR;
            this.conf.CUT_B = cutB;
            this.drag.SPACE_TOP_POSITION =
                this.conf.CROPPER_HEIGHT - this.conf.CUT_B - this.conf.CUT_MIN_H;
            this.drag.SPACE_BOTTOM_POSITION =
                this.conf.CROPPER_HEIGHT - this.conf.CUT_T - this.conf.CUT_MIN_H;
            this.drag.SPACE_RIGHT_POSITION =
                this.conf.CROPPER_WIDTH - this.conf.CUT_L - this.conf.CUT_MIN_W;
            this.drag.SPACE_LEFT_POSITION =
                this.conf.CROPPER_WIDTH - this.conf.CUT_R - this.conf.CUT_MIN_W;
        },
        sideDragMove: function (e) {
            var cutRatio = this.data.cutRatio;
            if (this.drag.IS_NO_DRAG)
                return;
            if (!this.drag.IS_TOUCH_SIDE)
                return;
            var type = e.target.dataset.drag;
            if (cutRatio === 0) {
                this.sideDragMoveDefault(e, type);
            }
            else {
                this.sideDragMoveConst(e, type);
            }
        },
        sideDragEnd: function () {
            this.drag.IS_TOUCH_SIDE = false;
            // console.log('sideDragEnd')
        },
        sideDragMoveConst: function (e, type) {
            var _a = this.data, cutL = _a.cutL, cutR = _a.cutR, cutT = _a.cutT, cutB = _a.cutB, cutRatio = _a.cutRatio;
            var xLength = (e.touches[0].pageX - this.drag.MOVE_PAGE_X) *
                this.conf.DRAG_MOVE_RATIO;
            var yLength = (e.touches[0].pageY - this.drag.MOVE_PAGE_Y) *
                this.conf.DRAG_MOVE_RATIO;
            switch (type) {
                case 'top':
                    var top_1 = this.conf.CUT_T + yLength;
                    top_1 = Math.ceil(top_1 >= this.drag.SPACE_TOP_POSITION
                        ? this.drag.SPACE_TOP_POSITION
                        : top_1);
                    var topL = this.conf.CUT_L + yLength * cutRatio;
                    topL = Math.ceil(topL >= this.drag.SPACE_LEFT_POSITION
                        ? this.drag.SPACE_LEFT_POSITION
                        : topL);
                    if (topL < 0) {
                        if (cutT <= 0)
                            return;
                        if (cutL >= 0)
                            return;
                        this.setData({
                            cutL: 0,
                        });
                        return;
                    }
                    if (top_1 <= 0) {
                        this.setData({
                            cutT: 0,
                        });
                        return;
                    }
                    this.setData({
                        cutT: top_1,
                        cutL: topL,
                    });
                    break;
                case 'left':
                    var left = this.conf.CUT_L + xLength;
                    left = Math.ceil(left >= this.drag.SPACE_LEFT_POSITION
                        ? this.drag.SPACE_LEFT_POSITION
                        : left);
                    var leftB = this.conf.CUT_B + xLength / cutRatio;
                    leftB = Math.ceil(leftB >= this.drag.SPACE_BOTTOM_POSITION
                        ? this.drag.SPACE_BOTTOM_POSITION
                        : leftB);
                    // console.log(leftB)
                    // console.log(left)
                    if (leftB < 0) {
                        if (cutL <= 0)
                            return;
                        if (cutB >= 0)
                            return;
                        this.setData({
                            cutB: 0,
                        });
                        return;
                    }
                    if (left <= 0) {
                        this.setData({
                            cutL: 0,
                        });
                        return;
                    }
                    this.setData({
                        cutL: left,
                        cutB: leftB,
                    });
                    break;
                case 'bottom':
                    var bottom = this.conf.CUT_B - yLength;
                    bottom = Math.ceil(bottom >= this.drag.SPACE_BOTTOM_POSITION
                        ? this.drag.SPACE_BOTTOM_POSITION
                        : bottom);
                    var bottomR = this.conf.CUT_R - yLength * cutRatio;
                    bottomR = Math.ceil(bottomR >= this.drag.SPACE_RIGHT_POSITION
                        ? this.drag.SPACE_RIGHT_POSITION
                        : bottomR);
                    if (bottomR < 0) {
                        if (cutB <= 0)
                            return;
                        if (cutR >= 0)
                            return;
                        this.setData({
                            cutR: 0,
                        });
                        return;
                    }
                    if (bottom <= 0) {
                        this.setData({
                            cutB: 0,
                        });
                        return;
                    }
                    this.setData({
                        cutR: bottomR,
                        cutB: bottom,
                    });
                    break;
                case 'right':
                    var right = this.conf.CUT_R - xLength;
                    right = Math.ceil(right >= this.drag.SPACE_RIGHT_POSITION
                        ? this.drag.SPACE_RIGHT_POSITION
                        : right);
                    var rightT = this.conf.CUT_T - xLength / cutRatio;
                    rightT = Math.ceil(rightT >= this.drag.SPACE_TOP_POSITION
                        ? this.drag.SPACE_TOP_POSITION
                        : rightT);
                    if (rightT < 0) {
                        if (cutR <= 0)
                            return;
                        if (cutT >= 0)
                            return;
                        this.setData({
                            cutT: 0,
                        });
                        return;
                    }
                    if (right <= 0) {
                        this.setData({
                            cutR: 0,
                        });
                        return;
                    }
                    this.setData({
                        cutR: right,
                        cutT: rightT,
                    });
                    break;
            }
        },
        sideDragMoveDefault: function (e, type) {
            var xLength = (e.touches[0].pageX - this.drag.MOVE_PAGE_X) *
                this.conf.DRAG_MOVE_RATIO;
            var yLength = (e.touches[0].pageY - this.drag.MOVE_PAGE_Y) *
                this.conf.DRAG_MOVE_RATIO;
            switch (type) {
                case 'top':
                    var top_2 = this.conf.CUT_T + yLength;
                    top_2 = top_2 <= 0 ? 0 : top_2;
                    top_2 = Math.ceil(top_2 >= this.drag.SPACE_TOP_POSITION
                        ? this.drag.SPACE_TOP_POSITION
                        : top_2);
                    this.setData({
                        cutT: top_2,
                    });
                    break;
                case 'bottom':
                    var bottom = this.conf.CUT_B - yLength;
                    bottom = bottom <= 0 ? 0 : bottom;
                    bottom = Math.ceil(bottom >= this.drag.SPACE_BOTTOM_POSITION
                        ? this.drag.SPACE_BOTTOM_POSITION
                        : bottom);
                    this.setData({
                        cutB: bottom,
                    });
                    break;
                case 'right':
                    var right = this.conf.CUT_R - xLength;
                    right = right <= 0 ? 0 : right;
                    right = Math.ceil(right >= this.drag.SPACE_RIGHT_POSITION
                        ? this.drag.SPACE_RIGHT_POSITION
                        : right);
                    this.setData({
                        cutR: right,
                    });
                    break;
                case 'left':
                    var left = this.conf.CUT_L + xLength;
                    left = left <= 0 ? 0 : left;
                    left = Math.ceil(left >= this.drag.SPACE_LEFT_POSITION
                        ? this.drag.SPACE_LEFT_POSITION
                        : left);
                    this.setData({
                        cutL: left,
                    });
                    break;
                case 'rightBottom':
                    var rightBottomR = this.conf.CUT_R - xLength;
                    rightBottomR = rightBottomR <= 0 ? 0 : rightBottomR;
                    rightBottomR = Math.ceil(rightBottomR >= this.drag.SPACE_RIGHT_POSITION
                        ? this.drag.SPACE_RIGHT_POSITION
                        : rightBottomR);
                    var rightBottomB = this.conf.CUT_B - yLength;
                    rightBottomB = rightBottomB <= 0 ? 0 : rightBottomB;
                    rightBottomB = Math.ceil(rightBottomB >= this.drag.SPACE_BOTTOM_POSITION
                        ? this.drag.SPACE_BOTTOM_POSITION
                        : rightBottomB);
                    this.setData({
                        cutB: rightBottomB,
                        cutR: rightBottomR,
                    });
                    break;
                default:
                    break;
            }
        },
    },
    created: function () {
        this.initStaticData();
    },
});
