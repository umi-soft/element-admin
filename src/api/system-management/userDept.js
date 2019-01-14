import request from '@/utils/request'

const base_url = '/system/user-dept/'

export function delByEntityMapping(data) {
  return request({
    url: base_url + 'del-by-entity-mapping',
    method: 'post',
    data
  })
}
