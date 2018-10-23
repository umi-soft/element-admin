import request from '@/utils/request'

export function loginByUsername(data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user-details',
    method: 'get',
    params: { token }
  })
}

export function getRouterRoles(token) {
  return request({
    url: '/routers',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/logout',
    method: 'get',
    params: { token }
  })
}
