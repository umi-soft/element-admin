import { asyncRouterMap, constantRouterMap } from '@/router'
// import { deepClone } from '@/utils'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles 用户的角色列表
 * @param meta meta中规定了有权限操作的所有角色，只要用户具有其中一个即可
 */
function hasPermission(roles, { meta }) {
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
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const temp = { ...route }
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRouter(temp.children, roles)
      }
      res.push(temp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = constantRouterMap.concat(routers)
      state.addRouters = routers
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
