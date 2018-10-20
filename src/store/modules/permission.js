import { asyncRouterMap, constantRouterMap } from '@/router'
import { filterAsyncRouter } from '@/utils/auth'
// import { deepClone } from '@/utils'

// 将未知路由归置到404页面
asyncRouterMap.push({ path: '*', redirect: '/404', hidden: true })

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
