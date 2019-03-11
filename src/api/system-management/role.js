import request from '@/utils/request'

const base_url = '/admin/role/'

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

export function queryRoleById(id) {
  return request({
    url: base_url + 'query-by-id',
    method: 'get',
    data: { id }
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
    method: 'post',
    data: { id }
  })
}

export function queryAllRoleMenus(id) {
  return request({
    url: base_url + 'all-menus',
    method: 'get',
    data: { id }
  })
}

export function queryAllRoleUsers(id) {
  return request({
    url: base_url + 'all-users',
    method: 'get',
    data: { id }
  })
}

export function queryAllRoleDepts(id) {
  return request({
    url: base_url + 'all-depts',
    method: 'get',
    data: { id }
  })
}

export function queryAllRoleGroups(id) {
  return request({
    url: base_url + 'all-role-groups',
    method: 'get',
    data: { id }
  })
}
