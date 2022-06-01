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
            this.$emit('click-like');
        },
        onClickComment() {
            this.$emit('click-comment');
        },
    }
});
