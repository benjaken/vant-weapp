import { VantComponent } from '../common/component';

VantComponent({
  props: {
    value: {
      type: String,
      value: '',
      observer(val) {
        if (val.length > this.properties.length) {
          const value = val.slice(0, this.properties.length);
          this.setData({ value });
        } else if (val.length === this.properties.length) {
          this.$emit('complete', val);
        }
      },
    },
    info: String,
    errorInfo: String,
    length: {
      type: Number,
      value: 6,
    },
    gutter: {
      type: Number,
      value: 0,
    },
    mask: {
      type: Boolean,
      value: true,
    },
    theme: {
      type: String,
      value: 'square',
    },
    background: {
      type: String,
      value: '#fff',
    },
    gutterRadius: {
      type: String,
      value: '0',
    },
  },
  data: {
    focused: false,
  },
  methods: {
    onFocus() {
      this.$emit('focus');
      this.setData({ focused: true });
    },
    onInput({ detail }) {
      this.$emit('change', detail.value);
    },
    onInputFocus() {
      this.setData({ focused: true });
    },
    onInputBlur() {
      this.setData({ focused: false });
    },
    focus() {
      this.setData({ focused: true });
    }
  },
});
