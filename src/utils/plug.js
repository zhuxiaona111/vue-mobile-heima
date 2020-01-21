// 引入时间转换的插件
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
export default {
  install (Vue) {
    Vue.prototype.$sleep = sleep
    // 时间处理要用过滤器
    Vue.filter('reltime', reltime)
  }
}
// 封装休眠函数
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time)
  })
}
// 定义时间处理函数
function reltime (value) {
  return dayjs().locale('zh-cn').from(value)
}
