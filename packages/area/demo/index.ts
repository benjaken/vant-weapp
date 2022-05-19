import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';
import { areaList } from './area'

VantComponent({
  data: {
    areaList,
    loading: false,
    value: 440304,
  },

  methods: {
    onChange(event) {
      const { values } = event.detail;

      Toast({
        context: this,
        message: values.map((item) => item.name).join('-'),
      });
    },

    onConfirm(event) {
      console.log(event);
    },

    onCancel(event) {
      console.log(event);
    },
  },
});
