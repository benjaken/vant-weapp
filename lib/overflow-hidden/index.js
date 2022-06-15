"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
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
        triggerContent: function () {
            this.setData({
                show: !this.data.show
            });
        },
    }
});
