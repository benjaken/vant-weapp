import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    detail: ''
  },

  methods: {
    onFinish({ detail }) {
      this.setData({
        detail
      })
    },
  },
});
