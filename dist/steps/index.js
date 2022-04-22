import { VantComponent } from '../common/component';
import { GREEN, GRAY_DARK } from '../common/color';
VantComponent({
    classes: ['desc-class'],
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            value: 'horizontal',
        },
        activeColor: {
            type: String,
            value: GREEN,
        },
        inactiveColor: {
            type: String,
            value: GRAY_DARK,
        },
        activeIcon: {
            type: String,
            value: 'checked',
        },
        reverse: {
            type: Boolean,
            value: false,
        },
        inactiveIcon: String,
    },
    mounted() {
        const steps = this.properties.steps || [];
        steps.forEach(item => {
            item.hasMore = (item.file && item.file.length > 0);
            item.showMore = false;
        });
        this.setData({ steps });
    },
    methods: {
        onClick(event) {
            const { index } = event.currentTarget.dataset;
            this.$emit('click-step', index);
        },
        onToggle({ currentTarget: { dataset } }) {
            const { steps } = this.data;
            const { showMore } = steps[dataset.index];
            steps[dataset.index].showMore = !showMore;
            this.setData({ steps });
        }
    },
});
