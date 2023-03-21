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
    passwordTip: [{
      text: '6-20位字符',
      reg: '^.{6,20}$',
    }, {
      text: '只能包含大小写字母、数字以及标点符号（除空格）',
      reg: '^[a-zA-Z0-9!\"#\$%&\(\)\*\+,\-\./:;<=>\?@\[\\\]\^_`\{\|\}\~]+$',
    }, {
      text: '大写字母、小写字母、数字和标点符号至少包含2种',
      reg: '^(?=.*[A-Z])(?=.*[a-z0-9!\"#\$%&\(\)\*\+,\-\./:;<=>\?@\[\\\]\^_`\{\|\}\~]).+$',
    }],
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
