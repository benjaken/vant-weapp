import { VantComponent } from '../common/component';
VantComponent({
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
        showBubble() {
            this.setData({
                show: true,
            }, () => {
                this.setData({
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
        hideBubble() {
            this.setData({
                animationData: wx
                    .createAnimation({
                    duration: 500,
                    timingFunction: 'ease-in-out',
                    delay: 0,
                })
                    .opacity(0)
                    .export(),
            }, () => {
                setTimeout(() => {
                    this.setData({
                        tipVisible: false,
                    });
                }, 400);
            });
        },
    },
});
