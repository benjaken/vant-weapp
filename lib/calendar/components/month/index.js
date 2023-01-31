"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var utils_1 = require("../../../common/utils");
var component_1 = require("../../../common/component");
var utils_2 = require("../../utils");
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
        lang: {
            type: String,
            value: 'en',
        },
        showWeekDays: Boolean,
        allowSameDay: Boolean,
        showSubtitle: Boolean,
        showMonthTitle: Boolean,
        round: Boolean,
        horizon: Boolean,
        dotDate: {
            type: null,
            value: [],
        },
    },
    data: {
        scrollLeft: 0,
        weekdays: [],
        days: [],
    },
    created: function () {
        this.initWeekDay();
    },
    methods: {
        onClick: function (event) {
            var horizon = this.data.horizon;
            var index = event.currentTarget.dataset.index;
            var item = this.data.days[index];
            if (item.type !== 'disabled') {
                if (horizon)
                    this.scrollHorizon(item.date);
                this.$emit('click', item);
            }
        },
        onClickTitle: function () {
            this.$emit('clickTitle');
        },
        initWeekDay: function () {
            var _a = this.data, _b = _a.firstDayOfWeek, firstDayOfWeek = _b === void 0 ? 0 : _b, lang = _a.lang, currentDate = _a.currentDate, horizon = _a.horizon;
            var defaultWeeks = {
                en: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
                zh: ['日', '一', '二', '三', '四', '五', '六'],
            };
            var weekdays = __spreadArray(__spreadArray([], defaultWeeks[lang].slice(firstDayOfWeek, 7), true), defaultWeeks[lang].slice(0, firstDayOfWeek), true);
            if (horizon) {
                var weeks = __spreadArray(__spreadArray([], defaultWeeks[lang].slice(1, 7), true), defaultWeeks[lang].slice(0, 1), true);
                var firstDayOfMonth = new Date(new Date(currentDate).getFullYear(), new Date(currentDate).getMonth(), 1).getDay();
                var totalDay = (0, utils_2.getMonthEndDay)(new Date(currentDate).getFullYear(), new Date(currentDate).getMonth() + 1);
                weekdays = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], weeks.slice(firstDayOfMonth - 1, 7), true), weeks, true), weeks, true), weeks, true), weeks, true), weeks, true).slice(0, totalDay);
            }
            this.setData({
                weekdays: weekdays,
            });
        },
        scrollHorizon: function (date) {
            return __awaiter(this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, utils_1.getRect)(this, '.van-calendar__day')];
                        case 1:
                            res = _a.sent();
                            if (!res)
                                return [2 /*return*/];
                            data = new Date(date).getDate() - 4 < 0 ? 0 : new Date(date).getDate() - 4;
                            this.setData({
                                scrollLeft: data * res.width,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        setDays: function () {
            var _this = this;
            var _a = this.data, date = _a.date, currentDate = _a.currentDate, dotDate = _a.dotDate;
            var days = [];
            var startDate = new Date(date);
            var year = startDate.getFullYear();
            var month = startDate.getMonth();
            var totalDay = (0, utils_2.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);
            var _loop_1 = function (day) {
                var date_1 = new Date(year, month, day);
                var type = this_1.getDayType(date_1);
                var config = {
                    date: date_1,
                    type: type,
                    text: day,
                    bottomInfo: this_1.getBottomInfo(type),
                    bottomDot: dotDate.some(function (item) { return (0, utils_2.compareDay)(item, date_1) == 0; }),
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
            if (this.data.horizon) {
                wx.nextTick(function () {
                    _this.scrollHorizon(currentDate);
                });
                this.initWeekDay();
            }
        },
        getMultipleDayType: function (day) {
            var currentDate = this.data.currentDate;
            if (!Array.isArray(currentDate)) {
                return '';
            }
            var isSelected = function (date) {
                return currentDate.some(function (item) { return (0, utils_2.compareDay)(item, date) === 0; });
            };
            if (isSelected(day)) {
                var prevDay = (0, utils_2.getPrevDay)(day);
                var nextDay = (0, utils_2.getNextDay)(day);
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
            var compareToStart = (0, utils_2.compareDay)(day, startDay);
            if (!endDay) {
                return compareToStart === 0 ? 'start' : '';
            }
            var compareToEnd = (0, utils_2.compareDay)(day, endDay);
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
            if ((0, utils_2.compareDay)(day, minDate) < 0 || (0, utils_2.compareDay)(day, maxDate) > 0) {
                return 'disabled';
            }
            if (type === 'single') {
                return (0, utils_2.compareDay)(day, currentDate) === 0 ? 'selected' : '';
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
