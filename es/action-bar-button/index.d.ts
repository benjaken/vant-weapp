export declare const ActionBarButton: import("../utils").WithInstall<import("vue").DefineComponent<{
    to: import("vue").PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    type: import("vue").PropType<import("..").ButtonType>;
    text: StringConstructor;
    icon: StringConstructor;
    color: StringConstructor;
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    to: import("vue").PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    type: import("vue").PropType<import("..").ButtonType>;
    text: StringConstructor;
    icon: StringConstructor;
    color: StringConstructor;
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
}>>, {
    replace: boolean;
    disabled: boolean;
    loading: boolean;
}>>;
export default ActionBarButton;
export { actionBarButtonProps } from './ActionBarButton';
export type { ActionBarButtonProps } from './ActionBarButton';
export type { ActionBarButtonThemeVars } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanActionBarButton: typeof ActionBarButton;
    }
}
