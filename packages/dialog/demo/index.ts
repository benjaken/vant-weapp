import { VantComponent } from '../../common/component';
import Dialog, { Action } from '../../dialog/dialog';

const message = '代码是写出来给人看的，附带能在机器上运行';

VantComponent({
  data: {
    show: false,
  },

  methods: {
    showCustomDialog() {
      this.setData({ show: true });
    },

    getUserInfo(event) {
      console.log(event.detail);
    },

    onClickThemeAlert() {
      Dialog.alert({
        context: this,
        title: '标题',
        theme: 'round-button',
        message,
      });
    },

    onClickThemeAlert2() {
      Dialog.alert({
        context: this,
        theme: 'round-button',
        message,
      });
    },

    onClickAlert() {
      Dialog.alert({
        context: this,
        title: '标题',
        message,
      });
    },

    onClickAlert2() {
      Dialog.alert({
        context: this,
        message,
      });
    },

    onClickConfirm() {
      Dialog.confirm({
        context: this,
        title: '标题',
        message,
      });
    },

    async showMoreDialog() {
      await Dialog.confirm({
        context: this,
        title: '标题',
        message,
        moreButtons: [
          {
            text: '按钮1',
            color: '#1989fa',
          },
          {
            text: '按钮2',
            color: '#1989fa',
          },
        ]
      })
      await Dialog.confirm({
        context: this,
        title: '改为机构代支付失败',
        message: '未查询到您的所属机构，请先加入您的就职机构。',
        confirmButtonText: '我知道了',
        showCancelButton: false
      })
    },

    onClickAsyncClose() {
      const beforeClose = (action: Action): Promise<boolean> =>
        new Promise((resolve) => {
          setTimeout(() => {
            if (action === 'confirm') {
              resolve(true);
            } else {
              // 拦截取消操作
              resolve(false);
            }
          }, 1000);
        });

      Dialog.confirm({
        context: this,
        title: '标题',
        message,
        beforeClose,
      });
    },

    onClose() {
      this.setData({
        show: false,
      });
    },
  },
});
