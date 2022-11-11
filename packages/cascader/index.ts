import { GREEN } from '../common/color';
import { VantComponent } from '../common/component';

export type CascaderOption = {
  text?: string;
  value?: string;
  color?: string;
  disabled?: boolean;
  children?: CascaderOption[];
  className?: unknown;
  // for custom filed names
  [key: PropertyKey]: any;
};

export type CascaderTab = {
  options: CascaderOption[];
  selected: CascaderOption | null;
};

export type CascaderFieldNames = {
  text?: string;
  value?: string;
  children?: string;
};

VantComponent({
  props: {
    show: {
      type: Boolean,
      value: false,
    },
    title: null,
    value: {
      type: String,
      value: '',
      observer(value) {
        const { fieldNames } = this.properties;
        if (value !== undefined) {
          const values = this.data.tabs.map((tab) => tab.selected?.[fieldNames.value]);
          if (values.includes(value)) {
            return;
          }
        }
        this.updateTabs();
      },
    },
    options: {
      type: Array,
      value: [] as CascaderOption[],
      observer() {
        this.updateTabs();
      },
    },
    placeholder: {
      type: String,
      value: '请选择',
    },
    activeColor: {
      type: String,
      value: GREEN,
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
      } as CascaderFieldNames,
    }
  },
  data: {
    active: 0,
    tabs: [] as CascaderTab[],
  },
  mounted() {
    this.updateTabs()
  },
  methods: {
    getSelectedOptionsByValue(
      options: CascaderOption[],
      value: string
    ): CascaderOption[] | undefined {
      const { fieldNames } = this.properties
      // eslint-disable-next-line no-restricted-syntax
      for (const option of options) {
        if (option[fieldNames.value] === value) {
          return [option];
        }
        if (option[fieldNames.children]) {
          const selectedOptions = this.getSelectedOptionsByValue(
            option[fieldNames.children],
            value
          );
          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    },
    onTabChange({ detail }) {
      this.setData({
        active: detail.index
      })
    },
    onClickOverlay() {
      this.setData({
        show: false,
      });
      this.$emit('close');
    },
    onClickTab({ name, title }) {
      this.$emit('click-tab', name, title);
    },
    updateTabs() {
      const { options, value, fieldNames } = this.properties;
      let { tabs } = this.data;
      if (value !== undefined) {
        const selectedOptions = this.getSelectedOptionsByValue(options, value);
        if (selectedOptions) {
          let optionsCursor = options;
          tabs = selectedOptions.map((option) => {
            const tab = {
              options: optionsCursor,
              selected: option,
            };
            const next = optionsCursor.find(
              (item) => item[fieldNames.value] === option[fieldNames.value]
            );
            if (next) {
              optionsCursor = next[fieldNames.children];
            }
            return tab;
          });
          if (optionsCursor) {
            tabs.push({
              options: optionsCursor,
              selected: null,
            });
          }
          wx.nextTick(() => {
            this.setData({
              tabs,
              active: tabs.length - 1,
            });
          });
          return;
        }
      }
      this.setData({
        tabs: [
          {
            options,
            selected: null,
          },
        ],
      });
    },
    onSelect({ currentTarget: { dataset } }) {
      const { option, index } = dataset;
      const { fieldNames } = this.properties;
      let { tabs } = this.data;
      const { active } = this.data
      if (option.disabled) return;
      tabs[index].selected = option;
      if (tabs.length > index + 1) {
        tabs = tabs.slice(0, index + 1);
      }
      this.setData({ tabs });
      if (option[fieldNames.children]) {
        const nextTab = {
          options: option[fieldNames.children],
          selected: null,
        };
        if (tabs[index + 1]) {
          tabs[index + 1] = nextTab;
        } else {
          tabs.push(nextTab);
        }
        wx.nextTick(() => {
          this.setData({
            tabs,
            active: active + 1,
          });
        });
      }
      const selectedOptions = tabs.map((tab) => tab.selected).filter(Boolean);
      this.setData({
        value: option[fieldNames.value],
      });
      const params = {
        value: option[fieldNames.value],
        tabIndex: index,
        selectedOptions,
      };
      this.$emit('change', params);
      if (!option[fieldNames.children]) {
        this.$emit('finish', params);
        this.setData({
          show: false
        })
      }
    },
  },
});
