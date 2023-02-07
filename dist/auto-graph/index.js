var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Toast from '../toast/toast';
import { GRAY, GRAY_DARK } from '../common/color';
import { VantComponent } from '../common/component';
VantComponent({
    props: {
        tip: {
            type: String,
            value: '请书写您的签名',
        },
        color: {
            type: String,
            value: GRAY,
        },
        tipColor: {
            type: String,
            value: GRAY_DARK,
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
    mounted() {
        this.createSelectorQuery()
            .select('#canvas')
            .fields({ node: true, size: true })
            .exec((res) => {
            const { width, height } = res[0];
            const canvas = res[0].node;
            const context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            this.setData({
                canvas,
                context,
                width,
                height,
                loading: false,
            });
            this.setTip();
        });
    },
    methods: {
        onTouchStart(event) {
            const { color, lineWidth, dashWidth } = this.properties;
            const { width, height, writeTips, context } = this.data;
            const { x, y } = event.changedTouches[0];
            const dpr = wx.getSystemInfoSync().pixelRatio;
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
            const dash = lineWidth * dashWidth * dpr;
            context.setLineDash([Math.round(dash)]);
            context.strokeStyle = color;
        },
        onTouchMove(event) {
            const { context } = this.data;
            const { x, y } = event.changedTouches[0];
            context.lineTo(x, y);
            context.stroke();
        },
        onTouchEnd(event) {
            const { context } = this.data;
            const { x, y } = event.changedTouches[0];
            context.lineTo(x, y);
            context.stroke();
            context.closePath();
            this.copyCanvas();
        },
        setTip() {
            const { width, height, context } = this.data;
            const { tip, tipColor } = this.properties;
            context.font = '36px sans-serif';
            context.fillStyle = tipColor;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(tip, width / 2, height / 2);
            this.copyCanvas();
        },
        copyCanvas() {
            const arr = this.pic || [];
            const { context, width, height, picIndex } = this.data;
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
        pasteCopy() {
            const { context, picIndex } = this.data;
            context.putImageData(this.pic[picIndex], 0, 0);
        },
        handleBack() {
            const { picIndex } = this.data;
            if (this.pic.length < 2)
                return false;
            this.setData({
                picIndex: picIndex - 1,
            });
            this.pasteCopy();
        },
        handleGo() {
            const { picLength, picIndex } = this.data;
            if (picLength - 1 <= picIndex)
                return false;
            this.setData({
                picIndex: picIndex + 1,
            });
            this.pasteCopy();
        },
        reset() {
            const { width, height, context } = this.data;
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
        finish() {
            return __awaiter(this, void 0, void 0, function* () {
                const { tip } = this.properties;
                const { canvas, width, height, isEmpty } = this.data;
                if (isEmpty) {
                    return Toast({
                        context: this,
                        message: tip,
                    });
                }
                const { tempFilePath } = yield wx.canvasToTempFilePath({
                    canvas,
                    canvasId: 'canvas',
                    x: 0,
                    y: 0,
                    width,
                    height,
                    destWidth: width,
                    destHeight: height,
                });
                this.$emit('finish', tempFilePath);
            });
        },
    },
});
