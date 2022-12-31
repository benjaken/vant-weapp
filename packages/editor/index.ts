import { nextTick } from '../common/utils';
import { VantComponent } from '../common/component';

VantComponent({
  field: true,
  props: {
    name: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    required: {
      type: Boolean,
      value: false,
    },
    hideCount: {
      type: Boolean,
      value: false,
    },
    showText: {
      type: Boolean,
      value: false,
    },
    mode: {
      type: String,
      value: 'textarea',
    },
    background: {
      type: Boolean,
      value: true,
    },
    height: {
      type: Number,
      value: 250,
    },
    value: {
      type: String,
      value: '',
    },
    maxlength: {
      type: Number,
      value: 500,
    },
    placeholder: {
      type: String,
      value: '',
    },
    field: {
      type: Boolean,
      value: false,
    },
    customStyle: {
      type: String,
      value: '',
    },
  },
  data: {
    formats: {} as WechatMiniprogram.EditorContext,
    isIOS: false,
    editorLength: 0,
    editorCtx: null as unknown as WechatMiniprogram.IAnyObject,
  },
  methods: {
    onInput({ detail: { value } }) {
      this.setData({ value });
      nextTick(() => {
        this.$emit('change', value);
      });
    },
    onEditorReady() {
      wx.createSelectorQuery()
        .in(this)
        .select('#editor')
        .context(({ context }) => {
          if (!context) return;
          const text = this.data.value.replace(/<[^>]+>|&[^>]+;/g, '').trim();
          this.setData({
            editorCtx: context,
            editorLength: text.length,
          });
          if (this.data.value) {
            this.data.editorCtx.setContents({
              html: this.data.value,
            });
          }
        })
        .exec();
    },
    onStatusChange({ detail }) {
      this.setData({ formats: detail });
    },
    onEditorInput({ detail: { html: value } }) {
      this.setContent(value);
    },
    insertContent(value: string) {
			this.setContent(value);
      if (this.data.mode == 'editor' && this.data.editorCtx) {
        this.data.editorCtx.setContents({
          html: `${value}\n`,
        });
      }
    },
    setContent(value: string) {
      const text = value.replace(/<[^>]+>|&[^>]+;/g, '').trim();
      this.setData({
        value,
        editorLength: text.length,
      });
      nextTick(() => {
        this.$emit('change', value);
      });
    },
    format({ target: dataset }) {
      const item = dataset.dataset;
      if (!item.name) return;
      this.data.editorCtx.format(item.name, item.value);
    },
    undo() {
      this.data.editorCtx.undo();
    },
    redo() {
      this.data.editorCtx.redo();
    },
    insertDivider() {
      this.data.editorCtx.insertDivider();
    },
    clear() {
      this.data.editorCtx.clear();
    },
    removeFormat() {
      this.data.editorCtx.removeFormat();
    },
    insertDate() {
      const date = new Date();
      const formatDate = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      this.data.editorCtx.insertText({
        text: formatDate,
      });
    },
    async insertImage() {
      const res = await wx.chooseImage({
        count: 1,
      });
      const file = res.tempFiles[0];
      this.data.editorCtx.insertImage({
        src: file.path,
        width: '100%',
      });
    },
  },
});
