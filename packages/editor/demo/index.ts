import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    editor1: '',
    editor2: '',
    editor3: '测试文本测试文本测试文本测试文本<p style="color:red">测试文本</p><p><a href="https://www.baidu.com" style="color:blue">链接</a></p>',
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
