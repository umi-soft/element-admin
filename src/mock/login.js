import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import * as MockDB from './MockDB'

const admin = MockDB.admin

const simple = MockDB.simple

let captcha = null

export default {
  captcha: config => {
    console.log(config)
    captcha = Mock.mock({ 'number|1000-9999': 1000 }).number
    return {
      code: 1,
      data: Mock.Random.dataImage('448x47', captcha)
    }
  },
  loginByUsername: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    let token = null
    if ('' + captcha !== '' + params.captcha) {
      return {
        code: 1,
        data: {
          result: 2,
          message: '验证码错误'
        }
      }
    }
    if ((params.username === simple.user.loginName && params.password !== simple.user.password) || (params.username === admin.user.loginName && params.password !== admin.user.password)) {
      return {
        code: 1,
        data: {
          result: 3,
          message: '用户名或密码错误'
        }
      }
    }
    if (params.username === 'admin') {
      token = admin.token
    } else {
      token = simple.token
    }
    return {
      code: 1,
      data: {
        result: 1,
        message: '登录成功',
        token: token
      }
    }
  },
  getUserInfo: config => {
    console.log(config)
    const params = param2Obj(config.url)
    let user = null
    if (params.token.endsWith('admin')) {
      user = admin
    } else {
      user = simple
    }
    return {
      code: 1,
      data: user
    }
  },
  getRouterRoles: (config) => {
    const routerRoles = new Map()
    routerRoles.set('90a127ce319d5d93b3b49c697cfa138f', ['simple'])
    // routerRoles.set('323c76618c6b56109bd490baf0d00902', ['simple'])
    routerRoles.set('f33d83225bef590d81f61a5afcbbca14', ['simple', 'others'])
    routerRoles.set('3de22ff390ab5d06bafcce547ff780bb', ['simple', 'others'])
    // routerRoles.set('8bdc5038a6585fd2b5d3ef7b1e4bf4e1', ['simple'])
    return {
      code: 1,
      data: routerRoles
    }
  },
  logout: (config) => {
    return {
      code: 1
    }
  }
}
