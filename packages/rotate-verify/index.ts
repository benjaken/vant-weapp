import { VantComponent } from '../common/component';
import { GREEN } from '../common/color';
import { getRect } from '../common/utils';

VantComponent({
  props: {
    show: {
      type: Boolean,
      value: false
    },
    img: {
      type: String,
      value: 'https://img.yzcdn.cn/vant/logo.png',
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
      value: '拖动滑块，使图片角度为正',
    },
    activeColor: {
      type: String,
      value: GREEN,
    },
  },
  data: {
    loading: true,
    size: 0,
    width: 0,
    x: 0,
    target: 0,
    targetAngle: 0,
    success: false,
    isDrag: false,
  },
  methods: {
    calcuateWidth() {
      Promise.all([
        getRect(this, '.van-rotate-verify__wrapper'),
        getRect(this, '.van-rotate-verify__dragger'),
      ]).then(([{ width }, { width: size }]) => {
        this.setData({
          loading: false,
          width,
          size
        });
        this.randomTarget();
      });
    },
    randomTarget() {
      const { width = 0, size = 0 } = this.data;
      const min = (width - size) / 2;
      const max = width - size;
      const target = Math.floor(Math.random() * (max - min + 1)) + min;
      this.setData({
        target,
        targetAngle: -(target || 0) / max * 360
      });
    },
    onDragStart({ isDrag }) {
      this.setData({ isDrag })
    },
    onDragEnd({ x, isDrag }) {
      const { deviation } = this.properties;
      const { target } = this.data;
      if (x > target + deviation || x < target - deviation) {
        this.setData({
          x: 0,
          isDrag,
          success: false,
        });
        this.$emit('error');
      } else {
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
        loading: true
      });
      this.calcuateWidth()
    },
    beforeEnter() {
      this.setData({
        x: 0,
        success: false,
        loading: true
      });
    },
    afterEnter() {
      this.calcuateWidth()
    },
    onClose() {
      this.setData({
        show: false
      })
      this.$emit('close');
    },
  },
});
