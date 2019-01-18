import * as MockDB from '../MockDB'

export default {
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.groupUsers.splice(MockDB.groupUsers.findIndex(item => {
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
    MockDB.groupUsers.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  reset: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const newGroupUsers = MockDB.groupUsers.filter(item => {
      let found = false
      for (let i = 0; i < params.length; i++) {
        if (item.userId === params[i].userId) {
          found = true
          break
        }
      }
      return !found
    })
    MockDB.groupUsers.splice(0, MockDB.groupUsers.length)
    newGroupUsers.forEach(item => {
      MockDB.groupUsers.push(item)
    })
    params.forEach(item => {
      MockDB.groupUsers.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  }
}
