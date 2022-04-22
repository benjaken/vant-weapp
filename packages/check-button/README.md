# CheckButton 复选按钮

### 介绍

在一组备选项中进行多选或单选，返回对应值或序号。

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-check-button": "@vant/weapp/check-button/index"
}
```

## 代码演示

### 基础用法

通过`value`绑定复选框的勾选状态。

```html
<van-check-button options="{{ options }}" value="{{ val }}" bind:change="onChange"></van-checkbox-button>
```

```js
Page({
  data: {
    val: ['苹果', '梨'],
    options: ['苹果', '梨', '葡萄', '芒果', '火龙果']
  },

  onChange(event) {
    this.setData({
      val: event.detail,
    });
  },
});
```

### 多列用法

通过`row`控制展示的列数，开启一行滑动模式`horizon=true`时无效

```html
<van-check-button options="{{ options }}" value="{{ val }}" row="3" bind:change="onChange"></van-checkbox-button>
```

```js
Page({
  data: {
    val: ['苹果', '梨'],
    options: ['苹果', '梨', '葡萄', '芒果', '火龙果']
  },

  onChange(event) {
    this.setData({
      val: event.detail,
    });
  },
});
```

### 一行滑动模式

通过`horizon`控制是否开启一行滑动模式

```html
<van-check-button options="{{ options }}" value="{{ val }}" horizon="{{true}" bind:change="onChange"></van-checkbox-button>
```

```js
Page({
  data: {
    val: ['苹果', '梨'],
    options: ['苹果', '梨', '葡萄', '芒果', '火龙果']
  },

  onChange(event) {
    this.setData({
      val: event.detail,
    });
  },
});
```

## API

### CheckButton Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 备选项 | _Array_ | [] |
| value | 当前选中的值 | _Array_ | [] |
| single | 是否为单选状态 | _boolean_ | `false` |
| disabled | 是否禁用单选框 | _boolean_ | `false` |
| horizon | 是否一行水平滑动模式 | _boolean_ | `false` |
| needIndex | 是否返回对应的序号 | _boolean_ | `false` |
| row | 分为几列展示，`horizon=true`时无效 | _number_ | `2` |

### CheckButton Event

| 事件名      | 说明                     | 回调参数     |
| ----------- | ------------------------ | ------------ |
| bind:change | 当绑定值变化时触发的事件 | 当前组件的值或序号 |