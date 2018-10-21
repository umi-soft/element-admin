import request from '@/utils/request'

export function loginByUsername(data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getRouterRoles() {
  return request({
    url: '/system/router-roles',
    method: 'get'
  })
}
