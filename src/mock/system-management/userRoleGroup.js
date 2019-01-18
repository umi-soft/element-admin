import * as MockDB from '../MockDB'

export default {
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.userRoleGroups.splice(MockDB.userRoleGroups.findIndex(item => {
      return item.userId === params.userId && item.userRoleId === params.userRoleId
    }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.userRoleGroups.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  reset: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const newUserRoleGroups = MockDB.userRoleGroups.filter(item => {
      let found = false
      for (let i = 0; i < params.length; i++) {
        if (item.userId === params[i].userId) {
          found = true
          break
        }
      }
      return !found
    })
    MockDB.userRoleGroups.splice(0, MockDB.userRoleGroups.length)
    newUserRoleGroups.forEach(item => {
      MockDB.userRoleGroups.push(item)
    })
    params.forEach(item => {
      MockDB.userRoleGroups.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  }
}
