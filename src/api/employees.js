import request from '@/utils/request'
/**
 *
 *  公司全部人员的信息,选择时的下拉列表
 */
export function GetEmployees() {
  return request({
    method: 'get',
    url: '/sys/user/simple'
  })
}

/**
 *
 *  公司全部人员的信息,渲染表单
 */
export function GetEmploy(params) {
  return request({
    method: 'get',
    url: '/sys/role',
    params
  })
}

