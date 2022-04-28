import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
    name: '苹果',
    starLevel: 4,
    organName: '成宏地产',
    branchName: '福虹分公司',
    dealMessage: '3个月内在您所在区域成交2套',
    tags: ['高星级人员', '年度人员'],
    dealCount: 5,
    commentPoint: 3.7,
    practiceYear: 2,
    coordinate: [114.084292027219, 22.537485568217],
    distanceString: '1.7km'
  },
  methods: {
    onClick() {
      wx.showToast({ title: '触发点击', icon: 'none' })
    },
    onClickChat() {
      wx.showToast({ title: '触发点击聊天事件', icon: 'none' })
    }
  },
});
