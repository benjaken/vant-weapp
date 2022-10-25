import { getScrollOffset } from '../common/utils';
import { VantComponent } from '../common/component';
VantComponent({
    props: {
        data: {
            type: Object,
            value: {}
        },
        isDev: {
            type: Boolean,
            value: false
        },
        wrapper: {
            type: String,
            value: 'container'
        },
        selector: {
            type: String,
            value: 'skeleton'
        },
        bgcolor: {
            type: String,
            value: '#f2f2f2'
        },
        loading: {
            type: String,
            value: 'shine'
        }
    },
    data: {
        physicalRadio: 2,
        isShowByDev: false,
        devData: {},
        skeletonWidth: 375,
        skeletonHeight: 667,
        selectorTypes: ['bg', 'rect', 'circle']
    },
    created() {
        const { windowWidth, windowHeight } = wx.getSystemInfoSync();
        this.setData({
            physicalRadio: 750 / windowWidth,
            skeletonHeight: windowHeight
        });
    },
    methods: {
        getElements(selector) {
            return new Promise(resolve => {
                wx.createSelectorQuery()
                    .selectAll(selector)
                    .fields({
                    dataset: true,
                    id: true,
                    rect: true,
                    size: true
                })
                    .exec(res => resolve(res[0]));
            });
        },
        toggleBtnTap() {
            if (this.data.isShowByDev) {
                this.setData({
                    isShowByDev: false
                });
            }
            else {
                this.calcData().then((data) => {
                    this.print(data);
                    this.setData({
                        devData: data,
                        isShowByDev: true
                    });
                });
            }
        },
        print(data) {
            console.log(JSON.stringify(data, null, 2));
        },
        objToStyle(obj) {
            const { physicalRadio } = this.data;
            return Object.keys(obj)
                .map((key) => `${key}:${obj[key] * physicalRadio}rpx`)
                .join(';');
        },
        calcData() {
            const { wrapper, selector } = this.data;
            return Promise.all([
                getScrollOffset(),
                this.getElements(`.${wrapper} >>> .${selector}`),
            ]).then(([scrollOffset, [container]]) => {
                const { width, height, top, left } = container;
                return this.calcStyleLists(container).then((lists) => ({
                    container: this.objToStyle({
                        width,
                        height,
                        top: top + scrollOffset.scrollTop,
                        left: left + scrollOffset.scrollLeft,
                    }),
                    lists,
                }));
            });
        },
        calcStyleLists(container) {
            const { top, left, right, bottom } = container;
            const { wrapper, selector, selectorTypes } = this.data;
            const promises = selectorTypes.map((type) => this.getElements(`.${wrapper} >>> .${selector}-${type}`)
                .then((elements) => elements
                .filter((vo) => vo.left < right &&
                vo.right > left &&
                vo.top < bottom &&
                vo.bottom > top)
                .map((vo) => this.objToStyle({
                width: vo.width,
                height: vo.height,
                left: vo.left - left,
                top: vo.top - top,
            })))
                .then((elements) => ({
                type,
                elements,
            })));
            return Promise.all(promises);
        },
    },
});
