"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPngSize = exports.getCurrentPage = exports.toPromise = exports.groupSetData = exports.getScrollOffset = exports.getAllRect = exports.getRect = exports.pickExclude = exports.requestAnimationFrame = exports.addUnit = exports.getSystemInfoSync = exports.nextTick = exports.range = exports.isDef = void 0;
var validator_1 = require("./validator");
var version_1 = require("./version");
var validator_2 = require("./validator");
Object.defineProperty(exports, "isDef", { enumerable: true, get: function () { return validator_2.isDef; } });
function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
exports.range = range;
function nextTick(cb) {
    if ((0, version_1.canIUseNextTick)()) {
        wx.nextTick(cb);
    }
    else {
        setTimeout(function () {
            cb();
        }, 1000 / 30);
    }
}
exports.nextTick = nextTick;
var systemInfo;
function getSystemInfoSync() {
    if (systemInfo == null) {
        systemInfo = wx.getSystemInfoSync();
    }
    return systemInfo;
}
exports.getSystemInfoSync = getSystemInfoSync;
function addUnit(value) {
    if (!(0, validator_1.isDef)(value)) {
        return undefined;
    }
    value = String(value);
    return (0, validator_1.isNumber)(value) ? "".concat(value, "px") : value;
}
exports.addUnit = addUnit;
function requestAnimationFrame(cb) {
    return wx
        .createSelectorQuery()
        .selectViewport()
        .boundingClientRect()
        .exec(function () {
        cb();
    });
}
exports.requestAnimationFrame = requestAnimationFrame;
function pickExclude(obj, keys) {
    if (!(0, validator_1.isPlainObject)(obj)) {
        return {};
    }
    return Object.keys(obj).reduce(function (prev, key) {
        if (!keys.includes(key)) {
            prev[key] = obj[key];
        }
        return prev;
    }, {});
}
exports.pickExclude = pickExclude;
function getRect(context, selector) {
    return new Promise(function (resolve) {
        wx.createSelectorQuery()
            .in(context)
            .select(selector)
            .boundingClientRect()
            .exec(function (rect) {
            if (rect === void 0) { rect = []; }
            return resolve(rect[0]);
        });
    });
}
exports.getRect = getRect;
function getAllRect(context, selector) {
    return new Promise(function (resolve) {
        wx.createSelectorQuery()
            .in(context)
            .selectAll(selector)
            .boundingClientRect()
            .exec(function (rect) {
            if (rect === void 0) { rect = []; }
            resolve(rect[0]);
        });
    });
}
exports.getAllRect = getAllRect;
function getScrollOffset() {
    return new Promise(function (resolve) {
        wx.createSelectorQuery().selectViewport().scrollOffset(resolve).exec();
    });
}
exports.getScrollOffset = getScrollOffset;
function groupSetData(context, cb) {
    if ((0, version_1.canIUseGroupSetData)()) {
        context.groupSetData(cb);
    }
    else {
        cb();
    }
}
exports.groupSetData = groupSetData;
function toPromise(promiseLike) {
    if ((0, validator_1.isPromise)(promiseLike)) {
        return promiseLike;
    }
    return Promise.resolve(promiseLike);
}
exports.toPromise = toPromise;
function getCurrentPage() {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
}
exports.getCurrentPage = getCurrentPage;
function getPngSize(base64) {
    if (base64.substring(0, 22) === 'data:image/png;base64,') {
        var data = base64.substring(22 + 20, 22 + 32);
        var base64Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var nums = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var c_1 = data_1[_i];
            nums.push(base64Characters.indexOf(c_1));
        }
        var bytes = [];
        for (var i_1 = 0; i_1 < nums.length; i_1 += 4) {
            bytes.push((nums[i_1] << 2) + (nums[i_1 + 1] >> 4));
            bytes.push(((nums[i_1 + 1] & 15) << 4) + (nums[i_1 + 2] >> 2));
            bytes.push(((nums[i_1 + 2] & 3) << 6) + nums[i_1 + 3]);
        }
        var width = (bytes[1] << 24) + (bytes[2] << 16) + (bytes[3] << 8) + bytes[4];
        var height = (bytes[5] << 24) + (bytes[6] << 16) + (bytes[7] << 8) + bytes[8];
        return {
            width: width,
            height: height,
        };
    }
    throw Error('unsupported image type');
}
exports.getPngSize = getPngSize;
