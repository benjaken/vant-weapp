# CheckButton check button

### introduce

Perform multiple selection or single selection in a group of options, and return the corresponding value or sequence number.

### import

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { CheckButton } from 'vant';

const app = createApp();
app.use(CheckButton);
```

## Usage

### Basic Usage

Bind the checked state of the checkbox by `value`.

```html
<van-check-button v-model="value" :options="options" @change="onChange" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const value = ref(['apple', 'pear']);
    const options = ref(['Apple', 'Pear', 'Grape', 'Mango', 'Dragon Fruit']);
    const onChange = (value) => showToast('The current value:' + value);
    return {
      value,
      onChange,
    };
  },
};
```

### Multi-column usage

The number of displayed columns is controlled by `row`, and it is invalid when the row sliding mode `horizon=true` is enabled

```html
<van-check-button v-model="value" :options="options" row="3" @change="onChange" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const value = ref(['apple', 'pear']);
    const options = ref(['Apple', 'Pear', 'Grape', 'Mango', 'Dragon Fruit']);
    const onChange = (value) => showToast('The current value:' + value);
    return {
      value,
      onChange,
    };
  },
};
```

### Horizon

Use `horizon` to control whether to enable a row of sliding mode

```html
<van-check-button v-model="value" :options="options" horizon @change="onChange" />
```

```js
import { ref } from 'vue';
import { showToast } from 'vant';

export default {
  setup() {
    const value = ref(['apple', 'pear']);
    const options = ref(['Apple', 'Pear', 'Grape', 'Mango', 'Dragon Fruit']);
    const onChange = (value) => showToast('The current value:' + value);
    return {
      value,
      onChange,
    };
  },
};
```

## API

### Props

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| options | options | _Array_ | [] |
| value | currently selected value | _Array_ | [] |
| single | Whether it is a single selection state | _boolean_ | `false` |
| disabled | Whether to disable the radio button | _boolean_ | `false` |
| horizon | Whether a row is in horizontal sliding mode | _boolean_ | `false` |
| needIndex | Whether to return the corresponding serial number | _boolean_ | `false` |
| row | display in several columns, invalid when `horizon=true` | _number_ | `2` |

### Events

| Event Name | Description | Callback Parameters |
| ----------- | ------------------------ | ------------ |
| change | event triggered when the bound value changes | the value or serial number of the current component |

### Types

The component exports the following type definitions:

```ts
import type { CheckButtonProps } from 'vant';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
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
