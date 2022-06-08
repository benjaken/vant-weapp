import { ORANGE } from '../common/color';
import { getRect } from '../common/utils';
import { VantComponent } from '../common/component';
VantComponent({
    props: {
        size: {
            type: Number,
            value: 40,
        },
        inertia: Boolean,
        disabled: Boolean,
        bottom: Boolean,
        damping: {
            type: Number,
            value: 20,
        },
        friction: {
            type: Number,
            value: 2,
        },
        deviation: {
            type: Number,
            value: 2
        },
        placeholder: {
            type: String,
            value: '拖动滑块至虚线框内'
        },
        successText: {
            type: String,
            value: '验证通过'
        },
        activeColor: {
            type: String,
            value: ORANGE
        },
    },
    data: {
        width: 0,
        x: 0,
        target: 0,
        success: false
    },
    mounted() {
        getRect(this, '.van-slide-verify').then(({ width }) => {
            this.setData({ width });
            this.randomTarget();
        });
    },
    methods: {
        randomTarget() {
            const min = this.data.size * 2;
            const max = this.data.width - this.data.size;
            const target = Math.floor(Math.random() * (max - min + 1)) + min;
            this.setData({
                target: this.data.bottom ? max : target
            });
        },
        onDragEnd({ x }) {
            const { deviation } = this.properties;
            const { target } = this.data;
            if (x > target + deviation || x < target - deviation) {
                this.setData({
                    x: 0,
                    success: false
                });
                this.$emit('error');
            }
            else {
                this.setData({
                    success: true
                });
                this.$emit('success');
            }
        },
        reset() {
            this.setData({
                x: 0,
                success: false
            });
            getRect(this, '.van-slide-verify').then(({ width }) => {
                this.setData({ width });
                this.randomTarget();
            });
        },
    }
});
