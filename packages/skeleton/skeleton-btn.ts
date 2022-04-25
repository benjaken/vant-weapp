import { getScrollOffset, getAllRect } from '../common/utils';
import { VantComponent } from '../common/component';

VantComponent({
	props: {
		isShow: {
			type: Boolean,
			value: false
		},
		selector: {
			type: String
		},
		selectorTypes: {
			type: Array
		}
	},
	data: {
		physicalRadio: 2
	},
	created() {
		// 默认的首屏宽高，防止内容闪现
		const { windowWidth } = wx.getSystemInfoSync()
		this.setData({
			physicalRadio: 750 / windowWidth
		})
	},
	methods: {
		/**
		 * 按钮点击
		 */
		toggleBtnTap() {
			if (this.data.isShow) {
				this.triggerEvent('toggleShow', false)
				return
			}
			this.calcData().then(data => {
				this.print(data)
				this.triggerEvent('updateData', data)
				this.triggerEvent('toggleShow', true)
			})
		},
		print(data: { container: string; lists: { type: any; elements: any }[] }) {
			console.log(JSON.stringify(data, null, 2))
		},
		objToStyle(obj: { [x: string]: number; width?: any; height?: any; top?: any; left?: any }) {
			const { physicalRadio } = this.data
			return Object.keys(obj)
				.map(key => `${key}:${obj[key] * physicalRadio}rpx`)
				.join(';')
		},
		calcData() {
			return Promise.all([getScrollOffset(), getAllRect(this, `.${this.data.selector}`)]).then(
				([scrollOffset, [container]]) => {
					const { width, height, top, left } = container
					return this.calcStyleLists(container).then(lists => ({
						container: this.objToStyle({
							width,
							height,
							top: top + scrollOffset.scrollTop,
							left: left + scrollOffset.scrollLeft
						}),
						lists
					}))
				}
			)
		},
		calcStyleLists(container: { top: any; left: any; right: any; bottom: any }) {
			const { top, left, right, bottom } = container
			const { selector, selectorTypes } = this.data
			const promises = selectorTypes.map(type =>
				getAllRect(this, `.${selector}-${type}`)
					.then((elements: any[]) =>
						elements
							.filter(
								(vo: { left: number; right: number; top: number; bottom: number }) =>
									vo.left < right && vo.right > left && vo.top < bottom && vo.bottom > top
							)
							.map((vo: { width: number; height: number; left: number; top: number }) =>
								this.objToStyle({
									width: vo.width,
									height: vo.height,
									left: vo.left - left,
									top: vo.top - top
								})
							)
					)
					.then((elements: any) => ({
						type,
						elements
					}))
			)
			return Promise.all(promises)
		}
	}
})
