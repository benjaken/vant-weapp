import { VantComponent } from '../../common/component';
import { getSystemInfoSync } from '../../common/utils';

VantComponent({
  data: {
    loading: false,
    finished: false,
    list: [] as number[],
    windowHeight: 1000
  },
  mounted() {
    this.renderList()
    const { windowHeight } = getSystemInfoSync()
    this.setData({ windowHeight })
  },
  methods: {
    renderList(refresh = false) {
      if (this.data.loading || this.data.finished) return
      const { list } = this.data
      if (list.length === 100) {
        this.setData({
          finished: true
        })
      } else {
        this.setData({
          loading: true
        })
        setTimeout(() => {
          this.setData({
            loading: false,
            list: (refresh ? [] : list).concat(Array.from({ length: 20 }, (_, i) => i + 1))
          })
          this.selectComponent('.demo-van-list').stopRefresh()
        }, 1000)
      }
    },
    onRefresh() {
      this.renderList(true)
    },
    onReachBottom() {
      this.renderList()
    }
  }
});
