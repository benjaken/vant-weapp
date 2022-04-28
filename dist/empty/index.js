import { VantComponent } from '../common/component';
VantComponent({
    props: {
        description: String,
        descriptionTip: String,
        image: {
            type: String,
            value: 'default',
        },
    },
});
