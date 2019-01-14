import Mock from 'mockjs'
import { deepMerge, param2Obj } from '@/utils'
import { asyncMenuMap } from '@/router'
import * as MockDB from '../MockDB'

const roleMockConfig = MockDB.roleMockConfig

const roles = MockDB.roles

function createMenu(router, parentId, menus) {
  const menu = {}
  menu.id = router.name
  menu.parentId = parentId
  menu.deleted = 0
  menu.index = router.meta.index
  menu.name = router.meta.title
  menu.icon = router.meta.icon
  menu.remark = Mock.mock('@cparagraph(1, 3)')
  menu.createdBy = Mock.mock('@id')
  menu.createdDate = Mock.mock('@date(\'T\')')
  menu.modifiedBy = Mock.mock('@id')
  menu.modifiedDate = Mock.mock('@date(\'T\')')

  if (router.children && router.children.length > 0) {
    router.children.forEach(children => {
      createMenu(children, router.name, menus)
    })
  }
  menus.push(menu)
}

const menus = MockDB.menus

const menuUrls = MockDB.menuUrls

const roleMenus = MockDB.roleMenus

export default {
  queryAll: config => {
    console.log(config)
    return {
      code: 1,
      message: '操作成功',
      data: menus
    }
  },
  queryById: config => {
    console.log(config)
    const params = param2Obj(config.url)
    const menu = menus[menus.findIndex(item => { return item.id === params.id })]
    return {
      code: 1,
      message: '操作成功',
      data: menu
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const menu = menus[menus.findIndex(item => { return item.id === params.id })]
    deepMerge(menu, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },

  sync: config => {
    console.log(config)
    asyncMenuMap.forEach(router => createMenu(router, null, menus))
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },

  queryMenuUrls: config => {
    console.log(config)
    const params = param2Obj(config.url)
    return {
      code: 1,
      message: '操作成功',
      data: menuUrls.filter(item => { return item.menuId === params.id })
    }
  },

  addMenuUrl: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    menuUrls.push(params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },

  delMenuUrl: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    menuUrls.splice(menuUrls.findIndex(item => {
      return item.menuId === params.menuId && item.url === params.url
    }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },

  queryMenuRoles: config => {
    console.log(config)
    const params = param2Obj(config.url)
    if (roleMenus.findIndex(item => { return item.menuId === params.id }) === -1) {
      // 生成几个role
      for (let i = 0; i < 5; i++) {
        const role = Mock.mock(roleMockConfig)
        roles.push(role)
        roleMenus.push({
          menuId: params.id,
          roleId: role.id
        })
      }
    }
    const roleMenusResult = roleMenus.filter(item => { return params.id === item.menuId })
    return {
      code: 1,
      message: '操作成功',
      data: roles.filter(role => {
        return roleMenusResult.findIndex(menuRole => { return role.id === menuRole.roleId }) !== -1
      })
    }
  },

  delMenuRole: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    roleMenus.splice(roleMenus.findIndex(item => {
      return item.menuId === params.menuId && item.roleId === params.roleId
    }), 1)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  }

}
