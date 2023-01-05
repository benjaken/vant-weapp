import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    showCropper: false,
    cutRatio: 0
  },

  methods: {
    showCut() {
      this.setData({
        showCropper: true,
        cutRatio: 1
      })
      this.selectComponent('#image-cropper').loadImage('https://img.yzcdn.cn/vant/cat.jpeg')
    },
    showRandomCut() {
      this.setData({
        showCropper: true,
        cutRatio: 0
      })
      this.selectComponent('#image-cropper').loadImage('https://img.yzcdn.cn/vant/cat.jpeg')
    },
    async onConfirm({ detail }) {
      wx.previewImage({
        urls: [detail.path],
        current: detail.path
      })
      this.onCancel()
    },
    onCancel() {
      this.setData({
        showCropper: false
      })
    }
  },
});
