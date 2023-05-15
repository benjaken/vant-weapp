export declare const CheckButton: import("../utils").WithInstall<import("vue").DefineComponent<{
    options: {
        type: any;
        default: never[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: any;
        default: string;
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
    disabledItems: {
        type: ArrayConstructor;
        default: () => never[];
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: any;
        default: never[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: any;
        default: string;
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
    disabledItems: {
        type: ArrayConstructor;
        default: () => never[];
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    round: boolean;
    disabled: boolean;
    modelValue: any;
    row: number;
    single: boolean;
    options: any;
    horizon: boolean;
    needIndex: boolean;
    disabledItems: unknown[];
}>>;
export default CheckButton;
export { checkButtonProps } from './CheckButton';
export type { CheckButtonProps } from './CheckButton';
export type { CheckButtonThemeVars } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanCheckButton: typeof CheckButton;
    }
}
