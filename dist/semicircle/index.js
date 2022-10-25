import { GRAY_DARK } from './../common/color';
import { GRAY } from '../common/color';
import { VantComponent } from '../common/component';
VantComponent({
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
    mounted() {
        this.createSelectorQuery()
            .select('#canvas')
            .fields({ node: true, size: true })
            .exec((res) => {
            const { width, height } = res[0];
            const canvas = res[0].node;
            const context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            const dpr = wx.getSystemInfoSync().pixelRatio;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            context.scale(dpr, dpr);
            this.drawProgress(context, width, height);
            this.drawText(context, width, height);
            if (this.properties.bottomText) {
                this.drawBottomText(context, width, height);
            }
        });
    },
    methods: {
        drawProgress(context, width, height) {
            const { lineWidth } = this.properties;
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
        drawText(context, width, height) {
            const { total, percentage } = this.properties;
            context.font = 'bold 60px sans-serif';
            context.fillStyle = GRAY;
            context.textAlign = 'right';
            context.textBaseline = 'baseline';
            context.fillText(total * percentage, width / 2, height / 2 + 10);
            context.font = 'bold 30px sans-serif';
            context.fillStyle = GRAY_DARK;
            context.textAlign = 'left';
            context.textBaseline = 'baseline';
            context.fillText(`/${total}`, width / 2, height / 2 + 10);
        },
        drawBottomText(context, width, height) {
            const { bottomText } = this.properties;
            context.font = 'bold 16px sans-serif';
            context.fillStyle = GRAY;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(bottomText, width / 2, height - 40);
        },
        percentageToAngle(percentage) {
            const deltaAngle = (3 / 2) * Math.PI;
            const start = (3 / 4) * Math.PI;
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
