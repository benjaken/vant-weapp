import { VantComponent } from '../../common/component';
import options from './options';

VantComponent({
  data: {
    area1: '',
    cascader1: false,
    options,
    area2: '',
    cascader2: false,
    loading: false,
    asyncOptions: [
      {
        text: '浙江省',
        value: '330000',
        children: [] as {
          text: string
          value: string
        }[],
      },
    ],
    customOptions: [
      {
        name: '浙江省',
        code: '330000',
        items: [{ name: '杭州市', code: '330100' }],
      },
      {
        name: '江苏省',
        code: '320000',
        items: [{ name: '南京市', code: '320100' }],
      },
    ],
    fieldNames: {
      text: 'name',
      value: 'code',
      children: 'items',
    }
  },
  methods: {
    showCascader({ target: { dataset } }) {
      this.setData({
        [dataset.id]: true,
      });
    },
    onChange({ detail: { value } }) {
      const { asyncOptions } = this.data;
      if (value === asyncOptions[0].value) {
        this.setData({
          loading: true
        });
        setTimeout(() => {
          asyncOptions[0].children = [
            { text: '杭州市', value: '330100' },
            { text: '宁波市', value: '330200' },
          ];
          this.setData({
            asyncOptions,
            loading: false
          });
        }, 1000);
      }
    },
    onFinish({ detail: { selectedOptions }, target: { dataset } }) {
      const value = selectedOptions.map((item) => item.text).join('/');
      this.setData({
        [dataset.id]: value,
      });
    },
    onFinish1({ detail: { selectedOptions } }) {
      const value = selectedOptions.map((item) => item.name).join('/');
      this.setData({
        area4: value,
      });
    },
  },
});
