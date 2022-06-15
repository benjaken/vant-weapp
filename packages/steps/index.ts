import { VantComponent } from '../common/component';
import { ORANGE, GRAY_DARK } from '../common/color';

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
      value: ORANGE,
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
