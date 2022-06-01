import { VantComponent } from '../common/component';

VantComponent({
  props: {
    scrollY: {
			type: Boolean,
			value: true
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
		customStyle: {
			type: String,
			value: ''
		}
  },
  methods: {
		onScroll({ detail }) {
			this.$emit('scroll', detail)
		},
		onReachBottom({ detail }) {
      if (this.properties.loading || this.properties.finished) return
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