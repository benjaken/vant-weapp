import { VantComponent } from '../../common/component';

interface data {
  name: string
  age: number
  address: string
}

VantComponent({
  data: {
    data: [{
      name: '张三',
      age: 18,
      address: '北京市朝阳区XX花园5栋',
    }, {
      name: '李四',
      age: 20,
      address: '北京市朝阳区XX花园5栋',
    }, {
      name: '王五',
      age: 22,
      address: '北京市朝阳区XX花园5栋',
    }, {
      name: '赵六',
      age: 24,
      address: '北京市朝阳区XX花园5栋',
    }] as data[],
    columns: [{
      title: '姓名',
      field: 'name',
    }, {
      title: '年龄',
      field: 'age',
    }, {
      title: '住址',
      field: 'address',
    }],
    asyncData: [] as data[],
    loading: true
  },
  mounted() {
    setTimeout(() => {
      this.setData({
        asyncData: this.data.data,
        loading: false
      })
    }, 1000)
  },
});
