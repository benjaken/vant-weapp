export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: 'Youfang Weapp 组件库演示'
      };
    },
    ...options
  });
}
