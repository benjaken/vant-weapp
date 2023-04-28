<script setup lang="ts">
import VanCheckButton from "..";
import { ref } from "vue";
import { useTranslate } from "../../../docs/site";
import { showToast } from "../../toast";

const t = useTranslate({
  "zh-CN": {
    text: "当前值：",
    title1: "基本用法",
    title2: "圆角",
    title3: "禁用状态",
    title4: "多列用法",
    title5: "一行滑动模式",
    title6: "单选模式",
    title7: "返回序号",
  },
  "en-US": {
    text: "Current value: ",
    title1: "Basic Usage",
    title2: "Round",
    title3: "Disabled",
    title4: "Multi-column",
    title5: "Horizon",
    title6: "Single Select",
    title7: "Need Index",
  },
});
const value1 = ref(["apple", "pear"]);
const value2 = ref(["apple", "pear"]);
const value3 = ref(["apple", "pear"]);
const value4 = ref(["apple", "pear"]);
const value5 = ref(["apple", "pear"]);
const value6 = ref(["apple"]);
const value7 = ref([0, 1]);
const options = ref([
  {
    value: "apple",
    text: "苹果",
  },
  {
    value: "pear",
    text: "梨子",
  },
  {
    value: "orange",
    text: "橘子",
  },
  {
    value: "watermelon",
    text: "西瓜",
  },
  {
    value: "peach",
    text: "桃子",
  },
  {
    value: "banana",
    text: "香蕉",
  },
  {
    value: "pitaya",
    text: "火龙果",
  },
  {
    value: "grape",
    text: "葡萄",
  },
  {
    value: "strawberry",
    text: "草莓",
  },
  {
    value: "cherry",
    text: "樱桃",
  },
]);

const onChange = (value: string) => showToast(t("text") + value);
</script>

<template>
  <demo-block card :title="t('title1')">
    <van-check-button v-model="value1" :options="options" @change="onChange" />
  </demo-block>

  <demo-block card :title="t('title2')">
    <van-check-button v-model="value2" :options="options" round @change="onChange" />
  </demo-block>

  <demo-block card :title="t('title3')">
    <van-check-button v-model="value3" :options="options" disabled @change="onChange" />
  </demo-block>

  <demo-block card :title="t('title4')">
    <van-check-button v-model="value4" :options="options" :row="3" @change="onChange" />
  </demo-block>

  <demo-block card :title="t('title5')">
    <van-check-button v-model="value5" :options="options" horizon @change="onChange" />
  </demo-block>

  <demo-block card :title="t('title6')">
    <van-check-button v-model="value6" :options="options" single @change="onChange" />
  </demo-block>

  <demo-block card :title="t('title7')">
    <van-check-button v-model="value7" :options="options" need-index @change="onChange" />
  </demo-block>
</template>
