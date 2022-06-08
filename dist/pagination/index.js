import { GRAY_DARK, ORANGE } from '../common/color';
import { VantComponent } from '../common/component';
VantComponent({
    props: {
        value: {
            type: Number,
            value: 1
        },
        total: {
            type: Number,
            value: 1
        },
        delimiter: {
            type: String,
            value: '/'
        },
        prevText: {
            type: String,
            value: '上一页'
        },
        nextText: {
            type: String,
            value: '下一页'
        },
        disabled: Boolean,
        showPage: {
            type: Boolean,
            value: true
        },
        hideOnSinglePage: {
            type: Boolean,
            value: false
        },
        theme: {
            type: String,
            value: 'default'
        },
        activeColor: {
            type: String,
            value: ORANGE
        },
        inactiveColor: {
            type: String,
            value: GRAY_DARK
        }
    },
    methods: {
        prev() {
            const { value, disabled } = this.data;
            if (value === 1 || disabled)
                return;
            this.setData({
                value: value - 1
            });
            this.$emit('change', this.data.value);
        },
        next() {
            const { value, total, disabled } = this.data;
            if (value === total || disabled)
                return;
            this.setData({
                value: value + 1
            });
            this.$emit('change', this.data.value);
        },
    }
});
