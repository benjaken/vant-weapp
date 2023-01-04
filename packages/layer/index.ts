import { VantComponent } from '../common/component';

VantComponent({
  props: {
    show: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '',
    },
    content: {
      type: String,
      value: '',
    },
    useButtonSlot: Boolean,
    closePosition: {
      type: String,
      value: 'bottom',
    },
    showButton: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 3000,
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    closeOverlay() {
      this.setData({
        show: false,
      });
      this.$emit('close');
    },
    onClick() {
      if (this.data.closeOnClickOverlay) {
        this.closeOverlay();
      }
    },
  },
});
