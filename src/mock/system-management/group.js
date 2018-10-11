import Mock from 'mockjs'
import { param2Obj, deepMerge, deepClone, fieldQueryLike } from '@/utils'
import Utils from '../utils'

const mockConfig = {
  'id|1': Utils.id,
  'flag|1': Utils.flag, // 是否删除
  'state|1': Utils.state, // 是否启用
  index: '@increment', // 编号
  name: '@cword(5, 10)', // 名称
  remark: '@cparagraph(1, 3)', // 备注
  createdBy: '@increment', // 创建人
  createdDate: +Mock.Random.date('T'), // 创建时间
  modifiedBy: '@increment', // 最后修改人
  modifiedDate: +Mock.Random.date('T') // 最后修改时间
}

export const row = Mock.mock(mockConfig)

export const rows = []
rows.push(row)

for (let i = 0; i < 300; i++) {
  rows.push(Mock.mock(mockConfig))
}

export default {
  queryPage: config => {
    const params = JSON.parse(config.body)
    const query = {}
    params.filter.filters.forEach(filter => {
      query[filter.field] = filter.value
    })
    const queryResult = fieldQueryLike(rows, query)
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
    return {
      code: 1,
      message: '操作成功',
      data: rows
    }
  },
  check: config => {
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  add: config => {
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
    const params = param2Obj(config.url)
    rows.splice(rows.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  queryAllGroupUsers: config => {
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  queryAllGroupRoles: config => {
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  }
}
