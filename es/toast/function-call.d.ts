import type { ToastType, ToastOptions, ToastWrapperInstance } from './types';
export declare function showToast(options?: string | ToastOptions): ToastWrapperInstance;
export declare const showLoadingToast: (options: string | ToastOptions) => ToastWrapperInstance;
export declare const showSuccessToast: (options: string | ToastOptions) => ToastWrapperInstance;
export declare const showFailToast: (options: string | ToastOptions) => ToastWrapperInstance;
export declare const closeToast: (all?: boolean) => void;
export declare function setToastDefaultOptions(options: ToastOptions): void;
export declare function setToastDefaultOptions(type: ToastType, options: ToastOptions): void;
export declare const resetToastDefaultOptions: (type?: ToastType) => void;
export declare const allowMultipleToast: (value?: boolean) => void;
