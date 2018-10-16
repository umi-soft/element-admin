import Mock from 'mockjs'
import { param2Obj, deepMerge, deepClone, fieldQueryLike, sortArray } from '@/utils'
import Utils from '../utils'

const mockConfig = {
  'id|1': Utils.id,
  'parentId|1': Utils.id, // 父级机构
  'flag|1': Utils.flag, // 是否删除
  'state|1': Utils.state, // 是否启用
  index: '@increment', // 机构序号
  'type|1': ['政府机构', '国有企业', '民营企业'], // 机构类型
  name: '@cword(5, 10)', // 机构名称
  remark: '@cparagraph(1, 3)', // 机构描述
  createdBy: '@increment', // 创建人
  createdDate: +Mock.Random.date('T'), // 创建时间
  modifiedBy: '@increment', // 最后修改人
  modifiedDate: +Mock.Random.date('T') // 最后修改时间
}

export const row = Mock.mock(mockConfig)

export const rowsTree = []

export const rows = []
rows.push(row)

let length = Mock.mock('@integer(10, 40)')
for (let i = 0; i < length; i++) {
  rows.push(Mock.mock(mockConfig))
}

function createRowsTree(row) {
  row.children = []
  if (Mock.mock('@boolean')) {
    const children = Mock.mock(mockConfig)
    children.parentId = row.id
    row.children.push(children)
    createRowsTree(children)
  }
  return row
}

length = Mock.mock('@integer(5, 20)')
for (let i = 0; i < length; i++) {
  rowsTree.push(createRowsTree(Mock.mock(mockConfig)))
}

export default {
  queryPage: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const query = {}
    params.filter.filters.forEach(filter => {
      query[filter.field] = filter.value
    })
    const queryResult = deepClone(fieldQueryLike(rows, query))
    params.filter.sorts.forEach(sort => {
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
    return {
      code: 1,
      message: '操作成功',
      data: rowsTree
    }
  },
  check: config => {
    console.log(config)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const row = deepMerge(deepClone(params), Mock.mock(mockConfig))
    rows.push(row)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const row = rows[rows.findIndex(item => { return item.id === params.id })]
    deepMerge(row, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = param2Obj(config.url)
    rows.splice(rows.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  }
}
