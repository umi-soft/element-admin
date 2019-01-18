import * as MockDB from '../MockDB'

export default {
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.roleMenus.splice(MockDB.roleMenus.findIndex(item => {
      return item.menuId === params.menuId && item.roleId === params.roleId
    }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  reset: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.roleMenus.forEach(roleMenu => {
      MockDB.roleMenus.splice(MockDB.roleMenus.findIndex(item => {
        return item.roleId === params.roleId
      }), 1)
    })
    params.menuIds.forEach(menuId => {
      MockDB.roleMenus.push({
        roleId: params.roleId,
        menuId
      })
    })
    return {
      code: 1,
      message: '操作成功',
      data: ''
    }
  }
}
