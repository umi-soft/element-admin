import request from '@/utils/request'

const base_url = '/system/group/'

export function queryPageGroups(data) {
  return request({
    url: base_url + 'query',
    method: 'post',
    data
  })
}

export function queryAllGroups(data) {
  return request({
    url: base_url + 'queryAll',
    method: 'post',
    data
  })
}

export function checkGroup(id) {
  return request({
    url: base_url + 'check',
    method: 'get',
    params: { id }
  })
}

export function addGroup(data) {
  return request({
    url: base_url + 'add',
    method: 'post',
    data
  })
}

export function editGroup(data) {
  return request({
    url: base_url + 'edit',
    method: 'post',
    data
  })
}

export function delGroup(id) {
  return request({
    url: base_url + 'del',
    method: 'get',
    params: { id }
  })
}

export function queryAllGroupUsers(id) {
  return request({
    url: base_url + 'all-users',
    method: 'get',
    params: { id }
  })
}

export function delGroupUser(data) {
  return request({
    url: base_url + 'del-user',
    method: 'post',
    data
  })
}
