import Mock from 'mockjs'
import { param2Obj, deepMerge, deepClone, fieldQueryLike, sortArray } from '@/utils'
import Utils from '../utils'
import { mockConfig as userMockConfig, users } from './user'

export const mockConfig = {
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

export const deptsTree = []

export const depts = []

/**
 * {
 *  userId: '',
 *  deptId: ''
 * }
 */
export const deptUsers = []

let length = Mock.mock('@integer(10, 40)')
for (let i = 0; i < length; i++) {
  depts.push(Mock.mock(mockConfig))
}

function createDeptTree(dept) {
  dept.children = []
  if (Mock.mock('@boolean')) {
    const children = Mock.mock(mockConfig)
    children.parentId = dept.id
    dept.children.push(children)
    createDeptTree(children)
  }
  return dept
}

length = Mock.mock('@integer(5, 20)')
for (let i = 0; i < length; i++) {
  deptsTree.push(createDeptTree(Mock.mock(mockConfig)))
}

export default {
  queryAll: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const query = {}
    params.filters.forEach(filter => {
      query[filter.field] = filter.value
    })
    const queryResult = deepClone(fieldQueryLike(depts, query))
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
  queryAllTree: config => {
    console.log(config)
    return {
      code: 1,
      message: '操作成功',
      data: deptsTree
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const dept = Mock.mock(mockConfig)
    params.id = dept.id
    deepMerge(dept, params)
    depts.push(dept)
    return {
      code: 1,
      message: '操作成功',
      data: dept
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const dept = depts[depts.findIndex(item => { return item.id === params.id })]
    deepMerge(dept, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = param2Obj(config.url)
    depts.splice(depts.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  queryAllDeptUsers: config => {
    console.log(config)
    const params = param2Obj(config.url)
    if (deptUsers.findIndex(item => { return item.deptId === params.id }) === -1) {
      // 生成几个user
      for (let i = 0; i < 5; i++) {
        const user = Mock.mock(userMockConfig)
        users.push(user)
        deptUsers.push({
          userId: user.id,
          deptId: params.id
        })
      }
    }
    const deptUsersResult = deptUsers.filter(item => { return item.deptId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: users.filter(user => {
        return deptUsersResult.findIndex(deptUser => { return user.id === deptUser.userId }) !== -1
      })
    }
  },
  delDeptUser: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    deptUsers.splice(deptUsers.findIndex(item => {
      return item.userId === params.userId && item.deptId === params.deptId
    }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: ''
    }
  }
}
