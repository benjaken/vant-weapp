export declare const SkeletonParagraph: import("../utils").WithInstall<import("vue").DefineComponent<{
    round: BooleanConstructor;
    rowWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    round: BooleanConstructor;
    rowWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
}>>, {
    round: boolean;
    rowWidth: string | number;
}>>;
export default SkeletonParagraph;
export { skeletonParagraphProps, DEFAULT_ROW_WIDTH } from './SkeletonParagraph';
export type { SkeletonParagraphProps } from './SkeletonParagraph';
declare module 'vue' {
    interface GlobalComponents {
        VanSkeletonParagraph: typeof SkeletonParagraph;
    }
}
