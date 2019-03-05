import request from '@/utils/request'

const base_url = '/admin/auth/'

export function captcha() {
  return request({
    url: base_url + 'captcha',
    method: 'get'
  })
}

export function loginByLoginName(data) {
  return request({
    url: base_url + 'login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: base_url + 'user-authorities',
    method: 'get',
    data: { token }
  })
}

export function getRouterRoles(token) {
  return request({
    url: base_url + 'system-authorities',
    method: 'get',
    data: { token }
  })
}

export function logout(token) {
  return request({
    url: base_url + 'logout',
    method: 'get',
    data: { token }
  })
}
