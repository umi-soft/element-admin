import request from '@/utils/request'

const base_url = '/system/user/'

export function queryPageUsers(data) {
  return request({
    url: base_url + 'query',
    method: 'post',
    data
  })
}

export function checkUser(id) {
  return request({
    url: base_url + 'check',
    method: 'get',
    params: { id }
  })
}

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

export function delUser(id) {
  return request({
    url: base_url + 'del',
    method: 'get',
    params: { id }
  })
}

export function queryAllUserRoles(id) {
  return request({
    url: base_url + 'role',
    method: 'get',
    params: { id }
  })
}

export function queryAllUserDepts(id) {
  return request({
    url: base_url + 'dept',
    method: 'get',
    params: { id }
  })
}

export function queryAllUserGroups(id) {
  return request({
    url: base_url + 'group',
    method: 'get',
    params: { id }
  })
}
