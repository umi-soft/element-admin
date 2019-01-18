import Mock from 'mockjs'
import { param2Obj, deepMerge, deepClone, fieldQueryLike, sortArray } from '@/utils'
import * as MockDB from '../MockDB'

function findDept(deptId) {
  let dept = null
  for (let i = 0; i < MockDB.deptsTree.length; i++) {
    dept = findDeptTreeNode(deptId, MockDB.deptsTree[i])
    if (dept !== null) {
      break
    }
  }
  return dept
}

function findDeptTreeNode(deptId, dept) {
  if (dept.id === deptId) {
    return dept
  }
  if (dept.children && dept.children.length > 0) {
    for (let i = 0; i < dept.children.length; i++) {
      const find = findDeptTreeNode(deptId, dept.children[i])
      if (find !== null) {
        return find
      }
    }
  }
  return null
}

export default {
  queryAll: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const query = {}
    params.filters.forEach(filter => {
      query[filter.field] = filter.value
    })
    const queryResult = deepClone(fieldQueryLike(MockDB.depts, query))
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
      data: MockDB.deptsTree
    }
  },
  queryById: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const dept = findDept(params.id)
    return {
      code: 1,
      message: '操作成功',
      data: dept
    }
  },
  add: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const dept = Mock.mock(MockDB.deptMockConfig)
    params.id = dept.id
    deepMerge(dept, params)

    if (dept.parentId) {
      const find = findDept(dept.parentId)
      if (!find.children) {
        find.children = []
      }
      find.children.push(dept)
    } else {
      MockDB.deptsTree.push(dept)
    }

    return {
      code: 1,
      message: '操作成功',
      data: dept
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const dept = findDept(params.id)
    deepMerge(dept, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  del: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    let dept = findDept(params.id)
    if (dept.parentId === null) {
      MockDB.deptsTree.splice(MockDB.deptsTree.findIndex(item => { return item.id === params.id }), 1)
    } else {
      dept = findDept(dept.parentId)
      dept.children.splice(dept.children.findIndex(item => { return item.id === params.id }), 1)
    }
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  queryAllDeptUsers: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const deptUsersResult = MockDB.deptUsers.filter(item => { return item.deptId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.users.filter(user => {
        return deptUsersResult.findIndex(deptUser => { return user.id === deptUser.userId }) !== -1
      })
    }
  },
  queryAllDeptRoles: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const tempResult = MockDB.deptRoles.filter(item => { return item.deptId === params.id })
    return {
      code: 1,
      message: '操作成功',
      data: MockDB.roles.filter(role => {
        return tempResult.findIndex(item => { return role.id === item.roleId }) !== -1
      })
    }
  }
}
