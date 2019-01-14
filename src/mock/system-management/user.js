import Mock from 'mockjs'
import { param2Obj, deepMerge, deepClone, fieldQueryLike, sortArray } from '@/utils'
import * as MockDB from '../MockDB'

const roleMockConfig = MockDB.roleMockConfig

const groupMockConfig = MockDB.groupMockConfig

const deptMockConfig = MockDB.deptMockConfig

const userRoles = MockDB.userRoles

const roles = MockDB.roles

const groupUsers = MockDB.groupUsers

const groups = MockDB.groups

const deptUsers = MockDB.deptUsers

const depts = MockDB.depts

const mockConfig = MockDB.userMockConfig

const users = MockDB.users

for (let i = 0; i < 25; i++) {
  users.push(Mock.mock(mockConfig))
}
const admin = Mock.mock(mockConfig)
admin.name = 'admin'
admin.loginName = 'admin'
admin.password = 'admin'
admin.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

users.push(admin)
MockDB.admin.token = 'admin'
MockDB.admin.roles = ['admin']
MockDB.admin.user = admin

const simple = Mock.mock(mockConfig)
simple.name = 'simple'
simple.loginName = 'simple'
simple.password = 'simple'
simple.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

users.push(simple)
MockDB.simple.token = 'simple'
MockDB.simple.roles = ['simple']
MockDB.simple.user = admin

export default {
  queryPage: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const query = {}
    params.filters.forEach(filter => {
      query[filter.field] = filter.value
    })
    const queryResult = deepClone(fieldQueryLike(users, query))
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
    const find = users.some(item => {
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
    const user = users[users.findIndex(item => { return item.id === params.id })]
    return {
      code: 1,
      message: '操作成功',
      data: user
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const user = Mock.mock(mockConfig)
    params.id = user.id
    deepMerge(user, params)
    users.push(user)
    return {
      code: 1,
      message: '操作成功',
      data: user
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const user = users[users.findIndex(item => { return item.id === params.id })]
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
    const user = users[users.findIndex(item => { return item.id === params.id })]
    user.password = params.password
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = param2Obj(config.url)
    users.splice(users.findIndex(item => { return item.id === params.id }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },

  queryAllUserDepts: config => {
    console.log(config)
    const params = param2Obj(config.url)
    if (deptUsers.findIndex(item => { return item.userId === params.id }) === -1) {
      // 生成几个dept
      for (let i = 0; i < 3; i++) {
        const dept = Mock.mock(deptMockConfig)
        depts.push(dept)
        deptUsers.push({
          userId: params.id,
          deptId: dept.id
        })
      }
    }
    const deptUsersResult = deptUsers.filter(item => { return item.userId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: depts.filter(dept => {
        return deptUsersResult.findIndex(deptUser => { return dept.id === deptUser.deptId }) !== -1
      })
    }
  },
  addUserDept: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    console.log(deptUsers.length)
    params.forEach(item => {
      deptUsers.push(item)
    })
    console.log(deptUsers)
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  delUserDept: config => {
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
  },

  queryAllUserGroups: config => {
    console.log(config)
    const params = param2Obj(config.url)
    if (groupUsers.findIndex(item => { return item.userId === params.id }) === -1) {
      // 生成几个group
      for (let i = 0; i < 3; i++) {
        const group = Mock.mock(groupMockConfig)
        groups.push(group)
        groupUsers.push({
          userId: params.id,
          groupId: group.id
        })
      }
    }
    const groupUsersResult = groupUsers.filter(item => { return item.userId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: groups.filter(group => {
        return groupUsersResult.findIndex(groupUser => { return group.id === groupUser.groupId }) !== -1
      })
    }
  },

  addUserGroup: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    params.forEach(item => {
      groupUsers.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  delUserGroup: config => {
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
  },

  queryAllUserRoles: config => {
    console.log(config)
    const params = param2Obj(config.url)
    if (userRoles.findIndex(item => { return item.userId === params.id }) === -1) {
      // 生成几个role
      for (let i = 0; i < 3; i++) {
        const role = Mock.mock(roleMockConfig)
        roles.push(role)
        userRoles.push({
          userId: params.id,
          roleId: role.id
        })
      }
    }
    const userRolesResult = userRoles.filter(item => { return item.userId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: roles.filter(role => {
        return userRolesResult.findIndex(userRole => { return role.id === userRole.roleId }) !== -1
      })
    }
  },
  addUserRole: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    params.forEach(item => {
      userRoles.push(item)
    })
    return {
      code: 1,
      message: '操作成功',
      data: params
    }
  },
  delUserRole: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    userRoles.splice(userRoles.findIndex(item => {
      return item.userId === params.userId && item.roleId === params.roleId
    }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: ''
    }
  }
}
