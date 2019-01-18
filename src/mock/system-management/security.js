import Mock from 'mockjs'
import { param2Obj, deepMerge, deepClone, fieldQueryLike, sortArray } from '@/utils'
import * as MockDB from '../MockDB'

export default {
  queryPage: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const query = {}
    params.filters.forEach(filter => {
      query[filter.field] = filter.value
    })
    const queryResult = deepClone(fieldQueryLike(MockDB.securities, query))
    params.sorts.forEach(sort => {
      // 前端目前无法实现多字段排序，因此排序以最后一个字段为准
      sortArray(queryResult, sort.field, sort.value === 'desc')
    })
    return {
      code: 1,
      message: '',
      data: {
        total: queryResult.length,
        pageSize: params.pageSize,
        page: params.page,
        list: queryResult.slice((params.page - 1) * params.pageSize, params.page * params.pageSize)
      }
    }
  },
  queryAll: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const query = {}
    params.filters.forEach(filter => {
      query[filter.field] = filter.value + ''
    })
    console.log(query)
    const queryResult = deepClone(fieldQueryLike(MockDB.securities, query))
    params.sorts.forEach(sort => {
      // 前端目前无法实现多字段排序，因此排序以最后一个字段为准
      sortArray(queryResult, sort.field, sort.value === 'desc')
    })
    return {
      code: 1,
      message: '操作成功',
      data: queryResult
    }
  },
  queryById: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const security = MockDB.securities[MockDB.securities.findIndex(item => { return item.id === params.id })]
    return {
      code: 1,
      message: '操作成功',
      data: security
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const security = Mock.mock(MockDB.securityMockConfig)
    params.id = security.id
    deepMerge(security, params)
    MockDB.securities.push(security)
    return {
      code: 1,
      message: '操作成功',
      data: security
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const security = MockDB.securities[MockDB.securities.findIndex(item => { return item.id === params.id })]
    deepMerge(security, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.securities.splice(MockDB.securities.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  }
}
