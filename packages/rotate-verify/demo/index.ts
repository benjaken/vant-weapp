import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    verify1: false,
    verify2: false
  },
  methods: {
    openVerify({ currentTarget }) {
      const { id } = currentTarget.dataset;
      this.setData({
        [id]: true
      })
    },
    onSuccess({ currentTarget }) {
      const self = this
      const { id } = currentTarget.dataset;
      Toast({
        context: this,
        message: '验证成功',
        onClose() {
          self.setData({
            [id]: false
          })
        },
      })
    },
    onError() {
      Toast({
        context: this,
        message: '验证失败'
      })
    }
  },
});
