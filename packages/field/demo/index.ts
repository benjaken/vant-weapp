import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    sms: '',
    value: '',
    password: '',
    username: '',
    username2: '',
    username3: '',
    message: '',
    phone: '',
    idCard: '',
    area: '',
    phone1: '1365577',
  },

  methods: {
    onClickIcon() {
      wx.showToast({
        icon: 'none',
        title: '点击图标',
      });
    },
  },
});
