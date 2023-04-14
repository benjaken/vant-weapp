<script setup lang="ts">
import VanField from "..";
import VanCellGroup from "../../cell-group";
import { ref } from "vue";
import { useTranslate } from "../../../docs/site";

const t = useTranslate({
  "zh-CN": {
    mobile: "手机号",
    mobilePlaceholder: "请输入手机号",
    idCard: "身份证号",
    idCardPlaceholder: "请输入身份证号",
    area: "面积",
    areaPlaceholder: "请输入面积",
    showTip: "带输入提示",
  },
  "en-US": {
    mobile: "Mobile",
    mobilePlaceholder: "Please Enter Mobile",
    idCard: "ID Card",
    idCardPlaceholder: "Please Enter ID Card",
    area: "Area",
    areaPlaceholder: "Please Enter Area",
    showTip: "Show Tip",
  },
});

const phone = ref("");
const idCard = ref("");
const area = ref("");
</script>

<template>
  <demo-block :title="t('showTip')">
    <van-cell-group inset>
      <van-field
        type="number"
        v-model="phone"
        clearable
        :label="t('mobile')"
        :placeholder="t('mobilePlaceholder')"
        maxlength="11"
        tip-type="mobile"
      />
      <van-field
        v-model="idCard"
        clearable
        :label="t('idCard')"
        :placeholder="t('idCardPlaceholder')"
        maxlength="18"
        tip-type="idcard"
      />
      <van-field
        type="digit"
        v-model="area"
        clearable
        :label="t('area')"
        :placeholder="t('areaPlaceholder')"
        show-tip
        tip-unit="㎡"
        input-align="right"
      >
        <template #right-icon>
          <span>㎡</span>
        </template>
      </van-field>
    </van-cell-group>
  </demo-block>
</template>
