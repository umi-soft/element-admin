import request from '@/utils/request'

const base_url = '/system/dept/'

export function queryAllDepts(data) {
  return request({
    url: base_url + 'query-all',
    method: 'post',
    data
  })
}

export function queryAllTreeDepts() {
  return request({
    url: base_url + 'query-all-tree',
    method: 'get'
  })
}

export function addDept(data) {
  return request({
    url: base_url + 'add',
    method: 'post',
    data
  })
}

export function editDept(data) {
  return request({
    url: base_url + 'edit',
    method: 'post',
    data
  })
}

export function delDept(id) {
  return request({
    url: base_url + 'del',
    method: 'get',
    params: { id }
  })
}

export function queryAllDeptUsers(id) {
  return request({
    url: base_url + 'all-users',
    method: 'get',
    params: { id }
  })
}

export function delDeptUser(data) {
  return request({
    url: base_url + 'del-user',
    method: 'post',
    data
  })
}
