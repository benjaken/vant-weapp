/*
 * @Author: chenzh chenzh@szfdc.net.cn
 * @Date: 2022-06-01 15:23:39
 * @LastEditors: chenzh chenzh@szfdc.net.cn
 * @LastEditTime: 2022-11-11 16:54:13
 * @Description: 
 * 
 * Copyright (c) 2022 by 深圳市优房网络有限公司 All Rights Reserved. 
 */
import { VantComponent } from '../common/component';
import { GREEN, GRAY_DARK } from '../common/color';

VantComponent({
  classes: ['desc-class'],

  props: {
    icon: String,
    steps: Array,
    active: Number,
    direction: {
      type: String,
      value: 'horizontal',
    },
    activeColor: {
      type: String,
      value: GREEN,
    },
    inactiveColor: {
      type: String,
      value: GRAY_DARK,
    },
    activeIcon: {
      type: String,
      value: 'checked',
    },
    reverse: {
      type: Boolean,
      value: false,
    },
    inactiveIcon: String,
  },
  methods: {
    onClick(event: WechatMiniprogram.TouchEvent) {
      const { index } = event.currentTarget.dataset;
      this.$emit('click-step', index);
    },
		onToggle({ currentTarget: { dataset } }) {
			const { steps } = this.data
			const { showMore = false } = steps[dataset.index]
			steps[dataset.index].showMore = !showMore
			this.setData({ steps })
		}
  }
});
