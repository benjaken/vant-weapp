/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2022-06-01 15:23:39
 * @LastEditors: chenzh chenzh@szfdc.net.cn
 * @LastEditTime: 2023-03-27 11:06:58
 * @Description: 
 * 
 * Copyright (c) 2023 by 深圳市优房网络有限公司 All Rights Reserved. 
 */
import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    keyboard: false,
    value: '123'
  },
  methods: {
    showKeyboard() {
      this.setData({
        keyboard: true
      })
    },
    closeKeyboard() {
      this.setData({
        keyboard: false
      })
    },
    onFieldChange({ detail }) {
      this.setData({
        value: detail
      })
    },
    onInput({ detail }) {
      this.setData({
        value: detail,
        errorInfo: detail.length === 6 && detail !== '123456' ? '密码错误' : ''
      })
    },
    onComplete({ detail }) {
      Toast({
        context: this,
        message: `已输入: ${detail}`,
      })
    }
  }
});
