export declare const CheckButton: import("../utils").WithInstall<import("vue").DefineComponent<{
    options: {
        type: import("vue").PropType<string[]>;
        default: never[];
    };
    modelValue: {
        type: import("vue").PropType<(string | number)[]>;
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
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: import("vue").PropType<string[]>;
        default: never[];
    };
    modelValue: {
        type: import("vue").PropType<(string | number)[]>;
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
    round: boolean;
    disabled: boolean;
    modelValue: (string | number)[];
    row: number;
    single: boolean;
    options: string[];
    horizon: boolean;
    needIndex: boolean;
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
