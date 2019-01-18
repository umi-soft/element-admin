import * as MockDB from '../MockDB'

export default {
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.userGroups.splice(MockDB.userGroups.findIndex(item => {
      return item.userId === params.userId && item.groupId === params.groupId
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
    MockDB.userGroups.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  reset: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const newGroupUsers = MockDB.userGroups.filter(item => {
      let found = false
      for (let i = 0; i < params.length; i++) {
        if (item.userId === params[i].userId) {
          found = true
          break
        }
      }
      return !found
    })
    MockDB.userGroups.splice(0, MockDB.userGroups.length)
    newGroupUsers.forEach(item => {
      MockDB.userGroups.push(item)
    })
    params.forEach(item => {
      MockDB.userGroups.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  }
}
