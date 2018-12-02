import Cookies from 'js-cookie'

const TokenKey = 'USER_TOKEN'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles 用户的角色列表
 * @param meta meta中规定了有权限操作的所有角色，只要用户具有其中一个即可
 */
export function hasPermission(roles, { meta }) {
  if (roles.indexOf('admin') >= 0) return true
  if (meta && meta.roles) {
    return roles.some(role => meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
export function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(router => {
    const temp = { ...router } // 继承一个router对象,非深度复制
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRouter(temp.children, roles)
      }
      res.push(temp)
    }
  })

  return res
}

export function initRouterRedirect(routes, redirect = '') {
  routes.forEach(router => {
    let routerRedirect = router.path
    // 约束，路由中请勿使用绝对路由路径path
    if (!router.path.startsWith('/')) {
      routerRedirect = redirect + '/' + router.path
    }
    if (router.children) {
      for (let i = 0; i < router.children.length; i++) {
        if (router.children[i].hidden === false) {
          router.redirect = routerRedirect + '/' + router.children[i].path
          break
        }
      }
      initRouterRedirect(router.children, routerRedirect)
    }
  })
}

export function initRouterRoles(router, routerRolesMap) {
  if (!router.meta) {
    router.meta = { }
  }
  if (routerRolesMap.get(router.name)) {
    router.meta.roles = routerRolesMap.get(router.name)
  } else {
    router.meta.roles = []
  }
  if (router.children) {
    router.children.forEach(children => {
      initRouterRoles(children, routerRolesMap)
    })
  }
}
