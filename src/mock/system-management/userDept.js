import * as MockDB from '../MockDB'

export default {
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.deptUsers.splice(MockDB.deptUsers.findIndex(item => {
      return item.userId === params.userId && item.deptId === params.deptId
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
    MockDB.deptUsers.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  reset: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const newDeptUsers = MockDB.deptUsers.filter(item => {
      let found = false
      for (let i = 0; i < params.length; i++) {
        if (item.userId === params[i].userId) {
          found = true
          break
        }
      }
      return !found
    })
    MockDB.deptUsers.splice(0, MockDB.deptUsers.length)
    newDeptUsers.forEach(item => {
      MockDB.deptUsers.push(item)
    })
    params.forEach(item => {
      MockDB.deptUsers.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  }
}
