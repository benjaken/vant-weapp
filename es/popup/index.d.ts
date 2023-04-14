export declare const Popup: import("../utils").WithInstall<import("vue").DefineComponent<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: import("vue").PropType<string | import("vue").RendererElement | null | undefined>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: import("vue").PropType<import("../utils").Interceptor>;
    overlayStyle: import("vue").PropType<import("vue").CSSProperties>;
    overlayClass: import("vue").PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    round: BooleanConstructor;
    position: {
        type: import("vue").PropType<import("./types").PopupPosition>;
        default: import("./types").PopupPosition;
    };
    closeIcon: {
        type: import("vue").PropType<string>;
        default: string;
    };
    closeable: BooleanConstructor;
    transition: StringConstructor;
    iconPrefix: StringConstructor;
    closeOnPopstate: BooleanConstructor;
    closeIconPosition: {
        type: import("vue").PropType<import("./types").PopupCloseIconPosition>;
        default: import("./types").PopupCloseIconPosition;
    };
    safeAreaInsetTop: BooleanConstructor;
    safeAreaInsetBottom: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "close" | "keydown" | "opened" | "closed" | "update:show" | "clickOverlay" | "clickCloseIcon")[], "open" | "close" | "keydown" | "opened" | "closed" | "update:show" | "clickOverlay" | "clickCloseIcon", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: import("vue").PropType<string | import("vue").RendererElement | null | undefined>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: import("vue").PropType<import("../utils").Interceptor>;
    overlayStyle: import("vue").PropType<import("vue").CSSProperties>;
    overlayClass: import("vue").PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    round: BooleanConstructor;
    position: {
        type: import("vue").PropType<import("./types").PopupPosition>;
        default: import("./types").PopupPosition;
    };
    closeIcon: {
        type: import("vue").PropType<string>;
        default: string;
    };
    closeable: BooleanConstructor;
    transition: StringConstructor;
    iconPrefix: StringConstructor;
    closeOnPopstate: BooleanConstructor;
    closeIconPosition: {
        type: import("vue").PropType<import("./types").PopupCloseIconPosition>;
        default: import("./types").PopupCloseIconPosition;
    };
    safeAreaInsetTop: BooleanConstructor;
    safeAreaInsetBottom: BooleanConstructor;
}>> & {
    onKeydown?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onOpened?: ((...args: any[]) => any) | undefined;
    onClosed?: ((...args: any[]) => any) | undefined;
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
    onClickOverlay?: ((...args: any[]) => any) | undefined;
    onClickCloseIcon?: ((...args: any[]) => any) | undefined;
}, {
    position: import("./types").PopupPosition;
    round: boolean;
    safeAreaInsetBottom: boolean;
    overlay: boolean;
    show: boolean;
    lockScroll: boolean;
    lazyRender: boolean;
    transitionAppear: boolean;
    closeOnClickOverlay: boolean;
    closeIcon: string;
    closeable: boolean;
    closeOnPopstate: boolean;
    closeIconPosition: import("./types").PopupCloseIconPosition;
    safeAreaInsetTop: boolean;
}>>;
export default Popup;
export { popupProps } from './Popup';
export type { PopupProps } from './Popup';
export type { PopupPosition, PopupInstance, PopupThemeVars, PopupCloseIconPosition, } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanPopup: typeof Popup;
    }
}
