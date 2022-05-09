import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    keyboard: true,
    value: '123'
  },
  methods: {
    showKeyboard() {
      this.setData({
        keyboard: true
      })
    },
    closeKeyboard() {
      this.setData({
        keyboard: false
      })
    },
    onInput({ detail }) {
      this.setData({
        value: detail,
        errorInfo: detail.length === 6 && detail !== '123456' ? '密码错误' : ''
      })
    },
    onComplete({ detail }) {
      Toast({
        context: this,
        message: `已输入: ${detail}`,
      })
    }
  }
});
