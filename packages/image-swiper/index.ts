import { VantComponent } from '../common/component';

VantComponent({
  props: {
    images: {
      type: Array,
      value: []
    },
    autoplay: {
      type: Boolean,
      value: false
    },
    interval: {
      type: Number,
      value: 5000
    },
    circular: {
      type: Boolean,
      value: false
    },
    vertical: {
      type: Boolean,
      value: false
    },
    showToggle: {
      type: Boolean,
      value: false
    },
    showIndicator: {
      type: Boolean,
      value: true
    },
    indicatorColor: {
      type: String,
      value: 'rgba(0, 0, 0, 0.5)'
    },
    indicatorTextColor: {
      type: String,
      value: '#fff'
    },
    height: {
      type: String,
      value: '500rpx'
    },
    clickable: {
      type: Boolean,
      value: false
    }
  },
  data: {
    active: '',
    current: 0,
    currentIndex: 0
  },
  methods: {
    toggleType({ currentTarget: { dataset } }) {
      const current = dataset.index || 0
      this.setData({
        current,
        currentIndex: current,
      })
    },
    getImages() {
      const { images } = this.properties
      const swipeImages: any = []
      images.forEach(i => swipeImages.push(...i.images))
      return swipeImages
    },
    onSwipeChange({ detail: { current } }) {
      const { images } = this.properties
      const swipeImages = this.getImages()
      const image = swipeImages[current]
      const target = images.find(item => item.images.includes(image))
      this.setData({
        currentIndex: current,
        active: target.name
      })
    },
    onImagePreview({ currentTarget: { dataset } }) {
      if (this.data.clickable) {
        return this.$emit('click', dataset.index)
      }
      const swipeImages = this.getImages()
      const current = dataset.url || swipeImages[0]
      return wx.previewImage({
        current,
        urls: swipeImages,
        fail() {
          wx.showToast({ title: '预览图片失败', icon: 'none' })
        }
      })
    }
  }
})
