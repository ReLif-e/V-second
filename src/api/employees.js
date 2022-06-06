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

/**
 *
 * 根据id删除角色
 */
export function DelEmploy(id) {
  return request({
    method: 'delete',
    url: '/sys/role/' + id
  })
}

/**
 *
 * 添加角色信息
 */
export function AddEmploy(data) {
  return request({
    method: 'post',
    url: '/sys/role',
    data
  })
}

/**
 *
 * 编辑角色信息
 */
export function PutEmploy(data) {
  return request({
    method: 'put',
    url: '/sys/role/' + data.id,
    data
  })
}
