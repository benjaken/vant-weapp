var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GREEN } from '../common/color';
import { getRect, toPromise } from '../common/utils';
import { VantComponent } from '../common/component';
VantComponent({
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
            value: GREEN,
        },
        remote: Boolean,
        request: {
            type: null,
            value: () => { },
        },
        verity: {
            type: null,
            value: () => { },
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
        calcuateWidth() {
            const { remote, request } = this.properties;
            Promise.all([
                getRect(this, '.van-slide-captcha__content'),
                getRect(this, '.van-slide-captcha__dragger'),
            ]).then(([{ width, height }, { width: sizeX, height: sizeY }]) => {
                this.setData({
                    width,
                    height,
                    sizeX,
                    sizeY,
                });
                if (remote) {
                    toPromise(request()).then((data) => {
                        this.setData({
                            loading: false,
                            uuid: data.uuid,
                            img: data.backImg,
                            tempFilePath: data.targetImg,
                        });
                        this.buildImage();
                    });
                }
                else {
                    this.randomTarget();
                }
            });
        },
        randomTarget() {
            return __awaiter(this, void 0, void 0, function* () {
                const images = [
                    'https://img.yzcdn.cn/vant/cat.jpeg',
                    'https://img.yzcdn.cn/vant/sand.jpg',
                    'https://img.yzcdn.cn/vant/leaf.jpg',
                    'https://img.yzcdn.cn/vant/tree.jpg',
                ];
                const { width = 0, height = 0, sizeX = 0 } = this.data;
                const minW = sizeX * 2;
                const maxW = width - sizeX;
                const left = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
                const top = Math.floor(Math.random() * (height - 40 + 1));
                const target = Math.floor(Math.random() * (left - 80 + 1)) + 80;
                const rand = Math.floor(Math.random() * images.length);
                this.setData({
                    loading: false,
                    top,
                    left,
                    target,
                    img: images[rand],
                });
                this.buildImage();
            });
        },
        buildImage() {
            const { remote } = this.properties;
            const { width, height, img, left, top } = this.data;
            this.createSelectorQuery()
                .select('#canvas')
                .fields({ node: true, size: true })
                .exec((res) => __awaiter(this, void 0, void 0, function* () {
                const canvas = res[0].node;
                const ctx = canvas.getContext('2d');
                const dpr = wx.getWindowInfo().pixelRatio;
                const image = canvas.createImage();
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                const canvasRatio = canvas.width / canvas.height;
                if (remote) {
                    image.src = img;
                    image.onload = () => {
                        this.setData({
                            remoteRadio: image.width * dpr / canvas.width,
                        });
                        const imgRatio = image.width / image.height;
                        if (canvasRatio > imgRatio) {
                            ctx.drawImage(image, 0, 0, canvas.width, canvas.width / imgRatio);
                        }
                        else {
                            ctx.drawImage(image, 0, 0, canvas.height * imgRatio, canvas.height);
                        }
                    };
                }
                else {
                    const { path, width, height } = yield wx.getImageInfo({
                        src: img,
                    });
                    image.src = path;
                    image.onload = () => __awaiter(this, void 0, void 0, function* () {
                        const imgRatio = width / height;
                        if (canvasRatio > imgRatio) {
                            ctx.drawImage(image, 0, 0, canvas.width, canvas.width / imgRatio);
                        }
                        else {
                            ctx.drawImage(image, 0, 0, canvas.height * imgRatio, canvas.height);
                        }
                        const { tempFilePath } = yield wx.canvasToTempFilePath({
                            canvas,
                            x: left,
                            y: top,
                            width: 40,
                            height: 40 * canvasRatio,
                            destWidth: 40,
                            destHeight: 40 * canvasRatio,
                            canvasId: 'canvas',
                        });
                        this.setData({ tempFilePath });
                    });
                }
            }));
        },
        onDragStart({ isDrag }) {
            this.setData({ isDrag });
        },
        onDragEnd({ x, isDrag }) {
            const { deviation, remote, verity } = this.properties;
            const { target, uuid, remoteRadio } = this.data;
            if (remote) {
                this.setData({
                    isDrag,
                    success: true,
                });
                console.log(x, remoteRadio);
                toPromise(verity(parseInt(x) * remoteRadio, uuid)).then((value) => {
                    if (value) {
                        this.$emit('success');
                    }
                    else {
                        this.$emit('error');
                        this.reset();
                    }
                });
            }
            else if (x > target + deviation || x < target - deviation) {
                this.$emit('error');
                this.reset();
            }
            else {
                this.setData({
                    isDrag,
                    success: true,
                });
                this.$emit('success');
            }
        },
        reset() {
            this.setData({
                x: 0,
                success: false,
                loading: true,
                img: '',
            });
            this.calcuateWidth();
        },
        beforeEnter() {
            this.setData({
                x: 0,
                success: false,
                loading: true,
                img: '',
            });
        },
        afterEnter() {
            this.calcuateWidth();
        },
        onClose() {
            this.setData({
                show: false,
            });
            this.$emit('close');
        },
    },
});
