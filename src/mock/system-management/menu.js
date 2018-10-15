import Mock from 'mockjs'
import { deepMerge } from '@/utils'
import { asyncMenuMap } from '@/router'

// const mockConfig = {
//   id: '',
//   parentId: '', // 上级ID
//   flag: 1, // 是否删除
//   state: 0, // 是否启用
//   index: '', // 菜单序号
//   name: '', // 名称
//   icon: '', // 图标
//   remark: '', // 备注
//   createdBy: '', // 创建人
//   createdDate: '', // 创建时间
//   modifiedBy: '', // 最后修改人
//   modifiedDate: '' // 最后修改时间
// }

function createMenu(router, parentId, menus) {
  const menu = {}
  menu.id = router.name
  menu.parentId = parentId
  menu.flag = 1
  menu.state = 0
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

export const rows = []

export default {
  queryAll: config => {
    console.log(config)
    return {
      code: 1,
      message: '操作成功',
      data: rows
    }
  },
  check: config => {
    console.log(config)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  edit: config => {
    console.log(config)
    const params = JSON.parse(config.body)
    const row = rows[rows.findIndex(item => { return item.id === params.id })]
    deepMerge(row, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },

  sync: config => {
    console.log(config)
    asyncMenuMap.forEach(router => createMenu(router, null, rows))
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  }
}
