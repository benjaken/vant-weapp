import { type ExtractPropTypes } from 'vue';
export declare const textEllipsisProps: {
    rows: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    dots: {
        type: import("vue").PropType<string>;
        default: string;
    };
    content: {
        type: import("vue").PropType<string>;
        default: string;
    };
    expandText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    collapseText: {
        type: import("vue").PropType<string>;
        default: string;
    };
};
export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>;
declare const _default: import("vue").DefineComponent<{
    rows: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    dots: {
        type: import("vue").PropType<string>;
        default: string;
    };
    content: {
        type: import("vue").PropType<string>;
        default: string;
    };
    expandText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    collapseText: {
        type: import("vue").PropType<string>;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "clickAction"[], "clickAction", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    rows: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    dots: {
        type: import("vue").PropType<string>;
        default: string;
    };
    content: {
        type: import("vue").PropType<string>;
        default: string;
    };
    expandText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    collapseText: {
        type: import("vue").PropType<string>;
        default: string;
    };
}>> & {
    onClickAction?: ((...args: any[]) => any) | undefined;
}, {
    content: string;
    rows: string | number;
    dots: string;
    expandText: string;
    collapseText: string;
}>;
export default _default;
