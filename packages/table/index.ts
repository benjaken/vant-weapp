import { VantComponent } from '../common/component';

VantComponent({
  props: {
    fixed: Boolean,
    loading: Boolean,
    zebra: Boolean,
    data: Array,
    columns: Array,
    height: {
      type: Number,
      value: 200,
    }
  },
});
