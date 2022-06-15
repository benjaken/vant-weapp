"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        fixed: Boolean,
        loading: Boolean,
        zebra: Boolean,
        data: Array,
        columns: Array,
        height: {
            type: Number,
            value: 200,
        }
    },
});
