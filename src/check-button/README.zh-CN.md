# CheckButton 复选按钮

### 介绍

在一组备选项中进行多选或单选，返回对应值或序号。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { CheckButton } from 'vant';

const app = createApp();
app.use(CheckButton);
```

## 代码演示

### 基础用法

通过`value`绑定复选框的勾选状态。

```html
<van-check-button v-model="value" :options="options" @change="onChange" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const value = ref(['苹果', '梨']);
    const options = ref(['苹果', '梨', '葡萄', '芒果', '火龙果']);
    const onChange = (value) => showToast('当前值：' + value);
    return {
      value,
      onChange,
    };
  },
};
```

### 多列用法

通过`row`控制展示的列数，开启一行滑动模式`horizon=true`时无效

```html
<van-check-button v-model="value" :options="options" row="3" @change="onChange" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const value = ref(['苹果', '梨']);
    const options = ref(['苹果', '梨', '葡萄', '芒果', '火龙果']);
    const onChange = (value) => showToast('当前值：' + value);
    return {
      value,
      onChange,
    };
  },
};
```

### 一行滑动模式

通过`horizon`控制是否开启一行滑动模式

```html
<van-check-button v-model="value" :options="options" horizon @change="onChange" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const value = ref(['苹果', '梨']);
    const options = ref(['苹果', '梨', '葡萄', '芒果', '火龙果']);
    const onChange = (value) => showToast('当前值：' + value);
    return {
      value,
      onChange,
    };
  },
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 备选项 | _Array_ | [] |
| value | 当前选中的值 | _Array_ | [] |
| single | 是否为单选状态 | _boolean_ | `false` |
| disabled | 是否禁用单选框 | _boolean_ | `false` |
| horizon | 是否一行水平滑动模式 | _boolean_ | `false` |
| needIndex | 是否返回对应的序号 | _boolean_ | `false` |
| row | 分为几列展示，`horizon=true`时无效 | _number_ | `2` |

### Events

| 事件名      | 说明                     | 回调参数     |
| ----------- | ------------------------ | ------------ |
| change | 当绑定值变化时触发的事件 | 当前组件的值或序号 |

### 类型定义

组件导出以下类型定义：

```ts
import type { CheckButtonProps } from 'vant';
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                    | 默认值                         | 描述 |
| -------------------------------------- | ------------------------------ | ---- |
| --van-check-button-height              | _30px_                         | -    |
| --van-check-button-border-radius       | _var(--van-border-radius-md)_  | -    |
| --van-check-button-font-size           | _var(--van-font-size-md)_      | -    |
| --van-check-button-color               | _var(--van-text-color)_        | -    |
| --van-check-button-background          | _var(--van-gray-2)_            | -    |
| --van-check-button-active-background   | _var(--van-primary-color)_     | -    |
| --van-check-button-active-color        | _var(--van-white)_             | -    |
| --van-check-button-disabled-background | _var(--van-gray-3)_            | -    |
| --van-check-button-width               | _80px_                         | -    |
| --van-check-button-margin-right        | _2%_                           | -    |
| --van-check-button-horizon-margin-right| _16px_                         | -    |
| --van-check-button-margin-bottom       | _10px_                         | -    |
