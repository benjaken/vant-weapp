import { VantComponent } from '../../../common/component';
import { getMonthEndDay, compareDay, getPrevDay, getNextDay, } from '../../utils';
VantComponent({
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
        scrollIntoView: '',
        weekdays: [],
        days: [],
    },
    created() {
        this.initWeekDay();
    },
    methods: {
        onClick(event) {
            const { horizon } = this.data;
            const { index } = event.currentTarget.dataset;
            const item = this.data.days[index];
            if (item.type !== 'disabled') {
                if (horizon)
                    this.scrollHorizon(item.date);
                this.$emit('click', item);
            }
        },
        onClickTitle() {
            this.$emit('clickTitle');
        },
        initWeekDay() {
            const { firstDayOfWeek = 0, lang, currentDate, horizon } = this.data;
            const defaultWeeks = {
                en: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
                zh: ['日', '一', '二', '三', '四', '五', '六'],
            };
            let weekdays = [
                ...defaultWeeks[lang].slice(firstDayOfWeek, 7),
                ...defaultWeeks[lang].slice(0, firstDayOfWeek),
            ];
            if (horizon) {
                const weeks = [
                    ...defaultWeeks[lang].slice(1, 7),
                    ...defaultWeeks[lang].slice(0, 1),
                ];
                const firstDayOfMonth = new Date(new Date(currentDate).getFullYear(), new Date(currentDate).getMonth(), 1).getDay();
                const totalDay = getMonthEndDay(new Date(currentDate).getFullYear(), new Date(currentDate).getMonth() + 1);
                weekdays = [
                    ...weeks.slice(firstDayOfMonth - 1, 7),
                    ...weeks,
                    ...weeks,
                    ...weeks,
                    ...weeks,
                    ...weeks,
                ].slice(0, totalDay);
            }
            this.setData({
                weekdays,
            });
        },
        scrollHorizon(date) {
            this.setData({
                scrollIntoView: `day-${new Date(date).getDate() - 4 < 0 ? 0 : new Date(date).getDate() - 4}`,
            });
        },
        setDays() {
            const { date, currentDate, dotDate } = this.data;
            const days = [];
            const startDate = new Date(date);
            const year = startDate.getFullYear();
            const month = startDate.getMonth();
            const totalDay = getMonthEndDay(startDate.getFullYear(), startDate.getMonth() + 1);
            for (let day = 1; day <= totalDay; day++) {
                const date = new Date(year, month, day);
                const type = this.getDayType(date);
                let config = {
                    date,
                    type,
                    text: day,
                    bottomInfo: this.getBottomInfo(type),
                    bottomDot: dotDate.some((item) => compareDay(item, date) == 0),
                };
                if (this.data.formatter) {
                    config = this.data.formatter(config);
                }
                days.push(config);
            }
            this.setData({ days });
            if (this.data.horizon) {
                this.scrollHorizon(currentDate);
                this.initWeekDay();
            }
        },
        getMultipleDayType(day) {
            const { currentDate } = this.data;
            if (!Array.isArray(currentDate)) {
                return '';
            }
            const isSelected = (date) => currentDate.some((item) => compareDay(item, date) === 0);
            if (isSelected(day)) {
                const prevDay = getPrevDay(day);
                const nextDay = getNextDay(day);
                const prevSelected = isSelected(prevDay);
                const nextSelected = isSelected(nextDay);
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
        getRangeDayType(day) {
            const { currentDate, allowSameDay } = this.data;
            if (!Array.isArray(currentDate)) {
                return '';
            }
            const [startDay, endDay] = currentDate;
            if (!startDay) {
                return '';
            }
            const compareToStart = compareDay(day, startDay);
            if (!endDay) {
                return compareToStart === 0 ? 'start' : '';
            }
            const compareToEnd = compareDay(day, endDay);
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
        getDayType(day) {
            const { type, minDate, maxDate, currentDate } = this.data;
            if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
                return 'disabled';
            }
            if (type === 'single') {
                return compareDay(day, currentDate) === 0 ? 'selected' : '';
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
        getBottomInfo(type) {
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
