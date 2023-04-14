import { type PropType, type ExtractPropTypes } from 'vue';
import { type BadgeProps } from '../badge';
export declare const sidebarItemProps: {
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    dot: BooleanConstructor;
    title: StringConstructor;
    badge: (NumberConstructor | StringConstructor)[];
    disabled: BooleanConstructor;
    badgeProps: PropType<Partial<BadgeProps>>;
};
export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>;
declare const _default: import("vue").DefineComponent<{
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    dot: BooleanConstructor;
    title: StringConstructor;
    badge: (NumberConstructor | StringConstructor)[];
    disabled: BooleanConstructor;
    badgeProps: PropType<Partial<BadgeProps>>;
}, (() => JSX.Element) | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    dot: BooleanConstructor;
    title: StringConstructor;
    badge: (NumberConstructor | StringConstructor)[];
    disabled: BooleanConstructor;
    badgeProps: PropType<Partial<BadgeProps>>;
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    replace: boolean;
    dot: boolean;
    disabled: boolean;
}>;
export default _default;
