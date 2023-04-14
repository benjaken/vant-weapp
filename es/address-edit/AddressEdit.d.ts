import { type PropType, type ExtractPropTypes } from 'vue';
import { isMobile } from '../utils';
import { AreaList } from '../area';
import type { AddressEditInfo, AddressEditSearchItem } from './types';
export declare const addressEditProps: {
    areaList: PropType<AreaList>;
    isSaving: BooleanConstructor;
    isDeleting: BooleanConstructor;
    validator: PropType<(key: string, value: string) => string | undefined>;
    showArea: {
        type: BooleanConstructor;
        default: true;
    };
    showDetail: {
        type: BooleanConstructor;
        default: true;
    };
    showDelete: BooleanConstructor;
    disableArea: BooleanConstructor;
    searchResult: PropType<AddressEditSearchItem[]>;
    telMaxlength: (NumberConstructor | StringConstructor)[];
    showSetDefault: BooleanConstructor;
    saveButtonText: StringConstructor;
    areaPlaceholder: StringConstructor;
    deleteButtonText: StringConstructor;
    showSearchResult: BooleanConstructor;
    detailRows: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    detailMaxlength: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    areaColumnsPlaceholder: {
        type: PropType<string[]>;
        default: () => never[];
    };
    addressInfo: {
        type: PropType<Partial<AddressEditInfo>>;
        default: () => AddressEditInfo;
    };
    telValidator: {
        type: PropType<(val: string) => boolean>;
        default: typeof isMobile;
    };
};
export type AddressEditProps = ExtractPropTypes<typeof addressEditProps>;
declare const _default: import("vue").DefineComponent<{
    areaList: PropType<AreaList>;
    isSaving: BooleanConstructor;
    isDeleting: BooleanConstructor;
    validator: PropType<(key: string, value: string) => string | undefined>;
    showArea: {
        type: BooleanConstructor;
        default: true;
    };
    showDetail: {
        type: BooleanConstructor;
        default: true;
    };
    showDelete: BooleanConstructor;
    disableArea: BooleanConstructor;
    searchResult: PropType<AddressEditSearchItem[]>;
    telMaxlength: (NumberConstructor | StringConstructor)[];
    showSetDefault: BooleanConstructor;
    saveButtonText: StringConstructor;
    areaPlaceholder: StringConstructor;
    deleteButtonText: StringConstructor;
    showSearchResult: BooleanConstructor;
    detailRows: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    detailMaxlength: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    areaColumnsPlaceholder: {
        type: PropType<string[]>;
        default: () => never[];
    };
    addressInfo: {
        type: PropType<Partial<AddressEditInfo>>;
        default: () => AddressEditInfo;
    };
    telValidator: {
        type: PropType<(val: string) => boolean>;
        default: typeof isMobile;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("focus" | "selectSearch" | "save" | "delete" | "clickArea" | "changeArea" | "changeDetail" | "changeDefault")[], "focus" | "selectSearch" | "save" | "delete" | "clickArea" | "changeArea" | "changeDetail" | "changeDefault", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    areaList: PropType<AreaList>;
    isSaving: BooleanConstructor;
    isDeleting: BooleanConstructor;
    validator: PropType<(key: string, value: string) => string | undefined>;
    showArea: {
        type: BooleanConstructor;
        default: true;
    };
    showDetail: {
        type: BooleanConstructor;
        default: true;
    };
    showDelete: BooleanConstructor;
    disableArea: BooleanConstructor;
    searchResult: PropType<AddressEditSearchItem[]>;
    telMaxlength: (NumberConstructor | StringConstructor)[];
    showSetDefault: BooleanConstructor;
    saveButtonText: StringConstructor;
    areaPlaceholder: StringConstructor;
    deleteButtonText: StringConstructor;
    showSearchResult: BooleanConstructor;
    detailRows: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    detailMaxlength: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    areaColumnsPlaceholder: {
        type: PropType<string[]>;
        default: () => never[];
    };
    addressInfo: {
        type: PropType<Partial<AddressEditInfo>>;
        default: () => AddressEditInfo;
    };
    telValidator: {
        type: PropType<(val: string) => boolean>;
        default: typeof isMobile;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onSelectSearch?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    onClickArea?: ((...args: any[]) => any) | undefined;
    onChangeArea?: ((...args: any[]) => any) | undefined;
    onChangeDetail?: ((...args: any[]) => any) | undefined;
    onChangeDefault?: ((...args: any[]) => any) | undefined;
}, {
    isSaving: boolean;
    isDeleting: boolean;
    showArea: boolean;
    showDetail: boolean;
    showDelete: boolean;
    disableArea: boolean;
    showSetDefault: boolean;
    showSearchResult: boolean;
    detailRows: string | number;
    detailMaxlength: string | number;
    areaColumnsPlaceholder: string[];
    addressInfo: Partial<AddressEditInfo>;
    telValidator: (val: string) => boolean;
}>;
export default _default;
