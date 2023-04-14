<!--
 * @Author: chenzh chenzh@szfdc.net.cn
 * @Date: 2023-04-10 14:27:28
 * @LastEditors: chenzh chenzh@szfdc.net.cn
 * @LastEditTime: 2023-04-14 15:55:17
 * @FilePath: /vant/packages/vant/src/field/demo/CustomType.vue
 * @Description: 
 * Copyright (c) 2023 by 深圳市优房网络有限公司, All Rights Reserved. 
-->
<script setup lang="ts">
import VanField from "..";
import VanForm from "../../form";
import VanCellGroup from "../../cell-group";
import { ref } from "vue";
import { useTranslate } from "../../../docs/site";

const t = useTranslate({
  "zh-CN": {
    text: "文本",
    digit: "整数",
    phone: "手机号",
    number: "数字",
    customType: "自定义类型",
    smsPlaceholder: "请输入短信验证码",
    textPlaceholder: "请输入文本",
    digitPlaceholder: "请输入整数",
    phonePlaceholder: "请输入手机号",
    numberPlaceholder: "请输入数字（支持小数）",
    passwordPlaceholder: "请输入密码",
  },
  "en-US": {
    text: "Text",
    digit: "Digit",
    phone: "Phone",
    number: "Number",
    customType: "Custom Type",
    smsPlaceholder: "SMS",
    textPlaceholder: "Text",
    digitPlaceholder: "Digit",
    phonePlaceholder: "Phone",
    numberPlaceholder: "Number",
    passwordPlaceholder: "Password",
  },
});

const text = ref("");
const phone = ref("");
const digit = ref("");
const number = ref("");
const password = ref("");
const passwordTip = ref([
  {
    text: "6-20位字符",
    reg: "^.{6,20}$",
  },
  {
    text: "只能包含大小写字母、数字以及标点符号（除空格）",
    reg: '^[a-zA-Z0-9!"#\$%&\(\)\*\+,\-\./:;<=>\?@\[\\\]\^_`\{\|\}\~]+$',
  },
  {
    text: "大写字母、小写字母、数字和标点符号至少包含2种",
    reg: '^(?=.*[A-Z])(?=.*[a-z0-9!"#\$%&\(\)\*\+,\-\./:;<=>\?@\[\\\]\^_`\{\|\}\~]).+$',
  },
]);
</script>

<template>
  <demo-block :title="t('customType')">
    <van-cell-group inset>
      <van-form>
        <van-field
          v-model="text"
          :label="t('text')"
          :placeholder="t('textPlaceholder')"
          autocomplete="off"
        />
        <van-field
          v-model="phone"
          type="tel"
          :label="t('phone')"
          :placeholder="t('phonePlaceholder')"
        />
        <van-field
          v-model="digit"
          type="digit"
          :label="t('digit')"
          :placeholder="t('digitPlaceholder')"
        />
        <van-field
          v-model="number"
          type="number"
          :label="t('number')"
          :placeholder="t('numberPlaceholder')"
        />
        <van-field
          v-model="password"
          type="password"
          :label="t('password')"
          :placeholder="t('passwordPlaceholder')"
          autocomplete="off"
          :password-tip="passwordTip"
        />
      </van-form>
    </van-cell-group>
  </demo-block>
</template>
