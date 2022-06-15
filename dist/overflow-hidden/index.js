import { VantComponent } from '../common/component';
VantComponent({
    props: {
        text: String,
        line: {
            type: Number,
            value: 1
        },
        color: String,
        fontSize: {
            type: Number,
            value: 14
        },
        customStyle: String,
        button: Boolean
    },
    data: {
        show: false,
    },
    methods: {
        triggerContent() {
            this.setData({
                show: !this.data.show
            });
        },
    }
});
