import { VantComponent } from '../common/component';
VantComponent({
    props: {
        avatar: String,
        name: String,
        starLevel: Number,
        organName: String,
        branchName: String,
        dealMessage: String,
        tags: Array,
        dealCount: String,
        commentPoint: String,
        practiceYear: String,
        coordinate: Array,
        distanceString: String,
        border: Boolean,
        showChat: {
            type: Boolean,
            value: true
        },
        useMoreSlot: Boolean,
        useButtonSlot: Boolean,
    },
    methods: {
        showLocation() {
            const { organName, branchName, address, coordinate = [] } = this.data;
            if (coordinate.length === 0)
                return;
            wx.openLocation({
                name: `${organName}${branchName ? '-' + branchName : ''}`,
                address: address || '',
                longitude: parseFloat(coordinate[0]),
                latitude: parseFloat(coordinate[1]),
                scale: 18
            });
        },
        onClick() {
            this.triggerEvent('click');
        },
        onClickChat() {
            this.triggerEvent('click-chat');
        },
    }
});
