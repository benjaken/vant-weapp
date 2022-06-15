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
var color_1 = require("../common/color");
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        tip: {
            type: String,
            value: '请书写您的签名',
        },
        color: {
            type: String,
            value: color_1.GRAY,
        },
        tipColor: {
            type: String,
            value: color_1.GRAY_DARK,
        },
        lineWidth: {
            type: Number,
            value: 1,
        },
        dashWidth: {
            type: Number,
            value: 0,
        },
    },
    data: {
        width: 0,
        height: 0,
        canvas: null,
        context: null,
        writeTips: true,
        isEmpty: true,
        loading: true,
        picIndex: -1,
        picLength: 0,
    },
    mounted: function () {
        var _this = this;
        this.createSelectorQuery()
            .select('#canvas')
            .fields({ node: true, size: true })
            .exec(function (res) {
            var _a = res[0], width = _a.width, height = _a.height;
            var canvas = res[0].node;
            var context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            _this.setData({
                canvas: canvas,
                context: context,
                width: width,
                height: height,
                loading: false,
            });
            _this.setTip();
        });
    },
    methods: {
        onTouchStart: function (event) {
            var _a = this.properties, color = _a.color, lineWidth = _a.lineWidth, dashWidth = _a.dashWidth;
            var _b = this.data, width = _b.width, height = _b.height, writeTips = _b.writeTips, context = _b.context;
            var _c = event.changedTouches[0], x = _c.x, y = _c.y;
            var dpr = wx.getWindowInfo().pixelRatio;
            if (writeTips) {
                context.clearRect(0, 0, width, height);
                this.setData({
                    writeTips: false,
                    isEmpty: false,
                });
            }
            context.beginPath();
            context.moveTo(x, y);
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.lineWidth = lineWidth * dpr;
            var dash = lineWidth * dashWidth * dpr;
            context.setLineDash([Math.round(dash)]);
            context.strokeStyle = color;
        },
        onTouchMove: function (event) {
            var context = this.data.context;
            var _a = event.changedTouches[0], x = _a.x, y = _a.y;
            context.lineTo(x, y);
            context.stroke();
        },
        onTouchEnd: function (event) {
            var context = this.data.context;
            var _a = event.changedTouches[0], x = _a.x, y = _a.y;
            context.lineTo(x, y);
            context.stroke();
            context.closePath();
            this.copyCanvas();
        },
        setTip: function () {
            var _a = this.data, width = _a.width, height = _a.height, context = _a.context;
            var _b = this.properties, tip = _b.tip, tipColor = _b.tipColor;
            context.font = '36px sans-serif';
            context.fillStyle = tipColor;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(tip, width / 2, height / 2);
            this.copyCanvas();
        },
        copyCanvas: function () {
            var arr = this.pic || [];
            var _a = this.data, context = _a.context, width = _a.width, height = _a.height, picIndex = _a.picIndex;
            if (picIndex < arr.length - 1) {
                arr.splice(picIndex + 1);
            }
            arr.push(context.getImageData(0, 0, width, height));
            this.pic = arr;
            this.setData({
                picIndex: picIndex + 1,
                picLength: arr.length,
            });
        },
        pasteCopy: function () {
            var _a = this.data, context = _a.context, picIndex = _a.picIndex;
            context.putImageData(this.pic[picIndex], 0, 0);
        },
        handleBack: function () {
            var picIndex = this.data.picIndex;
            if (this.pic.length < 2)
                return false;
            this.setData({
                picIndex: picIndex - 1,
            });
            this.pasteCopy();
        },
        handleGo: function () {
            var _a = this.data, picLength = _a.picLength, picIndex = _a.picIndex;
            if (picLength - 1 <= picIndex)
                return false;
            this.setData({
                picIndex: picIndex + 1,
            });
            this.pasteCopy();
        },
        reset: function () {
            var _a = this.data, width = _a.width, height = _a.height, context = _a.context;
            this.setData({
                writeTips: true,
                isEmpty: true,
                picIndex: -1,
                picLength: 0,
            });
            this.pic = [];
            context.clearRect(0, 0, width, height);
            this.setTip();
        },
        finish: function () {
            return __awaiter(this, void 0, void 0, function () {
                var tip, _a, canvas, width, height, isEmpty, tempFilePath;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            tip = this.properties.tip;
                            _a = this.data, canvas = _a.canvas, width = _a.width, height = _a.height, isEmpty = _a.isEmpty;
                            if (isEmpty) {
                                return [2 /*return*/, (0, toast_1.default)({
                                        context: this,
                                        message: tip,
                                    })];
                            }
                            return [4 /*yield*/, wx.canvasToTempFilePath({
                                    canvas: canvas,
                                    canvasId: 'canvas',
                                    x: 0,
                                    y: 0,
                                    width: width,
                                    height: height,
                                    destWidth: width,
                                    destHeight: height,
                                })];
                        case 1:
                            tempFilePath = (_b.sent()).tempFilePath;
                            this.$emit('finish', tempFilePath);
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
