export interface IKUtils{
    ValidateRules,
    compose():string, //not sure return value
    trick,
    delCookie(name),
    setCookie(cName, value:string, expireDays:number),
    getCookie(name):string, //not sure
    deepCopy(target:object):object,
    hideLoading(success:number),
    showLoading(canCancel:boolean),
    showError(content?:string, title?:string),
    toast(title?:string, type?:string),
    showConfirm(content?:string, title?:string ),
    checkKeyExist(item, key:string):boolean,
    safeCallFunction(on:object, func, args:string):function, //not sure
    extend(target:object, args):object, //not sure
    toggleElement(el:object, arr:any[]),
    removeElement(el:object, arr:any[]),
    play(url),
    getQueryString(name:string):function, //not sure
    wait(time):Promise //not sure
}

export declare const IKUtils:IKUtils
export default IKUtils
