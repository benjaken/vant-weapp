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
    }
  },
  data: {
    current: 0,
    active: '',
    swipeImages: [] as string[]
  },
  mounted() {
    const { images } = this.properties
    const swipeImages: any = []
    images.forEach(i => swipeImages.push(...i.images))
    this.setData({
      swipeImages,
      active: images[0].name
    })
  },
  methods: {
    toggleType({ currentTarget: { dataset } }) {
      const current = dataset.index || 0
      this.setData({ current })
    },
    onSwipeChange({ detail: { current } }) {
      const { images } = this.properties
      const { swipeImages } = this.data
      const image = swipeImages[current]
      const target = images.find(item => item.images.includes(image))
      this.setData({
        current,
        active: target.name
      })
    },
    onImagePreview({ currentTarget: { dataset } }) {
      const { swipeImages } = this.data
      const current = dataset.url || swipeImages[0]
      wx.previewImage({
        current,
        urls: swipeImages,
        fail() {
          wx.showToast({ title: '预览图片失败', icon: 'none' })
        }
      })
    }
  }
})
