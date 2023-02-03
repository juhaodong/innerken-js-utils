export type SweetAlertInput =
    'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' |
    'file' | 'url';

export interface IKUtils {
    ValidateRules,

    compose(): string, //not sure return value
    trick,

    delCookie(name),

    setCookie(cName, value: string, expireDays: number),

    getCookie(name): string, //not sure
    deepCopy(target: object): object,

    hideLoading(success: number),

    showLoading(canCancel: boolean),

    showError(content?: string, title?: string),

    toast(title?: string, type?: string),

    showConfirm(content?: string, title?: string),

    showConfirmAsyn(str: string, title?: string),

    showInput(title?: string, inputType?: SweetAlertInput, text?: string): Promise<string>

    checkKeyExist(item, key: string): boolean,

    safeCallFunction(on: object, func, ...args),

    extend(target: object, args): object, //not sure
    toggleElement(el: object, arr: any[]),

    removeElement(el: object, arr: any[]),

    play(url?: string),

    getQueryString(name: string): string, //not sure
    wait(time): Promise<any> //not sure
}

export declare const IKUtils: IKUtils
export default IKUtils
