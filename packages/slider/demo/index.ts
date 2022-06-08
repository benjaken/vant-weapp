import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    currentValue: 50,
    range: [ 20, 60 ],
    showVerify: false
  },

  methods: {
    openPopup() {
      this.setData({
        showVerify: true
      })
    },
    onChange(event) {
      wx.showToast({
        icon: 'none',
        title: `当前值：${event.detail}`,
      });
    },

    onCustomRangeChange({detail}) {
      this.setData({
        range: detail
      })
    },

    onDrag(event) {
      this.setData({
        currentValue: event.detail.value,
      });
    },
  },
});
