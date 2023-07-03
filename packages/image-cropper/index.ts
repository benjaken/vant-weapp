import toast from '../toast/toast';
import { VantComponent } from '../common/component';
VantComponent({
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
    cancel() {
      toast.clear();
      this.triggerEvent('cancel');
    },
    initStaticData() {
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
    async loadImage(src?: string) {
      const { image, cropperWidth } = this.data;
      wx.showLoading({
        title: '图片加载中...',
      })
      const { width, height, path } = await wx.getImageInfo({
        src: src || image,
      });
      this.conf.DRAW_IMAGE_W = this.conf.IMG_REAL_W = width;
      this.conf.IMG_REAL_H = height;
      this.conf.IMG_RATIO = Number(
        (this.conf.IMG_REAL_W / this.conf.IMG_REAL_H).toFixed(5)
      );
      this.conf.CROPPER_HEIGHT = Math.ceil(cropperWidth / this.conf.IMG_RATIO);
      const scaleP = Number((this.conf.IMG_REAL_W / cropperWidth).toFixed(5));
      const qualityWidth =
        this.conf.DRAW_IMAGE_W > this.conf.MAX_QW
          ? this.conf.MAX_QW
          : this.conf.DRAW_IMAGE_W;
      // const MIN_RANG
      const p = this.initPosition();
      if (this.conf.IMG_RATIO >= 1) {
        this.conf.CROPPER_WIDTH = cropperWidth;
        this.setData({
          cropperW: cropperWidth,
          cropperH: this.conf.CROPPER_HEIGHT,
          cutL: p.left,
          cutT: p.top,
          cutR: p.right,
          cutB: p.bottom,
          scaleP,
          qualityWidth,
          innerAspectRadio: this.conf.IMG_RATIO,
          filePath: path,
        });
      } else {
        this.setData({
          cropperW: this.conf.CROPPER_WIDTH,
          cropperH: this.conf.CROPPER_HEIGHT,
          cutL: p.left,
          cutT: p.top,
          cutR: p.right,
          cutB: p.bottom,
          scaleP,
          qualityWidth,
          innerAspectRadio: this.conf.IMG_RATIO,
          filePath: path,
        });
      }
      this.setMinCutInfo();
      this.setData({
        showImg: true,
      });
      wx.hideLoading()
    },
    getImageInfo() {
      const {
        quality,
        qualityWidth,
        innerAspectRadio,
        filePath,
        cropperW,
        cropperH,
        cutL,
        cutR,
        cutT,
        cutB,
      } = this.data;
      wx.showLoading({
        title: '图片处理中...',
      })
      this.drag.IS_NO_DRAG = true;
      const ctx = wx.createCanvasContext('wxCropperCanvas', this);
      const w = qualityWidth;
      const h = Math.ceil(qualityWidth / innerAspectRadio);
      ctx.drawImage(filePath, 0, 0, w, h);
      ctx.draw(true, async () => {
        const canvasW = Math.ceil(((cropperW - cutL - cutR) / cropperW) * w);
        const canvasH = Math.ceil(((cropperH - cutT - cutB) / cropperH) * h);
        const canvasL = Math.ceil((cutL / cropperW) * w);
        const canvasT = Math.ceil((cutT / cropperH) * h);
        try {
          const { tempFilePath } = await wx.canvasToTempFilePath(
            {
              x: canvasL,
              y: canvasT,
              width: canvasW,
              height: canvasH,
              destWidth: canvasW,
              destHeight: canvasH,
              quality,
              fileType: 'jpg',
              canvasId: 'wxCropperCanvas',
            },
            this
          );
          const img = {
            path: tempFilePath,
            width: canvasW,
            height: canvasH,
          };
          this.$emit('confirm', img);
        } finally {
          wx.hideLoading();
          this.drag.IS_NO_DRAG = false;
        }
      });
    },
    setMinCutInfo() {
      const { minCropperW, cutRatio } = this.data;
      this.conf.CUT_MIN_W = minCropperW;
      if (cutRatio) {
        this.conf.CUT_MIN_H = this.conf.CUT_MIN_W / cutRatio;
        return;
      }
      this.conf.CUT_MIN_H = this.conf.CUT_MIN_W;
    },
    initPosition() {
      const { cropperWidth, cropperRatio, cutRatio } = this.data;
      const left = 0,
        right = 0,
        top = 0,
        bottom = 0;
      if (cutRatio === 0 && this.conf.IMG_RATIO >= 1) {
        return { left, right, top, bottom };
      }
      if (this.conf.IMG_RATIO >= 1) {
        if (this.conf.IMG_RATIO >= cutRatio) {
          let leftRight = Math.ceil(
            (cropperWidth - this.conf.CROPPER_HEIGHT * cutRatio) / 2
          );
          return {
            left: leftRight,
            right: leftRight,
            top: 0,
            bottom: 0,
          };
        }
        const bottomTop = Math.ceil(
          (this.conf.CROPPER_HEIGHT - cropperWidth / cutRatio) / 2
        );
        return {
          left: 0,
          right: 0,
          top: bottomTop,
          bottom: bottomTop,
        };
      }
      if (cropperRatio > this.conf.IMG_RATIO) {
        this.conf.CROPPER_WIDTH =
          (cropperWidth / cropperRatio) * this.conf.IMG_RATIO;
        this.conf.CROPPER_HEIGHT = cropperWidth / cropperRatio;
      } else {
        this.conf.CROPPER_WIDTH = cropperWidth;
        this.conf.CROPPER_HEIGHT = cropperWidth / this.conf.IMG_RATIO;
      }
      if (cutRatio === 0) return { left, right, top, bottom };
      if (this.conf.IMG_RATIO >= cutRatio) {
        const leftRight = Math.ceil(
          (this.conf.CROPPER_WIDTH - this.conf.CROPPER_HEIGHT * cutRatio) / 2
        );
        return {
          left: leftRight,
          right: leftRight,
          top: 0,
          bottom: 0,
        };
      }
      const bottomTop = Math.ceil(
        (this.conf.CROPPER_HEIGHT - this.conf.CROPPER_WIDTH / cutRatio) / 2
      );
      return {
        left: 0,
        right: 0,
        top: bottomTop,
        bottom: bottomTop,
      };
    },
    contentDragStart({ touches }) {
      const { cutL, cutT } = this.data;
      if (this.drag.IS_NO_DRAG) return;
      this.drag.IS_TOUCH_CONTENT = true;
      this.drag.TOUCH_OFFSET_X =
        touches[0].pageX * this.conf.DRAG_MOVE_RATIO - cutL;
      this.drag.TOUCH_OFFSET_Y =
        touches[0].pageY * this.conf.DRAG_MOVE_RATIO - cutT;
      const cc = this.cropperCurrentInfo();
      this.drag.TOUCH_MAX_MOVE_SECTION_X = cc.x;
      this.drag.TOUCH_MAX_MOVE_SECTION_Y = cc.y;
    },
    cropperCurrentInfo() {
      const { cutL, cutT, cutR, cutB, cropperW, cropperH } = this.data;
      const x = cutL + cutR;
      const y = cutT + cutB;
      this.drag.CUT_W = cropperW - x;
      this.drag.CUT_H = cropperH - y;
      return {
        x,
        y,
      };
    },
    contentDragMove(e) {
      if (this.drag.IS_NO_DRAG) return
      if (!this.drag.IS_TOUCH_CONTENT) return
      const MOVE_X = e.touches[0].pageX * this.conf.DRAG_MOVE_RATIO - this.drag.TOUCH_OFFSET_X
      const MOVE_Y = e.touches[0].pageY * this.conf.DRAG_MOVE_RATIO - this.drag.TOUCH_OFFSET_Y
      const drag_x = Math.min(this.drag.TOUCH_MAX_MOVE_SECTION_X, Math.max(0, MOVE_X))
      const drag_y = Math.min(this.drag.TOUCH_MAX_MOVE_SECTION_Y, Math.max(0, MOVE_Y))
      this.setData({
        cutL: Math.ceil(drag_x),
        cutR: Math.ceil(this.data.cropperW - this.drag.CUT_W - drag_x),
        cutT: Math.ceil(drag_y),
        cutB: Math.ceil(this.data.cropperH - this.drag.CUT_H - drag_y)
      })
      this.drag.TOUCH_OFFSET_X = e.touches[0].pageX * this.conf.DRAG_MOVE_RATIO - this.data.cutL
      this.drag.TOUCH_OFFSET_Y = e.touches[0].pageY * this.conf.DRAG_MOVE_RATIO - this.data.cutT
    },
    contentTouchEnd() {
      this.drag.IS_TOUCH_CONTENT = false;
    },
    sideDragStart({ touches }) {
      const { cutL, cutT, cutR, cutB } = this.data;
      if (this.drag.IS_NO_DRAG) return;
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
    sideDragMove(e) {
      const { cutRatio } = this.data;
      if (this.drag.IS_NO_DRAG) return;
      if (!this.drag.IS_TOUCH_SIDE) return;
      const type = e.target.dataset.drag;
      if (cutRatio === 0) {
        this.sideDragMoveDefault(e, type);
      } else {
        this.sideDragMoveConst(e, type);
      }
    },
    sideDragEnd() {
      this.drag.IS_TOUCH_SIDE = false;
      // console.log('sideDragEnd')
    },
    sideDragMoveConst(e, type) {
      const { cutL, cutR, cutT, cutB, cutRatio } = this.data;
      const xLength =
        (e.touches[0].pageX - this.drag.MOVE_PAGE_X) *
        this.conf.DRAG_MOVE_RATIO;
      const yLength =
        (e.touches[0].pageY - this.drag.MOVE_PAGE_Y) *
        this.conf.DRAG_MOVE_RATIO;
      switch (type) {
        case 'top':
          let top = this.conf.CUT_T + yLength;
          top = Math.ceil(
            top >= this.drag.SPACE_TOP_POSITION
              ? this.drag.SPACE_TOP_POSITION
              : top
          );

          let topL = this.conf.CUT_L + yLength * cutRatio;
          topL = Math.ceil(
            topL >= this.drag.SPACE_LEFT_POSITION
              ? this.drag.SPACE_LEFT_POSITION
              : topL
          );

          if (topL < 0) {
            if (cutT <= 0) return;
            if (cutL >= 0) return;
            this.setData({
              cutL: 0,
            });
            return;
          }

          if (top <= 0) {
            this.setData({
              cutT: 0,
            });
            return;
          }

          this.setData({
            cutT: top,
            cutL: topL,
          });
          break;
        case 'left':
          let left = this.conf.CUT_L + xLength;
          left = Math.ceil(
            left >= this.drag.SPACE_LEFT_POSITION
              ? this.drag.SPACE_LEFT_POSITION
              : left
          );

          let leftB = this.conf.CUT_B + xLength / cutRatio;
          leftB = Math.ceil(
            leftB >= this.drag.SPACE_BOTTOM_POSITION
              ? this.drag.SPACE_BOTTOM_POSITION
              : leftB
          );

          // console.log(leftB)
          // console.log(left)
          if (leftB < 0) {
            if (cutL <= 0) return;
            if (cutB >= 0) return;
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
          let bottom = this.conf.CUT_B - yLength;
          bottom = Math.ceil(
            bottom >= this.drag.SPACE_BOTTOM_POSITION
              ? this.drag.SPACE_BOTTOM_POSITION
              : bottom
          );

          let bottomR = this.conf.CUT_R - yLength * cutRatio;
          bottomR = Math.ceil(
            bottomR >= this.drag.SPACE_RIGHT_POSITION
              ? this.drag.SPACE_RIGHT_POSITION
              : bottomR
          );

          if (bottomR < 0) {
            if (cutB <= 0) return;
            if (cutR >= 0) return;
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
          let right = this.conf.CUT_R - xLength;
          right = Math.ceil(
            right >= this.drag.SPACE_RIGHT_POSITION
              ? this.drag.SPACE_RIGHT_POSITION
              : right
          );

          let rightT = this.conf.CUT_T - xLength / cutRatio;
          rightT = Math.ceil(
            rightT >= this.drag.SPACE_TOP_POSITION
              ? this.drag.SPACE_TOP_POSITION
              : rightT
          );

          if (rightT < 0) {
            if (cutR <= 0) return;
            if (cutT >= 0) return;
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
    sideDragMoveDefault(e, type) {
      const xLength =
        (e.touches[0].pageX - this.drag.MOVE_PAGE_X) *
        this.conf.DRAG_MOVE_RATIO;
      const yLength =
        (e.touches[0].pageY - this.drag.MOVE_PAGE_Y) *
        this.conf.DRAG_MOVE_RATIO;
      switch (type) {
        case 'top':
          let top = this.conf.CUT_T + yLength;
          top = top <= 0 ? 0 : top;
          top = Math.ceil(
            top >= this.drag.SPACE_TOP_POSITION
              ? this.drag.SPACE_TOP_POSITION
              : top
          );
          this.setData({
            cutT: top,
          });
          break;
        case 'bottom':
          let bottom = this.conf.CUT_B - yLength;
          bottom = bottom <= 0 ? 0 : bottom;
          bottom = Math.ceil(
            bottom >= this.drag.SPACE_BOTTOM_POSITION
              ? this.drag.SPACE_BOTTOM_POSITION
              : bottom
          );
          this.setData({
            cutB: bottom,
          });
          break;
        case 'right':
          let right = this.conf.CUT_R - xLength;
          right = right <= 0 ? 0 : right;
          right = Math.ceil(
            right >= this.drag.SPACE_RIGHT_POSITION
              ? this.drag.SPACE_RIGHT_POSITION
              : right
          );
          this.setData({
            cutR: right,
          });
          break;
        case 'left':
          let left = this.conf.CUT_L + xLength;
          left = left <= 0 ? 0 : left;
          left = Math.ceil(
            left >= this.drag.SPACE_LEFT_POSITION
              ? this.drag.SPACE_LEFT_POSITION
              : left
          );
          this.setData({
            cutL: left,
          });
          break;
        case 'rightBottom':
          let rightBottomR = this.conf.CUT_R - xLength;
          rightBottomR = rightBottomR <= 0 ? 0 : rightBottomR;
          rightBottomR = Math.ceil(
            rightBottomR >= this.drag.SPACE_RIGHT_POSITION
              ? this.drag.SPACE_RIGHT_POSITION
              : rightBottomR
          );

          let rightBottomB = this.conf.CUT_B - yLength;
          rightBottomB = rightBottomB <= 0 ? 0 : rightBottomB;
          rightBottomB = Math.ceil(
            rightBottomB >= this.drag.SPACE_BOTTOM_POSITION
              ? this.drag.SPACE_BOTTOM_POSITION
              : rightBottomB
          );
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
