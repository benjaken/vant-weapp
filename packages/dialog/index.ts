import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { RED } from '../common/color';
import { toPromise } from '../common/utils';
import type { Action } from './dialog';

VantComponent({
  mixins: [button],

  props: {
    show: {
      type: Boolean,
      observer(show: boolean) {
        !show && this.stopLoading();
      },
    },
    title: String,
    message: String,
    theme: {
      type: String,
      value: 'default',
    },
    useSlot: Boolean,
    className: String,
    customStyle: String,
    asyncClose: Boolean,
    messageAlign: String,
    beforeClose: null,
    overlayStyle: String,
    useTitleSlot: Boolean,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
    width: null,
    zIndex: {
      type: Number,
      value: 2000,
    },
    confirmButtonText: {
      type: String,
      value: '确认',
    },
    cancelButtonText: {
      type: String,
      value: '取消',
    },
    confirmButtonColor: {
      type: String,
      value: RED,
    },
    cancelButtonColor: {
      type: String,
      value: '',
    },
    showConfirmButton: {
      type: Boolean,
      value: true,
    },
    overlay: {
      type: Boolean,
      value: true,
    },
    transition: {
      type: String,
      value: 'scale',
    },
		moreButtons: {
			type: Array,
			value: []
		}
  },

  data: {
    loading: {
      confirm: false,
      cancel: false,
    },
    callback: ((() => {}) as unknown) as (
      action: string,
      context: WechatMiniprogram.Component.TrivialInstance,
      index?: number
    ) => void,
  },

  methods: {
    onConfirm() {
      this.handleAction('confirm');
    },

    onCancel() {
      this.handleAction('cancel');
    },

    onClickMore({ currentTarget: { dataset }}) {
      const index = dataset.index;
      this.handleAction('more', parseInt(index));
    },

    onClickOverlay() {
      this.close('overlay');
    },

    close(action, index?: number) {
      this.setData({ show: false });

      wx.nextTick(() => {
        this.$emit('close', action);

        const { callback } = this.data;
        if (callback) {
          callback(action, this, index);
        }
      });
    },

    stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false,
        },
      });
    },

    handleAction(action: Action, index?: number) {
      this.$emit(action, { dialog: this, index });

      const { asyncClose, beforeClose } = this.data;
      if (!asyncClose && !beforeClose) {
        this.close(action, index);
        return;
      }

      this.setData({
        [`loading.${action}`]: true,
      });

      if (beforeClose) {
        toPromise(beforeClose(action, index)).then((value) => {
          if (value) {
            this.close(action, index);
          } else {
            this.stopLoading();
          }
        });
      }
    },
  },
});
