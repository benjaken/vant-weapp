import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    keyboard1: true,
    keyboard2: false,
    keyboard3: false,
    keyboard4: false,
    keyboard5: false,
    keyboard6: false,
    keyboard7: false,
    value: ''
  },
  methods: {
    showKeyboard({ target: { dataset } }) {
      this.setData({
        [dataset.id]: true
      })
    },
    onInput({ detail }) {
      Toast({
        context: this,
        message: `输入: ${detail}`,
      });
    },
    onDelete() {
      Toast({
        context: this,
        message: `删除`,
      });
    },
    onValueInput({ detail }) {
      this.setData({
        value: detail
      })
    },
  }
});
