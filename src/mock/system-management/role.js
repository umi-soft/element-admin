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
    const queryResult = deepClone(fieldQueryLike(MockDB.roles, query))
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
    const queryResult = deepClone(fieldQueryLike(MockDB.roles, query))
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
    const role = MockDB.roles[MockDB.roles.findIndex(item => { return item.id === params.id })]
    return {
      code: 1,
      message: '操作成功',
      data: role
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const role = Mock.mock(MockDB.roleMockConfig)
    params.id = role.id
    deepMerge(role, params)
    MockDB.roles.push(role)
    return {
      code: 1,
      message: '操作成功',
      data: role
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const role = MockDB.roles[MockDB.roles.findIndex(item => { return item.id === params.id })]
    deepMerge(role, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.roles.splice(MockDB.roles.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },

  // ###################################RoleMenu中间表操作MOCK#######################################
  queryAllRoleMenus: config => {
    console.log(config)
    const params = param2Obj(config.url)
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.roleMenus.filter(item => { return params.id === item.roleId })
    }
  },
  queryAllRoleUsers: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const tempResult = MockDB.userRoles.filter(item => { return item.roleId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.users.filter(user => {
        return tempResult.findIndex(item => { return user.id === item.userId }) !== -1
      })
    }
  },
  queryAllRoleDepts: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const tempResult = MockDB.deptRoles.filter(item => { return item.roleId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.depts.filter(dept => {
        return tempResult.findIndex(item => { return dept.id === item.deptId }) !== -1
      })
    }
  },
  queryAllRoleGroups: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const tempResults = MockDB.roleGroups.filter(item => { return item.roleId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.groups.filter(group => {
        return '' + group.category === '2' && tempResults.findIndex(item => { return group.id === item.roleGroupId }) !== -1
      })
    }
  }
}
