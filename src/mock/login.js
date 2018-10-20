const user = {
  token: 'admin',
  roles: ['admin'],
  user: {
    name: 'ADMIN',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
}

export default {
  loginByUsername: config => {
    return {
      code: 1,
      data: user.token
    }
  },
  getUserInfo: config => {
    return {
      code: 1,
      data: user
    }
  },
  logout: () => {
    return {
      code: 1
    }
  }
}
