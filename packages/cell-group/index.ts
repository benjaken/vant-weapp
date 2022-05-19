import { VantComponent } from '../common/component';

VantComponent({
  props: {
    title: String,
    tip: String,
    border: {
      type: Boolean,
      value: true,
    },
    inset: Boolean,
  },
});
