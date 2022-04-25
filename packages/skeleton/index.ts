import { VantComponent } from '../common/component';

VantComponent({
  props: {
    data: {
			type: Object,
			value: {}
		},
		isDev: {
			type: Boolean,
			value: false
		},
		selector: {
			type: String,
			value: 'skeleton'
		},
		bgcolor: {
			type: String,
			value: '#f2f2f2'
		},
		loading: {
			type: String,
			value: 'shine'
		}
  },
  data: {
		isShowByDev: false,
		devData: null,
		skeletonWidth: 375,
		skeletonHeight: 667,
		selectorTypes: ['bg', 'rect', 'circle']
	},
  created() {
		// 默认的首屏宽高，防止内容闪现
		const { windowHeight } = wx.getSystemInfoSync()
		this.setData({
			skeletonHeight: windowHeight
		})
	},
  methods: {
		handleToggleShow({ detail }) {
			this.setData({
				isShowByDev: detail
			})
		},
		handleUpdateData({ detail }) {
			this.setData({
				devData: detail
			})
		}
	}
});
