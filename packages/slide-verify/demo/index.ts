import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {},
  methods: {
    reset() {
      this.selectComponent('.verify').reset();
    },
    onSuccess() {
      Toast({
        context: this,
        message: '验证成功',
      })
    },
    onError() {
      Toast({
        context: this,
        message: '验证失败',
      })
    }
  },
});
