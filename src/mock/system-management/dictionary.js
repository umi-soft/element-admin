import Mock from 'mockjs'
import { param2Obj, deepMerge, deepClone, fieldQueryLike, sortArray } from '@/utils'
import Utils from '../utils'

const mockConfig = {
  'id|1': Utils.id,
  'parentId': null, // 上级ID
  'deleted|1': Utils.deleted, // 是否删除
  'category|1': [1, 2, 3], // 类型： 1：业务字典类型, 2：单级业务字典, 3：多级业务字典
  'type|1': Utils.id, // 字典类型ID
  name: '@cword(5, 10)', // 名称
  'code|1': Utils.id, // 规则码
  'index': '@increment', // 编号
  remark: '@cparagraph(1, 3)', // 备注
  createdBy: '@increment', // 创建人
  createdDate: +Mock.Random.date('T'), // 创建时间
  modifiedBy: '@increment', // 最后修改人
  modifiedDate: +Mock.Random.date('T') // 最后修改时间
}

export const dictionaries = []

const dictionary = Mock.mock(mockConfig)
dictionary.type = null
dictionary.category = 1
dictionary.parentId = 'root'
dictionary.deleted = 0
dictionaries.push(dictionary)

// 单级字典
for (let i = 0; i < 13; i++) {
  const item = Mock.mock(mockConfig)
  item.category = 2
  item.parentId = 'root'
  item.type = dictionary.id
  dictionaries.push(item)
}

for (let i = 0; i < 11; i++) {
  const item = Mock.mock(mockConfig)
  item.category = 3
  item.parentId = 'root'
  item.type = dictionary.id
  dictionaries.push(item)
}

export default {
  queryPage: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const query = {}
    params.filters.forEach(filter => {
      query[filter.field] = filter.value
    })
    const queryResult = deepClone(fieldQueryLike(dictionaries, query))
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
      query[filter.field] = filter.value
    })
    const queryResult = deepClone(fieldQueryLike(dictionaries, query))
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
    const dictionary = dictionaries[dictionaries.findIndex(item => { return item.id === params.id })]
    return {
      code: 1,
      message: '操作成功',
      data: dictionary
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const dictionary = Mock.mock(mockConfig)
    params.id = dictionary.id
    deepMerge(dictionary, params)
    dictionaries.push(dictionary)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const dictionary = dictionaries[dictionaries.findIndex(item => { return item.id === params.id })]
    deepMerge(dictionary, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = param2Obj(config.url)
    dictionaries.splice(dictionaries.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  }
}
