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
var color_1 = require("../common/color");
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    props: {
        show: {
            type: Boolean,
            value: false,
        },
        title: null,
        value: {
            type: String,
            value: '',
            observer: function (value) {
                var fieldNames = this.properties.fieldNames;
                if (value !== undefined) {
                    var values = this.data.tabs.map(function (tab) { var _a; return (_a = tab.selected) === null || _a === void 0 ? void 0 : _a[fieldNames.value]; });
                    if (values.includes(value)) {
                        return;
                    }
                }
                this.updateTabs();
            },
        },
        options: {
            type: Array,
            value: [],
            observer: function () {
                this.updateTabs();
            },
        },
        placeholder: {
            type: String,
            value: '请选择',
        },
        activeColor: {
            type: String,
            value: color_1.ORANGE,
        },
        swipeable: Boolean,
        loading: Boolean,
        closeable: {
            type: Boolean,
            value: true,
        },
        showHeader: {
            type: Boolean,
            value: true,
        },
        closeIcon: {
            type: String,
            value: 'cross',
        },
        fieldNames: {
            type: Object,
            value: {
                text: 'text',
                value: 'value',
                children: 'children',
            },
        }
    },
    data: {
        active: 0,
        tabs: [],
    },
    mounted: function () {
        this.updateTabs();
    },
    methods: {
        getSelectedOptionsByValue: function (options, value) {
            var fieldNames = this.properties.fieldNames;
            // eslint-disable-next-line no-restricted-syntax
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var option = options_1[_i];
                if (option[fieldNames.value] === value) {
                    return [option];
                }
                if (option[fieldNames.children]) {
                    var selectedOptions = this.getSelectedOptionsByValue(option[fieldNames.children], value);
                    if (selectedOptions) {
                        return __spreadArray([option], selectedOptions, true);
                    }
                }
            }
        },
        onTabChange: function (_a) {
            var detail = _a.detail;
            this.setData({
                active: detail.index
            });
        },
        onClickOverlay: function () {
            this.setData({
                show: false,
            });
            this.$emit('close');
        },
        onClickTab: function (_a) {
            var name = _a.name, title = _a.title;
            this.$emit('click-tab', name, title);
        },
        updateTabs: function () {
            var _this = this;
            var _a = this.properties, options = _a.options, value = _a.value, fieldNames = _a.fieldNames;
            var tabs = this.data.tabs;
            if (value !== undefined) {
                var selectedOptions = this.getSelectedOptionsByValue(options, value);
                if (selectedOptions) {
                    var optionsCursor_1 = options;
                    tabs = selectedOptions.map(function (option) {
                        var tab = {
                            options: optionsCursor_1,
                            selected: option,
                        };
                        var next = optionsCursor_1.find(function (item) { return item[fieldNames.value] === option[fieldNames.value]; });
                        if (next) {
                            optionsCursor_1 = next[fieldNames.children];
                        }
                        return tab;
                    });
                    if (optionsCursor_1) {
                        tabs.push({
                            options: optionsCursor_1,
                            selected: null,
                        });
                    }
                    wx.nextTick(function () {
                        _this.setData({
                            tabs: tabs,
                            active: tabs.length - 1,
                        });
                    });
                    return;
                }
            }
            this.setData({
                tabs: [
                    {
                        options: options,
                        selected: null,
                    },
                ],
            });
        },
        onSelect: function (_a) {
            var _this = this;
            var dataset = _a.currentTarget.dataset;
            var option = dataset.option, index = dataset.index;
            var fieldNames = this.properties.fieldNames;
            var tabs = this.data.tabs;
            var active = this.data.active;
            if (option.disabled)
                return;
            tabs[index].selected = option;
            if (tabs.length > index + 1) {
                tabs = tabs.slice(0, index + 1);
            }
            this.setData({ tabs: tabs });
            if (option[fieldNames.children]) {
                var nextTab = {
                    options: option[fieldNames.children],
                    selected: null,
                };
                if (tabs[index + 1]) {
                    tabs[index + 1] = nextTab;
                }
                else {
                    tabs.push(nextTab);
                }
                wx.nextTick(function () {
                    _this.setData({
                        tabs: tabs,
                        active: active + 1,
                    });
                });
            }
            var selectedOptions = tabs.map(function (tab) { return tab.selected; }).filter(Boolean);
            this.setData({
                value: option[fieldNames.value],
            });
            var params = {
                value: option[fieldNames.value],
                tabIndex: index,
                selectedOptions: selectedOptions,
            };
            this.$emit('change', params);
            if (!option[fieldNames.children]) {
                this.$emit('finish', params);
                this.setData({
                    show: false
                });
            }
        },
    },
});
