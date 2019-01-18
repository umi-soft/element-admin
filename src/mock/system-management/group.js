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
    const queryResult = deepClone(fieldQueryLike(MockDB.groups, query))
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
    const queryResult = deepClone(fieldQueryLike(MockDB.groups, query))
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
    const group = MockDB.groups[MockDB.groups.findIndex(item => { return item.id === params.id })]
    return {
      code: 1,
      message: '操作成功',
      data: group
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const group = Mock.mock(MockDB.groupMockConfig)
    params.id = group.id
    deepMerge(group, params)
    MockDB.groups.push(group)
    return {
      code: 1,
      message: '操作成功',
      data: group
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const group = MockDB.groups[MockDB.groups.findIndex(item => { return item.id === params.id })]
    deepMerge(group, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.groups.splice(MockDB.groups.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  queryAllRoleGroupUsers: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const tempResult = MockDB.userRoleGroups.filter(item => { return item.roleGroupId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.users.filter(user => {
        return tempResult.findIndex(item => { return user.id === item.userId }) !== -1
      })
    }
  },
  queryAllUserGroupUsers: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const tempResult = MockDB.userGroups.filter(item => { return item.groupId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.users.filter(user => {
        return tempResult.findIndex(item => { return user.id === item.userId }) !== -1
      })
    }
  },
  queryAllGroupRoles: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const tempResult = MockDB.roleGroups.filter(item => { return item.roleGroupId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.roles.filter(role => {
        return tempResult.findIndex(item => { return role.id === item.roleId }) !== -1
      })
    }
  }
}
