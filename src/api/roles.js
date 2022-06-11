import request from '@/utils/request'
/**
 *
 * 获取角色列表
 */
export function GetemployeesId() {
  return request({
    method: 'get',
    url: '/sys/role'
  })
}

/**
 *
 * 获取角色详情
 */
export function updateRoles(data) {
  return request({
    method: 'put',
    url: `/sys/user/assignRoles`,
    data
  })
}

/**
 *
 * 点击按钮获取角色权限
 *
 */
export function GetRoleDetail(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'get'
  })
}

/**
 *
 * 点击按钮更新角色权限信息
 *
 */
export function PutRoleDetail(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
