import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 因为设置头像是通过第一次请求的id来获取的，所以要获取两次数据

export function logout() {

}
