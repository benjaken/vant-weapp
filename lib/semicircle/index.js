"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("./../common/color");
var color_2 = require("../common/color");
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        percentage: Number,
        bottomText: String,
        activeColor: {
            type: String,
            value: '#F96401',
        },
        total: {
            type: Number,
            value: 20,
        },
        lineWidth: {
            type: Number,
            value: 20,
        },
    },
    mounted: function () {
        var _this = this;
        this.createSelectorQuery()
            .select('#canvas')
            .fields({ node: true, size: true })
            .exec(function (res) {
            var _a = res[0], width = _a.width, height = _a.height;
            var canvas = res[0].node;
            var context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            var dpr = wx.getSystemInfoSync().pixelRatio;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            context.scale(dpr, dpr);
            _this.drawProgress(context, width, height);
            _this.drawText(context, width, height);
            if (_this.properties.bottomText) {
                _this.drawBottomText(context, width, height);
            }
        });
    },
    methods: {
        drawProgress: function (context, width, height) {
            var lineWidth = this.properties.lineWidth;
            context.beginPath();
            context.arc(width / 2, height / 2, width / 2 - 10, (3 / 4) * Math.PI, (9 / 4) * Math.PI);
            context.lineWidth = lineWidth;
            context.lineCap = 'round';
            context.strokeStyle = '#eaeff4';
            context.stroke();
            context.beginPath();
            context.arc(width / 2, height / 2, width / 2 - 10, (3 / 4) * Math.PI, this.percentageToAngle(this.data.percentage));
            context.lineWidth = lineWidth;
            context.lineCap = 'round';
            context.strokeStyle = this.data.activeColor;
            context.stroke();
        },
        drawText: function (context, width, height) {
            var _a = this.properties, total = _a.total, percentage = _a.percentage;
            context.font = 'bold 60px sans-serif';
            context.fillStyle = color_2.GRAY;
            context.textAlign = 'right';
            context.textBaseline = 'baseline';
            context.fillText(total * percentage, width / 2, height / 2 + 10);
            context.font = 'bold 30px sans-serif';
            context.fillStyle = color_1.GRAY_DARK;
            context.textAlign = 'left';
            context.textBaseline = 'baseline';
            context.fillText("/".concat(total), width / 2, height / 2 + 10);
        },
        drawBottomText: function (context, width, height) {
            var bottomText = this.properties.bottomText;
            context.font = 'bold 16px sans-serif';
            context.fillStyle = color_2.GRAY;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(bottomText, width / 2, height - 40);
        },
        percentageToAngle: function (percentage) {
            var deltaAngle = (3 / 2) * Math.PI;
            var start = (3 / 4) * Math.PI;
            if (percentage >= 1) {
                return deltaAngle + start;
            }
            else if (percentage <= 0) {
                return start;
            }
            else {
                return deltaAngle * percentage + start;
            }
        },
    },
});
