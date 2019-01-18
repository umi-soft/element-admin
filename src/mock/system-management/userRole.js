import * as MockDB from '../MockDB'

export default {
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.userRoles.splice(MockDB.userRoles.findIndex(item => {
      return item.userId === params.userId && item.roleId === params.roleId
    }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: ''
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.userRoles.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  reset: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const newUserRoles = MockDB.userRoles.filter(item => {
      let found = false
      for (let i = 0; i < params.length; i++) {
        if (item.userId === params[i].userId) {
          found = true
          break
        }
      }
      return !found
    })
    MockDB.userRoles.splice(0, MockDB.userRoles.length)
    newUserRoles.forEach(item => {
      MockDB.userRoles.push(item)
    })
    params.forEach(item => {
      MockDB.userRoles.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  }
}
