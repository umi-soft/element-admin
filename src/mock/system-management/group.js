import Mock from 'mockjs'
import { param2Obj, deepMerge, deepClone, fieldQueryLike, sortArray } from '@/utils'
import Utils from '../utils'
import { mockConfig as userMockConfig, users } from './user'

export const mockConfig = {
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

export const groups = []

/**
 * {
 *  userId: '',
 *  groupId: ''
 * }
 */
export const groupUsers = []

for (let i = 0; i < 13; i++) {
  groups.push(Mock.mock(mockConfig))
}

export default {
  queryPage: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const query = {}
    params.filters.forEach(filter => {
      query[filter.field] = filter.value
    })
    const queryResult = deepClone(fieldQueryLike(groups, query))
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
    const queryResult = deepClone(fieldQueryLike(groups, query))
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
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const group = Mock.mock(mockConfig)
    params.id = group.id
    deepMerge(group, params)
    groups.push(group)
    return {
      code: 1,
      message: '操作成功',
      data: group
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const group = groups[groups.findIndex(item => { return item.id === params.id })]
    deepMerge(group, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = param2Obj(config.url)
    groups.splice(groups.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  queryAllGroupUsers: config => {
    console.log(config)
    const params = param2Obj(config.url)
    if (groupUsers.findIndex(item => { return item.groupId === params.id }) === -1) {
      // 生成几个user
      for (let i = 0; i < 20; i++) {
        const user = Mock.mock(userMockConfig)
        users.push(user)
        groupUsers.push({
          userId: user.id,
          groupId: params.id
        })
      }
    }
    const groupUsersResult = groupUsers.filter(item => { return item.groupId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: users.filter(user => {
        return groupUsersResult.findIndex(groupUser => { return user.id === groupUser.userId }) !== -1
      })
    }
  },
  delGroupUser: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    groupUsers.splice(groupUsers.findIndex(item => {
      return item.userId === params.userId && item.groupId === params.groupId
    }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: ''
    }
  }
}
