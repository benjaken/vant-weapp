import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    value: '',
  },

  created() {
    const { theme } = wx.getSystemInfoSync();
    this.setData({ theme })
  },

  methods: {
    onChange(e) {
      this.setData({
        value: e.detail,
      });
    },

    onSearch() {
      if (this.data.value) {
        wx.showToast({
          title: '搜索：' + this.data.value,
          icon: 'none',
        });
      }
    },

    onClick() {
      if (this.data.value) {
        wx.showToast({
          title: '搜索：' + this.data.value,
          icon: 'none',
        });
      }
    },

    onCancel() {
      wx.showToast({
        title: '取消',
        icon: 'none',
      });
    },

    onClear() {
      wx.showToast({
        title: '清空',
        icon: 'none',
      });
    },
  },
});
