import { DatePickerProps } from './DatePicker';
export declare const DatePicker: import("../utils").WithInstall<import("vue").DefineComponent<{
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
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    filter: import("vue").PropType<(columnType: string, options: import("..").PickerOption[]) => import("..").PickerOption[]>;
    formatter: {
        type: import("vue").PropType<(type: string, option: import("..").PickerOption) => import("..").PickerOption>;
        default: (type: string, option: import("..").PickerOption) => import("..").PickerOption;
    };
} & {
    columnsType: {
        type: import("vue").PropType<import("./DatePicker").DatePickerColumnType[]>;
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
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "cancel" | "change" | "confirm")[], "update:modelValue" | "cancel" | "change" | "confirm", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    filter: import("vue").PropType<(columnType: string, options: import("..").PickerOption[]) => import("..").PickerOption[]>;
    formatter: {
        type: import("vue").PropType<(type: string, option: import("..").PickerOption) => import("..").PickerOption>;
        default: (type: string, option: import("..").PickerOption) => import("..").PickerOption;
    };
} & {
    columnsType: {
        type: import("vue").PropType<import("./DatePicker").DatePickerColumnType[]>;
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
    formatter: (type: string, option: import("..").PickerOption) => import("..").PickerOption;
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
    columnsType: import("./DatePicker").DatePickerColumnType[];
}>>;
export default DatePicker;
export { datePickerProps } from './DatePicker';
export type { DatePickerProps };
export type { DatePickerColumnType } from './DatePicker';
declare module 'vue' {
    interface GlobalComponents {
        VanDatePicker: typeof DatePicker;
    }
}
