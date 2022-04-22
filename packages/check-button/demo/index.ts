import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    checkbutton1: ['苹果', '梨'],
    checkbutton2: ['苹果', '梨'],
    checkbutton3: ['苹果', '梨'],
    checkbutton4: ['苹果', '梨'],
    checkbutton5: ['苹果'],
    checkbutton6: [0, 1],
    options: ['苹果', '梨', '葡萄', '芒果', '火龙果']
  },

  methods: {
    onChange({ currentTarget, detail }) {
      const { key } = currentTarget.dataset;
      this.setData({
        [key]: detail
      });
    }
  },
});
