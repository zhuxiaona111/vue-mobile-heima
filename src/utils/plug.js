// 封装休眠函数
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time)
  })
}

export default {
  install (Vue) {
    Vue.prototype.$sleep = sleep
  }
}
