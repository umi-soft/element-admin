import request from '@/utils/request'

const base_url = '/system/role/'

export function queryPageRoles(data) {
  return request({
    url: base_url + 'query-page',
    method: 'post',
    data
  })
}

export function queryAllRoles(data) {
  return request({
    url: base_url + 'query-all',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: base_url + 'add',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: base_url + 'edit',
    method: 'post',
    data
  })
}

export function delRole(id) {
  return request({
    url: base_url + 'del',
    method: 'get',
    params: { id }
  })
}

export function queryAllRoleMenus(id) {
  return request({
    url: base_url + 'all-menus',
    method: 'get',
    params: { id }
  })
}

export function resetRoleMenus(data) {
  return request({
    url: base_url + 'reset-menus',
    method: 'post',
    data
  })
}

export function queryAllRoleUsers(id) {
  return request({
    url: base_url + 'all-users',
    method: 'get',
    params: { id }
  })
}

export function delRoleUser(data) {
  return request({
    url: base_url + 'del-user',
    method: 'post',
    data
  })
}
