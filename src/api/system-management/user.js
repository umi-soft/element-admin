import request from '@/utils/request'

const base_url = '/system/user/'

export function queryPageUsers(data) {
  return request({
    url: base_url + 'query-page',
    method: 'post',
    data
  })
}

export function queryUserById(id) {
  return request({
    url: base_url + 'query-by-id',
    method: 'get',
    params: { id }
  })
}

export function checkLoginName(data) {
  return request({
    url: base_url + 'check-login-name',
    method: 'post',
    data
  })
}

export const uploadAvatar = base_url + 'upload-avatar'

export function addUser(data) {
  return request({
    url: base_url + 'add',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: base_url + 'edit',
    method: 'post',
    data
  })
}

export function editUserPassword(data) {
  return request({
    url: base_url + 'edit-password',
    method: 'post',
    data
  })
}

export function delUser(id) {
  return request({
    url: base_url + 'del',
    method: 'get',
    params: { id }
  })
}

export function queryAllUserRoles(params) {
  return request({
    url: base_url + 'all-roles',
    method: 'get',
    params: params
  })
}

export function addUserRole(data) {
  return request({
    url: base_url + 'add-role',
    method: 'post',
    data
  })
}

export function delUserRole(data) {
  return request({
    url: base_url + 'del-role',
    method: 'post',
    data
  })
}

export function queryAllUserDepts(params) {
  return request({
    url: base_url + 'all-depts',
    method: 'get',
    params: params
  })
}

export function addUserDept(data) {
  return request({
    url: base_url + 'add-dept',
    method: 'post',
    data
  })
}

export function delUserDept(data) {
  return request({
    url: base_url + 'del-dept',
    method: 'post',
    data
  })
}

export function queryAllUserGroups(params) {
  return request({
    url: base_url + 'all-groups',
    method: 'get',
    params: params
  })
}

export function addUserGroup(data) {
  return request({
    url: base_url + 'add-group',
    method: 'post',
    data
  })
}

export function delUserGroup(data) {
  return request({
    url: base_url + 'del-group',
    method: 'post',
    data
  })
}
