"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: chenzh chenzh@szfdc.net.cn
 * @Date: 2022-06-01 15:23:39
 * @LastEditors: chenzh chenzh@szfdc.net.cn
 * @LastEditTime: 2023-01-31 15:31:55
 * @Description:
 *
 * Copyright (c) 2022 by 深圳市优房网络有限公司 All Rights Reserved.
 */
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
    methods: {
        onClick: function (event) {
            var index = event.currentTarget.dataset.index;
            this.$emit('click-step', index);
        },
        onToggle: function (_a) {
            var dataset = _a.currentTarget.dataset;
            var index = dataset.index;
            var steps = this.data.steps;
            var _b = steps[index].showMore, showMore = _b === void 0 ? false : _b;
            steps[index].showMore = !showMore;
            this.setData({ steps: steps });
        },
        onHtmlLoad: function (_a) {
            var detail = _a.detail, dataset = _a.currentTarget.dataset;
            var index = dataset.index;
            var steps = this.data.steps;
            steps[index].hasMore = detail > 36 || (steps[index].file && steps[index].file.length > 0);
            this.setData({ steps: steps });
        }
    }
});
