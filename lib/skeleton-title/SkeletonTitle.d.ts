import { type ExtractPropTypes } from 'vue';
export declare const skeletonTitleProps: {
    round: BooleanConstructor;
    titleWidth: (NumberConstructor | StringConstructor)[];
};
export type SkeletonTitleProps = ExtractPropTypes<typeof skeletonTitleProps>;
declare const _default: import("vue").DefineComponent<{
    round: BooleanConstructor;
    titleWidth: (NumberConstructor | StringConstructor)[];
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    round: BooleanConstructor;
    titleWidth: (NumberConstructor | StringConstructor)[];
}>>, {
    round: boolean;
}>;
export default _default;
