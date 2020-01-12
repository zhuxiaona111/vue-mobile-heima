// 定义一个常亮接收数据
const USER_TOKEN = 'hm-mobile-news-token'
// 设置token
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 获取token
export function getUser () {
  JSON.parse(localStorage.getItem(USER_TOKEN) || '{}')
}
// 删除token
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
