import request from '@/utils/request'

const base_url = '/system/menu/'

// ####################################Menu工具方法####################################
/**
 *
 * @param allMenus 数据库查询可用的所有菜单数组
 * @param router 前端路由表中的一个路由
 * @param parentId 上级ID
 */
export function createMenuTree(allMenus, router, parentId) {
  const menu = {}
  let remoteMenu = null
  const remoteMenuIndex = allMenus.findIndex(item => { return item.id === router.name })
  if (remoteMenuIndex === -1) { // 需要同步，本次构建从本地路由中构建
    menu.id = router.name
    menu.parentId = parentId
    menu.deleted = 0
    menu.index = router.meta.index
    menu.name = router.meta.title
    menu.icon = router.meta.icon
    menu.remark = null
    menu.createdBy = null
    menu.createdDate = null
    menu.modifiedBy = null
    menu.modifiedDate = null
  } else { // 不需要同步，本次构建从远端服务器构建
    remoteMenu = allMenus[remoteMenuIndex]
    menu.id = remoteMenu.id
    menu.parentId = parentId
    menu.deleted = 0
    menu.index = remoteMenu.index
    menu.name = remoteMenu.name
    menu.icon = remoteMenu.icon
    menu.remark = remoteMenu.remark
    menu.createdBy = remoteMenu.createdBy
    menu.createdDate = remoteMenu.createdDate
    menu.modifiedBy = remoteMenu.modifiedBy
    menu.modifiedDate = remoteMenu.modifiedDate
  }

  menu.children = []
  if (router.children && router.children.length > 0) {
    router.children.forEach(children => {
      menu.children.push(createMenuTree(allMenus, children, menu.id))
    })
  }
  return menu
}
/**
 * 判断菜单树中的某个节点及其子节点是否都在服务端
 * @param allMenus 数据库查询可用的所有菜单数组
 * @param menu 经过上述createMenuTree方法构建的菜单*树*中的一个节点
 * @returns {boolean}
 */
export function syncMenuVoter(allMenus, menu) {
  const remoteMenuIndex = allMenus.findIndex(item => { return item.id === menu.id })
  if (remoteMenuIndex === -1) { // menu不在allMenus中，终止递归，说明需要同步
    return true
  }
  if (menu.children && menu.children.length > 0) {
    return menu.children.some(children => {
      return syncMenuVoter(allMenus, children)
    })
  }
  return false
}

// ####################################Menu主表API####################################
export function queryAllMenus(data) {
  return request({
    url: base_url + 'query-all',
    method: 'post',
    data
  })
}

export function queryMenuById(id) {
  return request({
    url: base_url + 'query-by-id',
    method: 'get',
    params: { id }
  })
}

export function editMenu(data) {
  return request({
    url: base_url + 'edit',
    method: 'post',
    data
  })
}

export function syncMenus(data) {
  return request({
    url: base_url + 'sync',
    method: 'post',
    data
  })
}

// ####################################MenuURL中间表API####################################
export function queryAllMenuUrl(params) {
  return request({
    url: base_url + 'all-urls',
    method: 'get',
    params
  })
}

export function addMenuUrl(data) {
  return request({
    url: base_url + 'add-url',
    method: 'post',
    data
  })
}

export function delMenuUrl(data) {
  return request({
    url: base_url + 'del-url',
    method: 'post',
    data
  })
}

// ####################################RoleMenu中间表API####################################
export function queryAllMenuRole(params) {
  return request({
    url: base_url + 'all-roles',
    method: 'get',
    params
  })
}
