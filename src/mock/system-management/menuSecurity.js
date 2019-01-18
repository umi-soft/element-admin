import * as MockDB from '../MockDB'

export default {
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.menuSecurities.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  delByEntityMapping: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.menuSecurities.splice(MockDB.menuSecurities.findIndex(item => {
      return item.menuId === params.menuId && item.securityId === params.securityId
    }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: ''
    }
  }
}
