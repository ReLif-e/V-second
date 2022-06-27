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
    url: '/sys/user',
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

/**
 *
 * 表单获取角色信息
 */
export function Getuser(params) {
  return request({
    method: 'get',
    url: 'sys/user',
    params
  })
}

/**
 *
 * 表单删除角色、
 */
export function Subuser(id) {
  return request({
    method: 'delete',
    url: '/sys/user/' + id
  })
}

/**
 *
 * 表单增加角色
 */
export function Postuser(data) {
  return request({
    method: 'post',
    url: '/sys/user/',
    data
  })
}

/**
 *
 * 获取角色详情
 */
export function getuserDetailById(id) {
  return request({
    method: 'get',
    url: '/sys/user/' + id
  })
}

/**
 *
 * 保存员工信息详情
 */
export function PutguserDetailById(data) {
  return request({
    method: 'put',
    url: '/sys/user/' + data.id,
    data
  })
}

/**
 *
 * 批量导入员工接口
 *
 */
export function importEmployee(data) {
  return request({
    method: 'post',
    url: `/sys/user/batch`,
    data
  })
}
