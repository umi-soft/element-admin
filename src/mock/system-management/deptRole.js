import * as MockDB from '../MockDB'

export default {
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.deptRoles.splice(MockDB.deptRoles.findIndex(item => {
      return item.roleId === params.roleId && item.deptId === params.deptId
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
    MockDB.deptRoles.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  }
}
