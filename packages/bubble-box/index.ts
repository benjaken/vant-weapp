import { VantComponent } from '../common/component';

VantComponent({
  props: {
    position: {
      type: String,
      value: 'top',
    },
    text: String,
  },
  data: {
    show: false,
  },
  methods: {
    showBubble() {
      this.setData({
        show: true,
      });
      setTimeout(() => {
        this.setData({
          animationData: wx
            .createAnimation({
              duration: 500,
              timingFunction: 'ease',
              delay: 0,
            })
            .opacity(1)
            .step()
            .export(),
        });
      }, 0);
    },
    hideBubble() {
      this.setData({
        show: false,
      });
      setTimeout(() => {
        this.setData({
          animationData: wx
            .createAnimation({
              duration: 500,
              timingFunction: 'ease',
              delay: 0,
            })
            .opacity(0)
            .step()
            .export(),
        });
      }, 0);
    },
  },
});
