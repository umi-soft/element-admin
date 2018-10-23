import { param2Obj } from '@/utils'

const admin = {
  token: 'admin',
  roles: ['admin'],
  user: {
    name: 'ADMIN',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
}

const simple = {
  token: 'simple',
  roles: ['simple'],
  user: {
    name: 'simple',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
}

export default {
  loginByUsername: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    let token = null
    if (params.username === 'admin') {
      token = admin.token
    } else {
      token = simple.token
    }
    return {
      code: 1,
      data: token
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
    routerRoles.set('323c76618c6b56109bd490baf0d00902', ['simple'])
    routerRoles.set('f33d83225bef590d81f61a5afcbbca14', ['simple', 'others'])
    routerRoles.set('3de22ff390ab5d06bafcce547ff780bb', ['simple', 'others'])
    routerRoles.set('8bdc5038a6585fd2b5d3ef7b1e4bf4e1', ['others'])
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
