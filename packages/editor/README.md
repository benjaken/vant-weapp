# Editor 编辑器

### 介绍

文本编辑器

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)。

```json
"usingComponents": {
  "van-editor": "@vant/weapp/editor/index"
}
```

## 代码演示

### 基础用法

```html
<van-editor value="{{ val }}" placeholder="请输入说明" mode="editor" data-key="editor1" bind:change="onChange"></van-editor>
```

```js
Page({
  data: {
    editor1: ''
  },

  onChange({ currentTarget, detail }) {
    const { key } = currentTarget.dataset;
    this.setData({
      [key]: detail
    });
  }
});
```

## API

### CheckButton Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | textarea的name | _String_ | '' |
| title | 编辑器的标题 | _String_ | '' |
| value | 编辑器的值 | _String_ | '' |
| required | 是否为必填模式 | _boolean_ | `false` |
| hideCount | 隐藏字数统计 | _boolean_ | `false` |
| showText | 显示为文本模式 | _boolean_ | `false` |
| background | 显示背景色 | _boolean_ | `false` |
| field | 显示为cell样式 | _boolean_ | `false` |
| mode | 编辑器模式，可为`textarea`、`editor` | _boolean_ | `textarea` |
| maxlength | 最长字数长度 | _number_ | `500` |
| placeholder | 编辑器默认显示 | _string_ | '' |

### CheckButton Event

| 事件名      | 说明                     | 回调参数     |
| ----------- | ------------------------ | ------------ |
| bind:change | 当绑定值变化时触发的事件 | 当前组件的值 |
