import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

let i18n = (key) => key

export function init (i) {
  i18n = i
}

export async function showInput (title = 'Please Input ...', inputType = 'number', text = '') {
  const res = (await Swal.fire({
    input: inputType,
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: i18n.t('Zurück'),
    confirmButtonText: i18n.t('OK')
  }))
  if (res.isConfirmed) {
    return res.value
  } else {
    return null
  }
}

/**
 * @param {string|HTMLElement|JQuery} title
 * @param {string} content
 * @param callback
 * @param failCallback
 */
export function showConfirm (title = 'Bist du sicher?', content = 'Sie dürfen dies nicht wieder rückgängig machen!',
  callback, failCallback) {
  Swal.fire({
    title: title,
    text: content,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: i18n.t('Zurück'),
    confirmButtonText: i18n.t('OK')
  }).then((result) => {
    if (result.value) {
      if (callback) {
        callback()
      }
    } else {
      if (failCallback) {
        failCallback()
      }
    }
  })
}

export function showConfirmAsyn (str, title = 'areYouSure') {
  return Swal.fire({
    title: title,
    html: str,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: i18n.t('Zurück'),
    confirmButtonText: i18n.t('OK')
  })
}

export function toast (title = 'Erfolgreich!', type = 'success') {
  Toast.fire({
    icon: type,
    title: title
  })
}

/**
 * @param {string} content
 * @param {string|HTMLElement|JQuery} title
 */
export function showError (content = 'Etwas ist schief gelaufen!', title = 'Oops...') {
  Swal.fire({
    icon: 'error',
    title: title,
    text: content,
    footer: '<a href="https://innerken.com">Wenden Sie sich an den Techniker</a>'
  })
}

/**
 * @param {boolean} canCancel
 */
export function showLoading (canCancel = false) {
  Swal.fire({
    title: i18n.t('Geladen'),
    allowOutsideClick: () => canCancel,
    allowEscapeKey: canCancel
  })
  Swal.showLoading()
}

export function hideLoading (success = 1) {
  Swal.hideLoading()
  Swal.fire({
    icon: success ? 'success' : 'error'
  })
}

/**
 * @param {Object} target
 */
export function deepCopy (target) {
  const copiedObjs = []// 此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  function _deepCopy (target) {
    if ((typeof target !== 'object') || !target) {
      return target
    }
    for (let i = 0; i < copiedObjs.length; i++) {
      if (copiedObjs[i].target === target) {
        return copiedObjs[i].copyTarget
      }
    }
    let obj = {}
    if (Array.isArray(target)) {
      obj = []// 处理target是数组的情况
    }
    copiedObjs.push({
      target: target,
      copyTarget: obj
    })
    Object.keys(target).forEach(key => {
      if (obj[key]) {
        return
      }
      obj[key] = _deepCopy(target[key])
    })
    return obj
  }

  return _deepCopy(target)
}

// 获取cookie
export function getCookie (name) {
  const arr = {}
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr === document.cookie.match(reg)) {
    return (arr[2])
  } else {
    return null
  }
}

// 设置cookie,增加到vue实例方便全局调用
/**
 * @param cName
 * @param {string} value
 * @param {number} expireDays
 */
export function setCookie (cName, value, expireDays) {
  const exdate = new Date()
  exdate.setDate(exdate.getDate() + expireDays)
  document.cookie = cName + '=' + escape(value) + ((expireDays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 删除cookie
export function delCookie (name) {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = this.getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

export function trick () {
  [[][0] + []][0][5] +
  [[][[[][0] + []][0][4] + [[][0] + []][0][5] + [[][0] + []][0][1] + [[][0] + []][0][2]] + []][0][8] +
  [[[] == []][0] + []][0][2] +
  [[][[[][0] + []][0][4] + [[][0] + []][0][5] + [[][0] + []][0][1] + [[][0] + []][0][2]] + []][0][6] +
  [[][[[][0] + []][0][4] + [[][0] + []][0][5] + [[][0] + []][0][1] + [[][0] + []][0][2]] + []][0][23] +
  [[][0] + []][0][3] +
  [[][[[][0] + []][0][4] + [[][0] + []][0][5] + [[][0] + []][0][1] + [[][0] + []][0][2]] + []][0][8] +
  [+[1 + [[][0] + []][0][3] + 309][0] + []][0][7] +
  [[][[[][0] + []][0][4] + [[][0] + []][0][5] + [[][0] + []][0][1] + [[][0] + []][0][2]] + []][0][6] +
  [[][0] + []][0][0]
}

export function compose () {
  const args = arguments
  const start = args.length - 1
  return function () {
    let i = start
    let result = args[start].apply(this, arguments)
    while (i--) result = args[i].call(this, result)
    return result
  }
}

export async function wait (time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const ValidateRules = {
  Email: [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
  ],
  NotEmpty: [v => !!v || 'Dieses Feld wird benötigt']
}

/**
 * @param item
 * @param {string} key
 */
export function checkKeyExist (item, key) {
  return !!item[key]
}

/**
 * @param {Object} on
 * @param {function} func
 * @param {(string|(any|any)[])[]} args
 */
export function safeCallFunction (on, func, ...args) {
  if (typeof func === 'function') {
    return func.call(on, ...args)
  }
  return safeCallFunction(this, showError, ('Calling a Invalid Function'))
}

const singleAudio = new Audio('https://i.cloudup.com/E021I9zUG3.m4a')

export function play (url) {
  singleAudio.src = url || 'https://i.cloudup.com/E021I9zUG3.m4a'
  singleAudio.play()
}

/**
 * @param {Object} target
 * @param args
 * @return
 */
function extend (target, ...args) {
  return Object.assign(deepCopy(target), ...args)
}

/**
 * @param {Object} el
 * @param {Array} arr
 * @return
 */
export function toggleElement (el, arr) {
  if (arr.includes(el)) {
    arr.push(el)
  } else {
    removeElement(el, arr)
  }
}

/**
 * @param {Object} el
 * @param {Array} arr
 * @return
 */

export function removeElement (el, arr) {
  arr.splice(arr.indexOf(el), 1)
}

/**
 * @param {string} name
 */
function getQueryString (name) {
  return decodeURIComponent(
    (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
}

/**
 * 将对象编码为 URL 安全的 Base64 字符串
 * @param {object} obj 要编码的对象
 * @returns {string} URL 安全的 Base64 编码字符串
 */
function base64UrlEncode (obj) {
  // 首先将对象序列化为 JSON 字符串
  const jsonString = JSON.stringify(obj)

  // 然后使用 btoa 进行标准的 Base64 编码
  const base64 = btoa(unescape(encodeURIComponent(jsonString)))

  // 然后将 Base64 编码中的 '+'、'/' 和 '=' 替换为 URL 安全的字符
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/**
 * 将 URL 安全的 Base64 字符串解码为原始对象
 * @param {string} base64UrlStr URL 安全的 Base64 编码字符串
 * @returns {object} 解码后的对象
 */
function base64UrlDecode (base64UrlStr) {
  // 首先将 URL 安全的字符 '-' 和 '_' 替换回 Base64 的 '+' 和 '/'
  let base64 = base64UrlStr.replace(/-/g, '+').replace(/_/g, '/')

  // 确保 Base64 字符串的长度是 4 的倍数，如果不是，则添加 '=' 填充字符
  while (base64.length % 4) {
    base64 += '='
  }

  // 使用 atob 进行 Base64 解码
  try {
    const jsonString = decodeURIComponent(escape(atob(base64)))
    // 将 JSON 字符串解析为 JavaScript 对象
    return JSON.parse(jsonString)
  } catch (e) {
    console.error('解码失败：', e)
    return null
  }
}

export default {
  ValidateRules,
  base64UrlDecode,
  base64UrlEncode,
  compose,
  trick,
  delCookie,
  setCookie,
  getCookie,
  deepCopy,
  hideLoading,
  showLoading,
  showError,
  toast,
  showConfirm,
  checkKeyExist,
  safeCallFunction,
  extend,
  toggleElement,
  removeElement,
  play,
  getQueryString,
  wait,
  showConfirmAsyn,
  showInput,
  init,
}
