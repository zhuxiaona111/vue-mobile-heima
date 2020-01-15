// request中封装了axios
import request from '@/utils/request'
export function getUserChannels () {
  // 拿到的结果要返回，得到一个promise对象
  return request({
    // 默认类型为get，不用写
    url: 'user/channels'

  })
}
