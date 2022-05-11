import { VantComponent } from '../common/component';
VantComponent({
    props: {
        avatar: String,
        name: String,
        time: String,
        point: Number,
        content: String,
        fileList: Array,
        info: String,
        like: Boolean,
        likeCount: Number,
        commentCount: Number,
        maxCount: {
            type: Number,
            default: 20
        }
    },
    methods: {
        onClickLike() {
            this.triggerEvent('click-like');
        },
        onClickComment() {
            this.triggerEvent('click-comment');
        },
    }
});
