import { VantComponent } from '../common/component';

VantComponent({
  props: {
    options: {
      type: Array,
      value: [],
    },
    value: {
      type: Array,
      value: [],
    },
    round: {
      type: Boolean,
      value: false,
    },
		single: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    horizon: {
			type: Boolean,
			value: false,
    },
    row: {
      type: Number,
      value: 2,
    },
    needIndex: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    selectItem({ target }) {
      const { item } = target.dataset;
      let { value } = this.properties;
      const { single, disabled } = this.properties;
			if (!disabled) {
				if (value.indexOf(item) > -1) {
					value = single ? value : value.filter((v: string) => v !== item);
				} else if (single) {
					value = [item];
				} else {
					value.push(item);
				}
				this.setData({ value });
				this.$emit('change', value);
			}
    },
  }
});
