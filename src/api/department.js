import request from '@/utils/request'
/**
 *
 *  部门列表信息接口
 */
export function GetPartment() {
  return request({
    method: 'get',
    url: '/company/department'
  })
}

/**
 *
 * 添加部门接口
 */
export function PostPartment(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

/**
 *
 * 获取修改部门的信息接口
 */
export function GetByid(id) {
  return request({
    method: 'get',
    url: '/company/department/' + id
  })
}

/**
 *
 * 修改部门信息接口
 */
export function PutPartment(data) {
  return request({
    method: 'put',
    url: '/company/department/' + data.id,
    data
  })
}

/**
 *
 * 删除部门接口
 */
export function DelPartment(id) {
  return request({
    method: 'delete',
    url: '/company/department/' + id
  })
}
