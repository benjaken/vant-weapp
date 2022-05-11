import { VantComponent } from '../common/component';

VantComponent({
  props: {
    show: Boolean,
    title: String,
    value: String,
    theme: {
      type: String,
      value: 'default'
    },
    maxlength: {
      type: Number,
      value: 100
    },
    zIndex: {
      type: Number,
      value: 100,
    },
    closeButtonText: String,
    deleteButtonText: String,
    extraKey: null,
    randomKeyOrder: Boolean,
    password: Boolean,
    passwordInfo: String,
    passwordErrorInfo: String,
    round: {
      type: Boolean,
      value: false,
    },
    showDeleteKey: {
      type: Boolean,
      value: true,
    },
    hideOnClickOutside: {
      type: Boolean,
      value: true,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    keys: [] as string[],
    value: ''
  },
  mounted() {
    const { theme, showDeleteKey, randomKeyOrder } = this.properties
    let { extraKey } = this.properties
    let keys: string[] = []
    extraKey = extraKey ? (Array.isArray(extraKey) ? extraKey : [extraKey]) : []
    let origin = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (randomKeyOrder) {
      origin = origin.sort(() => Math.random() > 0.5 ? -1 : 1)
    }
    if (theme === 'custom') {
      keys = [...origin]
      if (extraKey.length === 1) {
        keys.push(...['0', extraKey[0]])
      } else if (extraKey.length === 2) {
        keys.push(...[extraKey[1], '0', extraKey[0]])
      } else {
        keys.push(...['0'])
      }
      this.setData({ keys })
    } else {
      keys = [...origin, (extraKey.length === 1 ? extraKey[0] : 'collapse'), '0']
      if (showDeleteKey) keys.push('delete')
      this.setData({
        keys,
        value: this.properties.value
      })
    }
  },
  methods: {
    onClickOverlay() {
      this.setData({
        show: false
      })
      this.triggerEvent('close')
    },
    onKeyboardShow() {
      this.triggerEvent('show')
    },
    onKeyboardHide() {
      this.triggerEvent('hide')
    },
    onClickKey({ currentTarget: { dataset } }) {
      const { maxlength } = this.properties
      let { value } = this.data
      const key: string = dataset.key || ''
      if (!key) return
      if (key === 'collapse') {
        this.setData({
          show: false
        })
      } else if (key === 'delete') {
        if (value.length > 0) {
          value = value.slice(0, value.length - 1)
        }
        this.setData({ value })
        this.triggerEvent('input', value)
        this.triggerEvent('delete')
      } else {
        if (value.length >= maxlength) return
        value += key
        this.setData({ value })
        this.triggerEvent('input', value)
      }
    },
    onPasswordComplete({ detail }) {
      console.log(detail)
      this.triggerEvent('complete', detail)
    }
  }
});
