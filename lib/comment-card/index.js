"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
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
        onClickLike: function () {
            this.$emit('click-like');
        },
        onClickComment: function () {
            this.$emit('click-comment');
        },
    }
});
