import { toPromise } from '../common/utils';
import { VantComponent } from '../common/component';
VantComponent({
    props: {
        options: {
            type: Array,
            value: [],
        },
        value: {
            type: Array,
            value: [],
        },
        round: {
            type: Boolean,
            value: false,
        },
        single: {
            type: Boolean,
            value: false,
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        horizon: {
            type: Boolean,
            value: false,
        },
        row: {
            type: Number,
            value: 2,
        },
        needIndex: {
            type: Boolean,
            value: false,
        },
        beforeChange: null,
    },
    methods: {
        selectItem({ target }) {
            const { beforeChange } = this.data;
            const { item } = target.dataset;
            let { value } = this.properties;
            const { single, disabled } = this.properties;
            if (!disabled) {
                if (value.indexOf(item) > -1) {
                    value = single ? value : value.filter((v) => v !== item);
                }
                else if (single) {
                    value = [item];
                }
                else {
                    value.push(item);
                }
                if (beforeChange) {
                    toPromise(beforeChange()).then(() => {
                        this.setData({ value });
                        this.$emit('change', value);
                    });
                }
                else {
                    this.setData({ value });
                    this.$emit('change', value);
                }
            }
        },
    },
});
