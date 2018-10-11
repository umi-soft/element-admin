import request from '@/utils/request'

const base_url = '/system/dept/'

export function queryPageDepts(data) {
  return request({
    url: base_url + 'query',
    method: 'post',
    data
  })
}

export function queryAllDepts(data) {
  return request({
    url: base_url + 'queryAll',
    method: 'post',
    data
  })
}

export function checkDept(id) {
  return request({
    url: base_url + 'check',
    method: 'get',
    params: { id }
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

export function queryPageDeptUsers(data) {
  return request({
    url: base_url + 'user',
    method: 'post',
    data
  })
}
