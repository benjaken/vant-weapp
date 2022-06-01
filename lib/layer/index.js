"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        show: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: ''
        },
        content: {
            type: String,
            value: ''
        },
        useButtonSlot: Boolean,
        closePosition: {
            type: String,
            value: 'bottom'
        },
        showButton: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        closeOverlay: function () {
            this.setData({
                show: false
            });
            this.$emit('close');
        }
    }
});
