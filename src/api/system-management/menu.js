import request from '@/utils/request'

const base_url = '/system/menu/'

export function queryAllMenus(data) {
  return request({
    url: base_url + 'queryAll',
    method: 'post',
    data
  })
}

export function checkMenu(id) {
  return request({
    url: base_url + 'check',
    method: 'get',
    params: { id }
  })
}

export function editMenu(data) {
  return request({
    url: base_url + 'edit',
    method: 'post',
    data
  })
}

export function syncMenus(data) {
  return request({
    url: base_url + 'sync',
    method: 'post',
    data
  })
}
