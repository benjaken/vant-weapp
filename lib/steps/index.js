"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var color_1 = require("../common/color");
(0, component_1.VantComponent)({
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
            value: color_1.GREEN,
        },
        inactiveColor: {
            type: String,
            value: color_1.GRAY_DARK,
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
    mounted: function () {
        var steps = this.properties.steps || [];
        steps.forEach(function (item) {
            item.hasMore = (item.file && item.file.length > 0);
            item.showMore = false;
        });
        this.setData({ steps: steps });
    },
    methods: {
        onClick: function (event) {
            var index = event.currentTarget.dataset.index;
            this.$emit('click-step', index);
        },
        onToggle: function (_a) {
            var dataset = _a.currentTarget.dataset;
            var steps = this.data.steps;
            var showMore = steps[dataset.index].showMore;
            steps[dataset.index].showMore = !showMore;
            this.setData({ steps: steps });
        }
    },
});
