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
    const queryResult = deepClone(fieldQueryLike(MockDB.users, query))
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
  checkLoginName: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const find = MockDB.users.some(item => {
      if (params.id) {
        return item.loginName === params.loginName && item.id !== params.id
      }
      return item.loginName === params.loginName
    })
    return {
      code: 1,
      message: '操作成功',
      data: {
        exist: find ? 1 : 0
      }
    }
  },
  uploadAvatar: config => {
    console.log(config)
    return {
      code: 0,
      message: '操作成功',
      data: Mock.Random.dataImage('180x180', Mock.mock('@cname'))
    }
  },
  queryById: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const user = MockDB.users[MockDB.users.findIndex(item => { return item.id === params.id })]
    return {
      code: 1,
      message: '操作成功',
      data: user
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const user = Mock.mock(MockDB.userMockConfig)
    params.id = user.id
    deepMerge(user, params)
    MockDB.users.push(user)
    return {
      code: 1,
      message: '操作成功',
      data: user
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const user = MockDB.users[MockDB.users.findIndex(item => { return item.id === params.id })]
    deepMerge(user, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },

  editUserPassword: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const user = MockDB.users[MockDB.users.findIndex(item => { return item.id === params.id })]
    user.password = params.password
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.users.splice(MockDB.users.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },

  queryAllUserDepts: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const deptUsersResult = MockDB.deptUsers.filter(item => { return item.userId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.depts.filter(dept => {
        return deptUsersResult.findIndex(deptUser => { return dept.id === deptUser.deptId }) !== -1
      })
    }
  },
  addUserDept: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.deptUsers.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  resetUserDept: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const newDeptUsers = MockDB.deptUsers.filter(item => {
      let found = false
      for (let i = 0; i < params.length; i++) {
        if (item.userId === params[i].userId) {
          found = true
          break
        }
      }
      return !found
    })
    MockDB.deptUsers.splice(0, MockDB.deptUsers.length)
    newDeptUsers.forEach(item => {
      MockDB.deptUsers.push(item)
    })
    params.forEach(item => {
      MockDB.deptUsers.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },

  queryAllUserGroups: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const groupUsersResult = MockDB.groupUsers.filter(item => { return item.userId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.groups.filter(group => {
        return groupUsersResult.findIndex(groupUser => { return group.id === groupUser.groupId }) !== -1
      })
    }
  },

  addUserGroup: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.groupUsers.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  resetUserGroup: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const newGroupUsers = MockDB.groupUsers.filter(item => {
      let found = false
      for (let i = 0; i < params.length; i++) {
        if (item.userId === params[i].userId) {
          found = true
          break
        }
      }
      return !found
    })
    MockDB.groupUsers.splice(0, MockDB.groupUsers.length)
    newGroupUsers.forEach(item => {
      MockDB.groupUsers.push(item)
    })
    params.forEach(item => {
      MockDB.groupUsers.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },

  queryAllUserRoles: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const userRolesResult = MockDB.userRoles.filter(item => { return item.userId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.roles.filter(role => {
        return userRolesResult.findIndex(userRole => { return role.id === userRole.roleId }) !== -1
      })
    }
  },
  addUserRole: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    MockDB.userRoles.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  resetUserRole: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const newUserRoles = MockDB.userRoles.filter(item => {
      let found = false
      for (let i = 0; i < params.length; i++) {
        if (item.userId === params[i].userId) {
          found = true
          break
        }
      }
      return !found
    })
    MockDB.userRoles.splice(0, MockDB.userRoles.length)
    newUserRoles.forEach(item => {
      MockDB.userRoles.push(item)
    })
    params.forEach(item => {
      MockDB.userRoles.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  }
}
