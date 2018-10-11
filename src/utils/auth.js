import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  // Cookies.remove(TokenKey)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
