import Mock from 'mockjs'
import { param2Obj, deepMerge, deepClone, fieldQueryLike, sortArray } from '@/utils'
import Utils from '../utils'

const mockConfig = {
  'id|1': Utils.id, // 主键
  'flag|1': Utils.flag, // 是否删除
  'state|1': Utils.state, // 是否启用
  index: '@increment', // 序号
  'loginName': /[a-z][A-Z][0-9]/, // 登录ID
  'password': '@id', // 密码
  'name': '@cname', // 姓名
  'nickName': '@cname', // 昵称
  'avatar': '', // 肖像地址
  'avatarContent': '', // 肖像二进制
  'idNumber': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, // 证件号码
  'gender|1': [0, 1], // 性别
  'birthday': '@date("yyyy-MM-dd")', // 出生日期
  'phone': /^1[34578]\d{9}$/, // 联系电话
  'email': '@email', // 联系邮箱
  'address': '@county(true)', // 住址
  'tag': '@cword(5, 10)', // 用户标签
  'remark': '@cparagraph(1, 3)', // 描述
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
  }
}
