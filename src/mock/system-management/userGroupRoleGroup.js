import * as MockDB from '../MockDB'

export default {
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.userGroupRoleGroups.splice(MockDB.userGroupRoleGroups.findIndex(item => {
      return item.userGroupId === params.userGroupId && item.roleGroupId === params.roleGroupId
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
    MockDB.userGroupRoleGroups.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  }
}
