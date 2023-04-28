import { type PropType, type ExtractPropTypes } from 'vue';
type CheckButtonValue = string | number;
export declare const checkButtonProps: {
    options: {
        type: any;
        default: never[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: PropType<CheckButtonValue[]>;
        default: never[];
    };
    round: BooleanConstructor;
    disabled: BooleanConstructor;
    single: BooleanConstructor;
    horizon: BooleanConstructor;
    row: {
        type: NumberConstructor;
        default: number;
    };
    needIndex: BooleanConstructor;
    beforeChange: null;
};
export type CheckButtonProps = ExtractPropTypes<typeof checkButtonProps>;
declare const _default: import("vue").DefineComponent<{
    options: {
        type: any;
        default: never[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: PropType<CheckButtonValue[]>;
        default: never[];
    };
    round: BooleanConstructor;
    disabled: BooleanConstructor;
    single: BooleanConstructor;
    horizon: BooleanConstructor;
    row: {
        type: NumberConstructor;
        default: number;
    };
    needIndex: BooleanConstructor;
    beforeChange: null;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    options: {
        type: any;
        default: never[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: PropType<CheckButtonValue[]>;
        default: never[];
    };
    round: BooleanConstructor;
    disabled: BooleanConstructor;
    single: BooleanConstructor;
    horizon: BooleanConstructor;
    row: {
        type: NumberConstructor;
        default: number;
    };
    needIndex: BooleanConstructor;
    beforeChange: null;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    round: boolean;
    disabled: boolean;
    modelValue: CheckButtonValue[];
    row: number;
    single: boolean;
    options: any;
    horizon: boolean;
    needIndex: boolean;
}>;
export default _default;
