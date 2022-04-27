import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    layer1: false,
    layer2: false,
    layer3: false,
  },
  methods: {
    showLayer({ currentTarget }) {
      const { key } = currentTarget.dataset;
      this.setData({
        [`layer${key}`]: true
      });
    },
    closeLayer({ currentTarget }) {
      const { key } = currentTarget.dataset;
      this.setData({
        [`layer${key}`]: false
      });
    },
  },
});
