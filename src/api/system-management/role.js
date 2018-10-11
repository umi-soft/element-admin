import request from '@/utils/request'

const base_url = '/system/role/'

export function queryPageRoles(data) {
  return request({
    url: base_url + 'query',
    method: 'post',
    data
  })
}

export function checkRole(id) {
  return request({
    url: base_url + 'check',
    method: 'get',
    params: { id }
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

export function queryAllRoleGroups(id) {
  return request({
    url: base_url + 'group',
    method: 'get',
    params: { id }
  })
}

export function queryAllRoleUsers(id) {
  return request({
    url: base_url + 'user',
    method: 'get',
    params: { id }
  })
}

export function queryAllRoleMenus(id) {
  return request({
    url: base_url + 'menu',
    method: 'get',
    params: { id }
  })
}
