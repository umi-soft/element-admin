import { logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: null,
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      if (token) {
        setToken(token)
      } else {
        removeToken()
      }
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    CLEAR_USER: (state) => {
      state.user = null
      state.roles = []
    }
  },

  actions: {
    // 用户名登录
    LoginByLoginName({ commit }, token) {
      commit('SET_TOKEN', token)
      commit('CLEAR_USER')
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(data => {
          commit('SET_USER', data.user)
          commit('SET_ROLES', data.roles)
          resolve(data)
        }).catch(error => {
          commit('CLEAR_USER')
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', null)
          commit('CLEAR_USER')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', null)
        commit('CLEAR_USER')
        resolve()
      })
    }
  }
}

export default user
