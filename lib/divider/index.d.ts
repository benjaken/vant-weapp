export declare const Divider: import("../utils").WithInstall<import("vue").DefineComponent<{
    dashed: BooleanConstructor;
    hairline: {
        type: BooleanConstructor;
        default: true;
    };
    contentPosition: {
        type: import("vue").PropType<import("./Divider").DividerContentPosition>;
        default: import("./Divider").DividerContentPosition;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    dashed: BooleanConstructor;
    hairline: {
        type: BooleanConstructor;
        default: true;
    };
    contentPosition: {
        type: import("vue").PropType<import("./Divider").DividerContentPosition>;
        default: import("./Divider").DividerContentPosition;
    };
}>>, {
    hairline: boolean;
    dashed: boolean;
    contentPosition: import("./Divider").DividerContentPosition;
}>>;
export default Divider;
export { dividerProps } from './Divider';
export type { DividerProps, DividerContentPosition } from './Divider';
export type { DividerThemeVars } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanDivider: typeof Divider;
    }
}
