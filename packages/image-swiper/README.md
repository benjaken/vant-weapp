# ImageSwiper 图片轮播

### 介绍

用于循环播放一组图片。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-image-swiper": "@vant/weapp/image-swiper/index"
}
```

## 代码演示

### 基础用法

通过`value`绑定复选框的勾选状态。

```html
<van-image-swiper images="{{images}}" show-toggle />
```

```js
Page({
  data: {
    images: [{
      label: '分组1',
      name: 'group1',
      images: ['https://img.yzcdn.cn/vant/leaf.jpg', 'https://img.yzcdn.cn/vant/tree.jpg']
    }, {
      label: '分组2',
      name: 'group2',
      images: ['https://img.yzcdn.cn/vant/sand.jpg']
    }, {
      label: '分组3',
      name: 'group3',
      images: ['https://img.yzcdn.cn/vant/cat.jpeg']
    }]
  }
});
```

## API

### ImageSwiper Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| images | 轮播的图片 | _SwipperItem[]_ | [] |
| autoplay | 是否自动播放 | _boolean_ | `false` |
| interval | 自动播放时间间隔 | _number_ | `5000` |
| circular | 是否采用衔接滑动 | _boolean_ | `false` |
| vertical | 滑动方向是否为纵向 | _boolean_ | `false` |
| showToggle | 是否展示切换分组按钮 | _boolean_ | `false` |
| showIndicator | 是否展示图片分页 | _boolean_ | `true` |
| indicatorColor | 指示器背景色 | _string_ | `rgba(0, 0, 0, 0.2)` |
| indicatorTextColor | 指示器文字颜色 | _string_ | `#fff` |

### SwipperItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| images | 轮播的图片 | _Array_ | [] |
| name | 分组name | _string_ | '' |
| label | 分组名称 | _string_ | '' |

### CheckButton Event

| 事件名      | 说明                     | 回调参数     |
| ----------- | ------------------------ | ------------ |
| bind:change | 当绑定值变化时触发的事件 | 当前组件的值或序号 |