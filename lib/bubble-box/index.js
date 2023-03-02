"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        position: {
            type: String,
            value: 'top',
        },
        text: String,
    },
    data: {
        show: false,
    },
    methods: {
        showBubble: function () {
            var _this = this;
            this.setData({
                show: true,
            }, function () {
                _this.setData({
                    animationData: wx
                        .createAnimation({
                        duration: 500,
                        timingFunction: 'ease-in-out',
                        delay: 0,
                    })
                        .opacity(1)
                        .step()
                        .export(),
                });
            });
        },
        hideBubble: function () {
            var _this = this;
            this.setData({
                animationData: wx
                    .createAnimation({
                    duration: 500,
                    timingFunction: 'ease-in-out',
                    delay: 0,
                })
                    .opacity(0)
                    .export(),
            }, function () {
                setTimeout(function () {
                    _this.setData({
                        tipVisible: false,
                    });
                }, 400);
            });
        },
    },
});
