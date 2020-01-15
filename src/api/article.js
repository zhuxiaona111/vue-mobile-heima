// 文章列表接口封装
import request from '@/utils/request'

export function getArticles (params) {
  return request({
    // 与基础地址不一样，写全
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    // 因为是query参数，使用params中，body参数放在data中
    params: {
      with_top: 1,
      ...params // 解构上面函数中的params中的参数
    }
  })
}
