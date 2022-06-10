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
