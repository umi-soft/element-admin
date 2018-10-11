import request from '@/utils/request'

const base_url = '/system/menu/'

export function queryMenus(data) {
  return request({
    url: base_url + 'query',
    method: 'post',
    data
  })
}
