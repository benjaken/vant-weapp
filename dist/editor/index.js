var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    props: {
        name: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        required: {
            type: Boolean,
            value: false
        },
        hideCount: {
            type: Boolean,
            value: false
        },
        showText: {
            type: Boolean,
            value: false
        },
        mode: {
            type: String,
            value: 'textarea'
        },
        background: {
            type: Boolean,
            value: true
        },
        value: {
            type: String,
            value: ''
        },
        maxlength: {
            type: Number,
            value: 500
        },
        placeholder: {
            type: String,
            value: ''
        },
        field: {
            type: Boolean,
            value: false
        }
    },
    data: {
        formats: {},
        isIOS: false,
        editorLength: 0,
        editorCtx: {}
    },
    methods: {
        onInput({ detail: { value } }) {
            this.setData({ value });
            this.triggerEvent('change', value);
        },
        onEditorReady() {
            wx.createSelectorQuery()
                .in(this)
                .select('#editor')
                .context(({ context }) => {
                if (!context)
                    return;
                const text = this.data.value.replace(/<[^>]+>|&[^>]+;/g, '').trim();
                this.setData({
                    editorCtx: context,
                    editorLength: text.length
                });
                if (this.data.value) {
                    this.data.editorCtx.setContents({
                        html: this.data.value
                    });
                }
                wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                });
            })
                .exec();
        },
        onStatusChange({ detail }) {
            this.setData({ formats: detail });
        },
        onEditorInput({ detail: { html: value } }) {
            const text = value.replace(/<[^>]+>|&[^>]+;/g, '').trim();
            this.setData({
                value,
                editorLength: text.length
            });
            this.triggerEvent('change', value);
        },
        format({ target: dataset }) {
            const item = dataset.dataset;
            if (!item.name)
                return;
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
            const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            this.data.editorCtx.insertText({
                text: formatDate
            });
        },
        insertImage() {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield wx.chooseImage({
                    count: 1
                });
                const file = res.tempFiles[0];
                this.data.editorCtx.insertImage({
                    src: file.path,
                    width: '100%'
                });
            });
        }
    }
});
