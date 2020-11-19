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
  },
})

/**
 * @param {string|HTMLElement|JQuery} title
 * @param {string} content
 */
export function showConfirm (title = 'Bist du sicher?', content = 'Sie dürfen dies nicht wieder rückgängig machen!', callback, failCallback) {
  Swal.fire({
    title: title,
    text: content,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Zurück',
    confirmButtonText: 'OK',
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

export function toast (title = 'Erfolgreich!', type = 'success') {
  Toast.fire({
    icon: type,
    title: title,
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
    footer: '<a href="https://innerken.com">Wenden Sie sich an den Techniker</a>',
  })
}

/**
 * @param {boolean} canCancel
 */
export function showLoading (canCancel = false) {
  Swal.fire({
    title: 'Geladen',
    allowOutsideClick: () => !Swal.isLoading(),
    allowEscapeKey: canCancel,
  })
  Swal.showLoading()
}

export function hideLoading (success = 1) {
  Swal.hideLoading()
  Swal.fire({
    icon: success ? 'success' : 'error',
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
      copyTarget: obj,
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
  let arr = {}
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
  var args = arguments
  var start = args.length - 1
  return function () {
    var i = start
    var result = args[start].apply(this, arguments)
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
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ],
  NotEmpty: [v => !!v || 'Dieses Feld wird benötigt'],
}

/**
 * @param item
 * @param {number} key
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

export function play (url) {
  const audio = new Audio(url ? url : 'http://i.cloudup.com/E021I9zUG3.m4a')
  audio.play()
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

export default {
  ValidateRules,
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
  wait
}
