import request from '@/utils/request'

const base_url = '/system/dictionary/'

export function queryPageDictionaries(data) {
  return request({
    url: base_url + 'query-page',
    method: 'post',
    data
  })
}

export function queryAllDictionaries(data) {
  return request({
    url: base_url + 'query-all',
    method: 'post',
    data
  })
}

export function queryDictionaryById(id) {
  return request({
    url: base_url + 'query-by-id',
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

export function delDictionary(data) {
  return request({
    url: base_url + 'del',
    method: 'post',
    data
  })
}
