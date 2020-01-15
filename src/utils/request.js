import axios from 'axios'
import BigInt from 'json-bigint'
import store from '@/store'
import router from 'vue-router'
const instance = axios.create({
  // 1.配置基础地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  // 2.设置最大安全数字
  transformResponse: [function (data) {
    try {
      return BigInt.parse(data)
    } catch (error) {
      return data
    }
  }]
})
// 3.请求拦截器，处理携带token问题
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    // 当store有token时，在请求头上加token
    config.headers['Authorization'] = `bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 4.响应拦截器，处理token失效问题
instance.interceptors.response.use(function (response) {
  try {
    // 返回成功数据进行数据处理===去data
    return response.data.data
  } catch (error) {
    // 返回错误时
    return response.data
  }
}, async function (error) {
  if (error.response && error.response.status === 401) {
  // 处理没有token，保存当前访问页面的信息，
    let topath = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
    // 5. 处理token失效
    if (error.response && error.state === 401) {
      if (store.state.user.refresh_token) {
        try {
          const restult = await axios({
            method: 'put',
            url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
            headers: { 'Authorization': `bearer ${store.state.user.refresh_token}` }
          })
          // 重新获取token成功之后，重新给存储token
          store.commit('updateUser', {
            user: {
              token: restult.data.data.token,
              refresh_token: store.state.user.refresh_token
            }
          })
          // 重新发送请求
          return instance(error.config)
        } catch (error) {
          store.commit('clearUser')

          router.push(topath)
        }
      }
    } else {
    // let topath = { path: '/login', query: { redirectUrl: router.currentRouter.path } }
    // 跳转到登录页面
      router.push(topath)
    }
  }

  return Promise.reject(error)
})
// 6. 导出instance
export default instance
