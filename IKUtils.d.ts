export type SweetAlertInput =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'range'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'file'
    | 'url';

export interface IKUtils {
    ValidateRules: {
        Email: Array<(v: string) => boolean | string>;
        NotEmpty: Array<(v: string) => boolean | string>;
    };

    compose: (...funcs: Array<(...args: any[]) => any>) => (...args: any[]) => any;
    trick: () => string;

    delCookie: (name: string) => void;

    setCookie: (cName: string, value: string, expireDays: number) => void;

    getCookie: (name: string) => string | null;

    deepCopy: <T extends object>(target: T) => T;

    hideLoading: (success?: number) => void;

    showLoading: (canCancel?: boolean) => void;

    showError: (content?: string, title?: string) => void;

    toast: (title?: string, type?: 'success' | 'error' | 'info' | 'warning') => void;

    showConfirm: (
        title?: string,
        content?: string,
        callback?: () => void,
        failCallback?: () => void
    ) => void;

    showConfirmAsyn: (
        str: string,
        title?: string
    ) => Promise<{ value?: any; dismiss?: boolean }>;

    showInput: (
        title?: string,
        inputType?: SweetAlertInput,
        text?: string
    ) => Promise<string | null>;

    checkKeyExist: (item: object, key: string) => boolean;

    safeCallFunction: (
        on: object,
        func: (...args: any[]) => any,
        ...args: any[]
    ) => any;

    extend: <T extends object, U extends object>(
        target: T,
        ...args: U[]
    ) => T & U;

    toggleElement: <T>(el: T, arr: T[]) => void;

    removeElement: <T>(el: T, arr: T[]) => void;

    play: (url?: string) => void;

    getQueryString: (name: string) => string | null;

    wait: (time: number) => Promise<void>;

    init: (i18n: { t: (key: string) => string }) => void;

    base64UrlEncode: (obj: object) => string;

    base64UrlDecode: (base64UrlStr: string) => object | null;
}

export declare const IKUtils: IKUtils;
export default IKUtils;
