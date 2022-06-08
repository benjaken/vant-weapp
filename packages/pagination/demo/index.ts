import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    value: 1,
  },
  methods: {
    onChange({ detail }) {
      Toast({
        context: this,
        message: `页码已改变: ${detail}`,
      })
    },
  },
});
