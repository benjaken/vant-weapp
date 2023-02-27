import { isDef, isNumber, isPlainObject, isPromise } from './validator';
import { canIUseGroupSetData, canIUseNextTick } from './version';
export { isDef } from './validator';
export function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
export function nextTick(cb) {
    if (canIUseNextTick()) {
        wx.nextTick(cb);
    }
    else {
        setTimeout(() => {
            cb();
        }, 1000 / 30);
    }
}
let systemInfo;
export function getSystemInfoSync() {
    if (systemInfo == null) {
        systemInfo = wx.getSystemInfoSync();
    }
    return systemInfo;
}
export function addUnit(value) {
    if (!isDef(value)) {
        return undefined;
    }
    value = String(value);
    return isNumber(value) ? `${value}px` : value;
}
export function requestAnimationFrame(cb) {
    return wx
        .createSelectorQuery()
        .selectViewport()
        .boundingClientRect()
        .exec(() => {
        cb();
    });
}
export function pickExclude(obj, keys) {
    if (!isPlainObject(obj)) {
        return {};
    }
    return Object.keys(obj).reduce((prev, key) => {
        if (!keys.includes(key)) {
            prev[key] = obj[key];
        }
        return prev;
    }, {});
}
export function getRect(context, selector) {
    return new Promise((resolve) => {
        wx.createSelectorQuery()
            .in(context)
            .select(selector)
            .boundingClientRect()
            .exec((rect = []) => resolve(rect[0]));
    });
}
export function getAllRect(context, selector) {
    return new Promise((resolve) => {
        wx.createSelectorQuery()
            .in(context)
            .selectAll(selector)
            .boundingClientRect()
            .exec((rect = []) => {
            resolve(rect[0]);
        });
    });
}
export function getScrollOffset() {
    return new Promise((resolve) => {
        wx.createSelectorQuery().selectViewport().scrollOffset(resolve).exec();
    });
}
export function groupSetData(context, cb) {
    if (canIUseGroupSetData()) {
        context.groupSetData(cb);
    }
    else {
        cb();
    }
}
export function toPromise(promiseLike) {
    if (isPromise(promiseLike)) {
        return promiseLike;
    }
    return Promise.resolve(promiseLike);
}
export function getCurrentPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
export function getPngSize(base64) {
    if (base64.substring(0, 22) === 'data:image/png;base64,') {
        const data = base64.substring(22 + 20, 22 + 32);
        const base64Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        const nums = [];
        for (const c of data) {
            nums.push(base64Characters.indexOf(c));
        }
        const bytes = [];
        for (let i = 0; i < nums.length; i += 4) {
            bytes.push((nums[i] << 2) + (nums[i + 1] >> 4));
            bytes.push(((nums[i + 1] & 15) << 4) + (nums[i + 2] >> 2));
            bytes.push(((nums[i + 2] & 3) << 6) + nums[i + 3]);
        }
        const width = (bytes[1] << 24) + (bytes[2] << 16) + (bytes[3] << 8) + bytes[4];
        const height = (bytes[5] << 24) + (bytes[6] << 16) + (bytes[7] << 8) + bytes[8];
        return {
            width,
            height,
        };
    }
    throw Error('unsupported image type');
}
