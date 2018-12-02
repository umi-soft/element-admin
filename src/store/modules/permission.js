import { asyncRouterMap, constantRouterMap } from '@/router'
import { filterAsyncRouter, initRouterRoles, initRouterRedirect } from '@/utils/auth'
import { getRouterRoles } from '@/api/login'

const permission = {
  state: {
    adminCode: 'admin',
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
    GenerateRoutes({ commit, state }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters = null
        if (roles.includes(state.adminCode)) {
          // 将未知路由归置到404页面
          asyncRouterMap.push({ path: '*', redirect: '/404', hidden: true })
          accessedRouters = asyncRouterMap
          initRouterRedirect(accessedRouters)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        } else {
          getRouterRoles().then(routerRoles => {
            const routerRolesMap = new Map(routerRoles)
            asyncRouterMap.forEach(module => {
              initRouterRoles(module, routerRolesMap)
            })
            accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            // 将未知路由归置到404页面
            accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
            initRouterRedirect(accessedRouters)
            commit('SET_ROUTERS', accessedRouters)
            resolve()
          })
        }
      })
    }
  }
}

export default permission
