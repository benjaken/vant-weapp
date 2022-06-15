"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../../../common/component");
var utils_1 = require("../../utils");
(0, component_1.VantComponent)({
    props: {
        date: {
            type: null,
            observer: 'setDays',
        },
        type: {
            type: String,
            observer: 'setDays',
        },
        color: String,
        minDate: {
            type: null,
            observer: 'setDays',
        },
        maxDate: {
            type: null,
            observer: 'setDays',
        },
        showMark: Boolean,
        rowHeight: null,
        formatter: {
            type: null,
            observer: 'setDays',
        },
        currentDate: {
            type: null,
            observer: 'setDays',
        },
        firstDayOfWeek: {
            type: Number,
            observer: 'setDays',
        },
        showWeekDays: Boolean,
        allowSameDay: Boolean,
        showSubtitle: Boolean,
        showMonthTitle: Boolean,
        dotDate: {
            type: null,
            value: []
        }
    },
    data: {
        visible: true,
        weekdays: [],
        days: [],
    },
    created: function () {
        this.initWeekDay();
    },
    methods: {
        onClick: function (event) {
            var index = event.currentTarget.dataset.index;
            var item = this.data.days[index];
            if (item.type !== 'disabled') {
                this.$emit('click', item);
            }
        },
        initWeekDay: function () {
            var defaultWeeks = ['日', '一', '二', '三', '四', '五', '六'];
            var firstDayOfWeek = this.data.firstDayOfWeek || 0;
            this.setData({
                weekdays: __spreadArray(__spreadArray([], defaultWeeks.slice(firstDayOfWeek, 7), true), defaultWeeks.slice(0, firstDayOfWeek), true),
            });
        },
        setDays: function () {
            var _a = this.data, date = _a.date, dotDate = _a.dotDate;
            var days = [];
            var startDate = new Date(date);
            var year = startDate.getFullYear();
            var month = startDate.getMonth();
            var totalDay = (0, utils_1.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);
            var _loop_1 = function (day) {
                var date_1 = new Date(year, month, day);
                var type = this_1.getDayType(date_1);
                var config = {
                    date: date_1,
                    type: type,
                    text: day,
                    bottomInfo: this_1.getBottomInfo(type),
                    bottomDot: dotDate.some(function (item) { return (0, utils_1.compareDay)(item, date_1) == 0; })
                };
                if (this_1.data.formatter) {
                    config = this_1.data.formatter(config);
                }
                days.push(config);
            };
            var this_1 = this;
            for (var day = 1; day <= totalDay; day++) {
                _loop_1(day);
            }
            this.setData({ days: days });
        },
        getMultipleDayType: function (day) {
            var currentDate = this.data.currentDate;
            if (!Array.isArray(currentDate)) {
                return '';
            }
            var isSelected = function (date) {
                return currentDate.some(function (item) { return (0, utils_1.compareDay)(item, date) === 0; });
            };
            if (isSelected(day)) {
                var prevDay = (0, utils_1.getPrevDay)(day);
                var nextDay = (0, utils_1.getNextDay)(day);
                var prevSelected = isSelected(prevDay);
                var nextSelected = isSelected(nextDay);
                if (prevSelected && nextSelected) {
                    return 'multiple-middle';
                }
                if (prevSelected) {
                    return 'end';
                }
                return nextSelected ? 'start' : 'multiple-selected';
            }
            return '';
        },
        getRangeDayType: function (day) {
            var _a = this.data, currentDate = _a.currentDate, allowSameDay = _a.allowSameDay;
            if (!Array.isArray(currentDate)) {
                return '';
            }
            var startDay = currentDate[0], endDay = currentDate[1];
            if (!startDay) {
                return '';
            }
            var compareToStart = (0, utils_1.compareDay)(day, startDay);
            if (!endDay) {
                return compareToStart === 0 ? 'start' : '';
            }
            var compareToEnd = (0, utils_1.compareDay)(day, endDay);
            if (compareToStart === 0 && compareToEnd === 0 && allowSameDay) {
                return 'start-end';
            }
            if (compareToStart === 0) {
                return 'start';
            }
            if (compareToEnd === 0) {
                return 'end';
            }
            if (compareToStart > 0 && compareToEnd < 0) {
                return 'middle';
            }
            return '';
        },
        getDayType: function (day) {
            var _a = this.data, type = _a.type, minDate = _a.minDate, maxDate = _a.maxDate, currentDate = _a.currentDate;
            if ((0, utils_1.compareDay)(day, minDate) < 0 || (0, utils_1.compareDay)(day, maxDate) > 0) {
                return 'disabled';
            }
            if (type === 'single') {
                return (0, utils_1.compareDay)(day, currentDate) === 0 ? 'selected' : '';
            }
            if (type === 'multiple') {
                return this.getMultipleDayType(day);
            }
            /* istanbul ignore else */
            if (type === 'range') {
                return this.getRangeDayType(day);
            }
            return '';
        },
        getBottomInfo: function (type) {
            if (this.data.type === 'range') {
                if (type === 'start') {
                    return '开始';
                }
                if (type === 'end') {
                    return '结束';
                }
                if (type === 'start-end') {
                    return '开始/结束';
                }
            }
        },
    },
});
