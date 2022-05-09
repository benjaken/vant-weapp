import { VantComponent } from '../common/component';

VantComponent({
  props: {
    content: String,
    color: {
      type: String,
      value: "#ee0a24"
    },
    dot: Boolean,
    max: Number,
    position: {
      type: String,
      value: 'top-right'
    },
    useContentSlot: Boolean
  },
})