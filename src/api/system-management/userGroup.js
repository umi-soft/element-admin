import request from '@/utils/request'

const base_url = '/system/user-group/'

export function add(data) {
  return request({
    url: base_url + 'add',
    method: 'post',
    data
  })
}

export function reset(data) {
  return request({
    url: base_url + 'reset',
    method: 'post',
    data
  })
}

export function delByEntityMapping(data) {
  return request({
    url: base_url + 'del-by-entity-mapping',
    method: 'post',
    data
  })
}
