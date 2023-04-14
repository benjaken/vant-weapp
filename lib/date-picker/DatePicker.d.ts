import { type PropType, type ExtractPropTypes } from 'vue';
export type DatePickerColumnType = 'year' | 'month' | 'day';
export declare const datePickerProps: {
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    optionHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleOptionNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
} & {
    modelValue: {
        type: PropType<string[]>;
        default: () => never[];
    };
    filter: PropType<(columnType: string, options: import("../picker").PickerOption[]) => import("../picker").PickerOption[]>;
    formatter: {
        type: PropType<(type: string, option: import("../picker").PickerOption) => import("../picker").PickerOption>;
        default: (type: string, option: import("../picker").PickerOption) => import("../picker").PickerOption;
    };
} & {
    columnsType: {
        type: PropType<DatePickerColumnType[]>;
        default: () => string[];
    };
    minDate: {
        type: DateConstructor;
        default: () => Date;
        validator: (val: unknown) => val is Date;
    };
    maxDate: {
        type: DateConstructor;
        default: () => Date;
        validator: (val: unknown) => val is Date;
    };
};
export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;
declare const _default: import("vue").DefineComponent<{
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    optionHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleOptionNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
} & {
    modelValue: {
        type: PropType<string[]>;
        default: () => never[];
    };
    filter: PropType<(columnType: string, options: import("../picker").PickerOption[]) => import("../picker").PickerOption[]>;
    formatter: {
        type: PropType<(type: string, option: import("../picker").PickerOption) => import("../picker").PickerOption>;
        default: (type: string, option: import("../picker").PickerOption) => import("../picker").PickerOption;
    };
} & {
    columnsType: {
        type: PropType<DatePickerColumnType[]>;
        default: () => string[];
    };
    minDate: {
        type: DateConstructor;
        default: () => Date;
        validator: (val: unknown) => val is Date;
    };
    maxDate: {
        type: DateConstructor;
        default: () => Date;
        validator: (val: unknown) => val is Date;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "cancel" | "change" | "confirm")[], "update:modelValue" | "cancel" | "change" | "confirm", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    optionHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleOptionNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
} & {
    modelValue: {
        type: PropType<string[]>;
        default: () => never[];
    };
    filter: PropType<(columnType: string, options: import("../picker").PickerOption[]) => import("../picker").PickerOption[]>;
    formatter: {
        type: PropType<(type: string, option: import("../picker").PickerOption) => import("../picker").PickerOption>;
        default: (type: string, option: import("../picker").PickerOption) => import("../picker").PickerOption;
    };
} & {
    columnsType: {
        type: PropType<DatePickerColumnType[]>;
        default: () => string[];
    };
    minDate: {
        type: DateConstructor;
        default: () => Date;
        validator: (val: unknown) => val is Date;
    };
    maxDate: {
        type: DateConstructor;
        default: () => Date;
        validator: (val: unknown) => val is Date;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
}, {
    formatter: (type: string, option: import("../picker").PickerOption) => import("../picker").PickerOption;
    modelValue: string[];
    readonly: boolean;
    loading: boolean;
    allowHtml: boolean;
    optionHeight: string | number;
    showToolbar: boolean;
    swipeDuration: string | number;
    visibleOptionNum: string | number;
    minDate: Date;
    maxDate: Date;
    columnsType: DatePickerColumnType[];
}>;
export default _default;
