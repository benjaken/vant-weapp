"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        content: String,
        color: {
            type: String,
            value: "#ee0a24"
        },
        dot: Boolean,
        max: Number,
        position: {
            type: String,
            value: 'top-right'
        },
        useContentSlot: Boolean
    },
});
