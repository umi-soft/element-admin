import request from '@/utils/request'

const base_url = '/system/security/'

export function queryPage(data) {
  return request({
    url: base_url + 'query-page',
    method: 'post',
    data
  })
}

export function queryAll(data) {
  return request({
    url: base_url + 'query-all',
    method: 'post',
    data
  })
}

export function queryById(id) {
  return request({
    url: base_url + 'query-by-id',
    method: 'get',
    params: { id }
  })
}

export function add(data) {
  return request({
    url: base_url + 'add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: base_url + 'edit',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: base_url + 'del',
    method: 'post',
    data
  })
}

