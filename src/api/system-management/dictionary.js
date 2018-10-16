import request from '@/utils/request'

const base_url = '/system/dictionary/'

export function queryPageDictionaries(data) {
  return request({
    url: base_url + 'query',
    method: 'post',
    data
  })
}

export function queryAllDictionaries(data) {
  return request({
    url: base_url + 'queryAll',
    method: 'post',
    data
  })
}

export function checkDictionary(id) {
  return request({
    url: base_url + 'check',
    method: 'get',
    params: { id }
  })
}

export function addDictionary(data) {
  return request({
    url: base_url + 'add',
    method: 'post',
    data
  })
}

export function editDictionary(data) {
  return request({
    url: base_url + 'edit',
    method: 'post',
    data
  })
}

export function delDictionary(id) {
  return request({
    url: base_url + 'del',
    method: 'get',
    params: { id }
  })
}
