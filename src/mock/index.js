import Mock from 'mockjs'
import loginAPI from './login'

import groupAPI from './system-management/group'
import userAPI from './system-management/user'
import roleAPI from './system-management/role'
import deptAPI from './system-management/dept'
import dictionaryAPI from './system-management/dictionary'
import menuAPI from './system-management/menu'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/auth/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user-details/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/routers/, 'get', loginAPI.getRouterRoles)
Mock.mock(/\/logout/, 'get', loginAPI.logout)

//  系统设置相关---用户分组
Mock.mock(/\/system\/group\/query-all/, 'post', groupAPI.queryAll)
Mock.mock(/\/system\/group\/query-page/, 'post', groupAPI.queryPage)
Mock.mock(/\/system\/group\/query-by-id/, 'get', groupAPI.queryById)
Mock.mock(/\/system\/group\/add/, 'post', groupAPI.add)
Mock.mock(/\/system\/group\/edit/, 'post', groupAPI.edit)
Mock.mock(/\/system\/group\/del/, 'get', groupAPI.del)
Mock.mock(/\/system\/group\/all-users/, 'get', groupAPI.queryAllGroupUsers)
Mock.mock(/\/system\/group\/del-user/, 'post', groupAPI.delGroupUser)

//  系统设置相关---用户
Mock.mock(/\/system\/user\/query-page/, 'post', userAPI.queryPage)
Mock.mock(/\/system\/user\/query-by-id/, 'get', userAPI.queryById)
Mock.mock(/\/system\/user\/add-group/, 'post', userAPI.addUserGroup)
Mock.mock(/\/system\/user\/add-dept/, 'post', userAPI.addUserDept)
Mock.mock(/\/system\/user\/add-role/, 'post', userAPI.addUserRole)
Mock.mock(/\/system\/user\/check-login-name/, 'post', userAPI.checkLoginName)
Mock.mock(/\/system\/user\/add/, 'post', userAPI.add)
Mock.mock(/\/system\/user\/edit/, 'post', userAPI.edit)
Mock.mock(/\/system\/user\/edit-password/, 'post', userAPI.editUserPassword)
Mock.mock(/\/system\/user\/del-role/, 'post', userAPI.delUserRole)
Mock.mock(/\/system\/user\/del-dept/, 'post', userAPI.delUserDept)
Mock.mock(/\/system\/user\/del-group/, 'post', userAPI.delUserGroup)
Mock.mock(/\/system\/user\/del/, 'get', userAPI.del)
Mock.mock(/\/system\/user\/all-roles/, 'get', userAPI.queryAllUserRoles)
Mock.mock(/\/system\/user\/all-depts/, 'get', userAPI.queryAllUserDepts)
Mock.mock(/\/system\/user\/all-groups/, 'get', userAPI.queryAllUserGroups)

//  系统设置相关---角色
Mock.mock(/\/system\/role\/query-all/, 'post', roleAPI.queryAll)
Mock.mock(/\/system\/role\/query-page/, 'post', roleAPI.queryPage)
Mock.mock(/\/system\/role\/query-by-id/, 'get', roleAPI.queryById)
Mock.mock(/\/system\/role\/add/, 'post', roleAPI.add)
Mock.mock(/\/system\/role\/edit/, 'post', roleAPI.edit)
Mock.mock(/\/system\/role\/del/, 'get', roleAPI.del)
Mock.mock(/\/system\/role\/all-menus/, 'get', roleAPI.queryAllRoleMenus)
Mock.mock(/\/system\/role\/reset-menus/, 'post', roleAPI.resetRoleMenus)
Mock.mock(/\/system\/role\/all-users/, 'get', roleAPI.queryAllRoleUsers)
Mock.mock(/\/system\/role\/del-user/, 'post', roleAPI.delRoleUser)

//  系统设置相关---部门
Mock.mock(/\/system\/dept\/query-all-tree/, 'get', deptAPI.queryAllTree)
Mock.mock(/\/system\/dept\/query-all/, 'post', deptAPI.queryAll)
Mock.mock(/\/system\/dept\/query-by-id/, 'get', deptAPI.queryById)
Mock.mock(/\/system\/dept\/add/, 'post', deptAPI.add)
Mock.mock(/\/system\/dept\/edit/, 'post', deptAPI.edit)
Mock.mock(/\/system\/dept\/del/, 'get', deptAPI.del)
Mock.mock(/\/system\/dept\/all-users/, 'get', deptAPI.queryAllDeptUsers)
Mock.mock(/\/system\/dept\/del-user/, 'post', deptAPI.delDeptUser)

//  系统设置相关---字典
Mock.mock(/\/system\/dictionary\/query-all/, 'post', dictionaryAPI.queryAll)
Mock.mock(/\/system\/dictionary\/query-page/, 'post', dictionaryAPI.queryPage)
Mock.mock(/\/system\/dictionary\/query-by-id/, 'get', dictionaryAPI.queryById)
Mock.mock(/\/system\/dictionary\/query-all-by-parent-id/, 'get', dictionaryAPI.queryAllByParentId)
Mock.mock(/\/system\/dictionary\/add/, 'post', dictionaryAPI.add)
Mock.mock(/\/system\/dictionary\/edit/, 'post', dictionaryAPI.edit)
Mock.mock(/\/system\/dictionary\/del/, 'get', dictionaryAPI.del)

//  系统设置相关---菜单
Mock.mock(/\/system\/menu\/query-all/, 'post', menuAPI.queryAll)
Mock.mock(/\/system\/menu\/query-by-id/, 'get', menuAPI.queryById)
Mock.mock(/\/system\/menu\/edit/, 'post', menuAPI.edit)
Mock.mock(/\/system\/menu\/sync/, 'post', menuAPI.sync)
Mock.mock(/\/system\/menu\/all-urls/, 'get', menuAPI.queryMenuUrls)
Mock.mock(/\/system\/menu\/add-url/, 'post', menuAPI.addMenuUrl)
Mock.mock(/\/system\/menu\/del-url/, 'post', menuAPI.delMenuUrl)
Mock.mock(/\/system\/menu\/all-roles/, 'get', menuAPI.queryMenuRoles)
Mock.mock(/\/system\/menu\/del-role/, 'post', menuAPI.delMenuRole)

export default Mock
