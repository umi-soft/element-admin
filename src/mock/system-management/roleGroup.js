import * as MockDB from '../MockDB'

export default {
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.roleGroups.splice(MockDB.roleGroups.findIndex(item => {
      return item.roleId === params.roleId && item.groupId === params.groupId
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
    MockDB.roleGroups.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  }
}
