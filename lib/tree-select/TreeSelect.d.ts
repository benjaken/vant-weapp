import { type PropType, type ExtractPropTypes } from 'vue';
import { type Numeric } from '../utils';
export type TreeSelectChild = {
    id: Numeric;
    text: string;
    disabled?: boolean;
};
export type TreeSelectItem = {
    dot?: boolean;
    text: string;
    badge?: Numeric;
    children?: TreeSelectChild[];
    disabled?: boolean;
    className?: unknown;
};
export declare const treeSelectProps: {
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    items: {
        type: PropType<TreeSelectItem[]>;
        default: () => never[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    selectedIcon: {
        type: PropType<string>;
        default: string;
    };
    mainActiveIndex: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    activeId: {
        type: PropType<Numeric | Numeric[]>;
        default: number;
    };
};
export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>;
declare const _default: import("vue").DefineComponent<{
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    items: {
        type: PropType<TreeSelectItem[]>;
        default: () => never[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    selectedIcon: {
        type: PropType<string>;
        default: string;
    };
    mainActiveIndex: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    activeId: {
        type: PropType<Numeric | Numeric[]>;
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("clickItem" | "clickNav" | "update:activeId" | "update:mainActiveIndex")[], "clickItem" | "clickNav" | "update:activeId" | "update:mainActiveIndex", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    items: {
        type: PropType<TreeSelectItem[]>;
        default: () => never[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    selectedIcon: {
        type: PropType<string>;
        default: string;
    };
    mainActiveIndex: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    activeId: {
        type: PropType<Numeric | Numeric[]>;
        default: number;
    };
}>> & {
    onClickItem?: ((...args: any[]) => any) | undefined;
    onClickNav?: ((...args: any[]) => any) | undefined;
    "onUpdate:activeId"?: ((...args: any[]) => any) | undefined;
    "onUpdate:mainActiveIndex"?: ((...args: any[]) => any) | undefined;
}, {
    height: string | number;
    max: string | number;
    items: TreeSelectItem[];
    selectedIcon: string;
    mainActiveIndex: string | number;
    activeId: Numeric | Numeric[];
}>;
export default _default;
