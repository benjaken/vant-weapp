"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
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
        showLocation: function () {
            var _a = this.data, organName = _a.organName, branchName = _a.branchName, address = _a.address, _b = _a.coordinate, coordinate = _b === void 0 ? [] : _b;
            if (coordinate.length === 0)
                return;
            wx.openLocation({
                name: "".concat(organName).concat(branchName ? '-' + branchName : ''),
                address: address || '',
                longitude: parseFloat(coordinate[0]),
                latitude: parseFloat(coordinate[1]),
                scale: 18
            });
        },
        onClick: function () {
            this.$emit('click');
        },
        onClickChat: function () {
            this.$emit('click-chat');
        },
    }
});
