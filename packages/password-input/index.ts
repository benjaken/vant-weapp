import { VantComponent } from '../common/component';

VantComponent({
  props: {
    value: {
      type: String,
      value: '',
      observer(val) {
        if (val.length > this.properties.length) {
          this.setData({
            value: val.slice(0, this.properties.length),
          })
        } else if (val.length === this.properties.length) {
          this.$emit('complete', val);
        }
      }
    },
    info: String,
    errorInfo: String,
    length: {
      type: Number,
      value: 6
    },
    gutter: {
      type: Number,
      value: 0
    },
    mask: {
      type: Boolean,
      value: true,
    },
    focused: Boolean,
    theme: {
      type: String,
      value: 'square'
    },
  },
  methods: {
    onFocus() {
      this.$emit('focus')
    }
  }
});
