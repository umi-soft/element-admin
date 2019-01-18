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

export function delUser(data) {
  return request({
    url: base_url + 'del',
    method: 'post',
    data
  })
}

export function queryAllUserRoles(params) {
  return request({
    url: base_url + 'all-roles',
    method: 'get',
    params: params
  })
}

export function queryAllUserDepts(params) {
  return request({
    url: base_url + 'all-depts',
    method: 'get',
    params: params
  })
}

export function queryAllUserGroups(params) {
  return request({
    url: base_url + 'all-groups',
    method: 'get',
    params: params
  })
}

export function queryAllUserRoleGroups(params) {
  return request({
    url: base_url + 'all-role-groups',
    method: 'get',
    params: params
  })
}
