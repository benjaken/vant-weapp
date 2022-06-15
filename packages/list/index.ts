import { VantComponent } from '../common/component';

VantComponent({
  props: {
    scrollY: {
			type: Boolean,
			value: true
		},
		scrollTop: {
			type: Number,
			value: 0
		},
		height: {
			type: String,
			value: '100%'
		},
		loading: {
			type: Boolean,
			value: false
		},
		finished: {
			type: Boolean,
			value: false
		},
    loadMoreText: {
      type: String,
      value: '加载中...'
    },
    finishedText: {
      type: String,
      value: '没有更多了'
    },
		hideEnd: {
			type: Boolean,
			value: false
		},
		refresherEnabled: {
			type: Boolean,
			value: false
		},
		refresherDefaultStyle: {
			type: String,
			value: 'black'
		},
		refresherBackground: {
			type: String,
			value: '#f2f3f5'
		},
		toView: {
			type: String,
			value: ''
		},
		customStyle: {
			type: String,
			value: ''
		},
		reverse: {
			type: Boolean,
			value: false
		},
  },
  methods: {
		onScroll({ detail }) {
			this.$emit('scroll', detail)
		},
		onReachTop({ detail }) {
      if (this.properties.loading || this.properties.finished || !this.properties.reverse) return
			this.$emit('scrolltoupper', detail)
		},
		onReachBottom({ detail }) {
      if (this.properties.loading || this.properties.finished || this.properties.reverse) return
			this.$emit('scrolltolower', detail)
		},
		onRefresh() {
			this.setData({
				refresherTriggered: true
			})
			this.$emit('refresh')
		},
		stopRefresh() {
			this.setData({
				refresherTriggered: false
			})
		}
	}
})