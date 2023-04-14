export declare const Toast: import("../utils").WithInstall<import("vue").DefineComponent<{
    icon: StringConstructor;
    show: BooleanConstructor;
    type: {
        type: import("vue").PropType<import("./types").ToastType>;
        default: import("./types").ToastType;
    };
    overlay: BooleanConstructor;
    message: (NumberConstructor | StringConstructor)[];
    iconSize: (NumberConstructor | StringConstructor)[];
    duration: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: import("vue").PropType<import("./types").ToastPosition>;
        default: import("./types").ToastPosition;
    };
    teleport: import("vue").PropType<string | import("vue").RendererElement | null | undefined>;
    wordBreak: import("vue").PropType<import("./types").ToastWordBreak>;
    className: import("vue").PropType<unknown>;
    iconPrefix: StringConstructor;
    transition: {
        type: import("vue").PropType<string>;
        default: string;
    };
    loadingType: import("vue").PropType<import("..").LoadingType>;
    forbidClick: BooleanConstructor;
    overlayClass: import("vue").PropType<unknown>;
    overlayStyle: import("vue").PropType<import("vue").CSSProperties>;
    closeOnClick: BooleanConstructor;
    closeOnClickOverlay: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:show"[], "update:show", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    icon: StringConstructor;
    show: BooleanConstructor;
    type: {
        type: import("vue").PropType<import("./types").ToastType>;
        default: import("./types").ToastType;
    };
    overlay: BooleanConstructor;
    message: (NumberConstructor | StringConstructor)[];
    iconSize: (NumberConstructor | StringConstructor)[];
    duration: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: import("vue").PropType<import("./types").ToastPosition>;
        default: import("./types").ToastPosition;
    };
    teleport: import("vue").PropType<string | import("vue").RendererElement | null | undefined>;
    wordBreak: import("vue").PropType<import("./types").ToastWordBreak>;
    className: import("vue").PropType<unknown>;
    iconPrefix: StringConstructor;
    transition: {
        type: import("vue").PropType<string>;
        default: string;
    };
    loadingType: import("vue").PropType<import("..").LoadingType>;
    forbidClick: BooleanConstructor;
    overlayClass: import("vue").PropType<unknown>;
    overlayStyle: import("vue").PropType<import("vue").CSSProperties>;
    closeOnClick: BooleanConstructor;
    closeOnClickOverlay: BooleanConstructor;
}>> & {
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
}, {
    type: import("./types").ToastType;
    position: import("./types").ToastPosition;
    overlay: boolean;
    show: boolean;
    duration: number;
    closeOnClickOverlay: boolean;
    transition: string;
    forbidClick: boolean;
    closeOnClick: boolean;
}>>;
export default Toast;
export { toastProps } from './Toast';
export { showToast, closeToast, showFailToast, showLoadingToast, showSuccessToast, allowMultipleToast, setToastDefaultOptions, resetToastDefaultOptions, } from './function-call';
export type { ToastProps } from './Toast';
export type { ToastType, ToastOptions, ToastPosition, ToastThemeVars, ToastWordBreak, } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanToast: typeof Toast;
    }
}
