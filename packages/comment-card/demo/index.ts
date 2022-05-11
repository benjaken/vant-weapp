import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
    name: '苹果',
    time: '2020-01-01 12:00:00',
    point: 4,
    content: '服务周到，点赞！！！！！！！！！',
    fileList: [{
      url: 'https://img01.yzcdn.cn/vant/leaf.jpg',
      name: '叶子',
      type: 'image'
    }, {
      url: 'https://img01.yzcdn.cn/vant/sand.jpg',
      name: '沙子',
      type: 'image'
    }],
    like: true,
    likeCount: 10,
    commentCount: 99
  },
  methods: {
    onClickLike() {
      wx.showToast({ title: '触发点击喜欢事件', icon: 'none' })
    },
    onClickComment() {
      wx.showToast({ title: '触发点击评论事件', icon: 'none' })
    }
  },
});
