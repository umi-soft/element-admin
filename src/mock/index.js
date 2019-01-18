import Mock from 'mockjs'
import loginAPI from './login'

import groupAPI from './system-management/group'
import userAPI from './system-management/user'
import roleAPI from './system-management/role'
import deptAPI from './system-management/dept'
import dictionaryAPI from './system-management/dictionary'
import menuAPI from './system-management/menu'
import userRoleGroupAPI from './system-management/userRoleGroup'
import userGroupRoleGroupAPI from './system-management/userGroupRoleGroup'
import userRoleAPI from './system-management/userRole'
import securityAPI from './system-management/security'
import menuRoleAPI from './system-management/menuRole'
import roleGroupAPI from './system-management/roleGroup'
import userGroupAPI from './system-management/userGroup'
import userDeptAPI from './system-management/userDept'
import menuSecurityAPI from './system-management/menuSecurity'

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
Mock.mock(/\/captcha/, 'get', loginAPI.captcha)
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
Mock.mock(/\/system\/group\/del/, 'post', groupAPI.del)
Mock.mock(/\/system\/group\/all-role-group-users/, 'get', groupAPI.queryAllRoleGroupUsers)
Mock.mock(/\/system\/group\/all-user-group-users/, 'get', groupAPI.queryAllUserGroupUsers)
Mock.mock(/\/system\/group\/all-role-groups/, 'get', groupAPI.queryAllRoleGroups)
Mock.mock(/\/system\/group\/all-user-groups/, 'get', groupAPI.queryAllUserGroups)
Mock.mock(/\/system\/group\/all-roles/, 'get', groupAPI.queryAllGroupRoles)

//  系统设置相关---用户
Mock.mock(/\/system\/user\/query-page/, 'post', userAPI.queryPage)
Mock.mock(/\/system\/user\/query-by-id/, 'get', userAPI.queryById)
Mock.mock(/\/system\/user\/check-login-name/, 'post', userAPI.checkLoginName)
Mock.mock(/\/system\/user\/upload-avatar/, 'post', userAPI.uploadAvatar)
Mock.mock(/\/system\/user\/add/, 'post', userAPI.add)
Mock.mock(/\/system\/user\/edit/, 'post', userAPI.edit)
Mock.mock(/\/system\/user\/edit-password/, 'post', userAPI.editUserPassword)
Mock.mock(/\/system\/user\/del/, 'post', userAPI.del)
Mock.mock(/\/system\/user\/all-roles/, 'get', userAPI.queryAllUserRoles)
Mock.mock(/\/system\/user\/all-depts/, 'get', userAPI.queryAllUserDepts)
Mock.mock(/\/system\/user\/all-groups/, 'get', userAPI.queryAllUserGroups)
Mock.mock(/\/system\/user\/all-role-groups/, 'get', userAPI.queryAllUserRoleGroups)

//  系统设置相关---角色
Mock.mock(/\/system\/role\/query-all/, 'post', roleAPI.queryAll)
Mock.mock(/\/system\/role\/query-page/, 'post', roleAPI.queryPage)
Mock.mock(/\/system\/role\/query-by-id/, 'get', roleAPI.queryById)
Mock.mock(/\/system\/role\/add/, 'post', roleAPI.add)
Mock.mock(/\/system\/role\/edit/, 'post', roleAPI.edit)
Mock.mock(/\/system\/role\/del/, 'post', roleAPI.del)
Mock.mock(/\/system\/role\/all-menus/, 'get', roleAPI.queryAllRoleMenus)
Mock.mock(/\/system\/role\/all-users/, 'get', roleAPI.queryAllRoleUsers)
Mock.mock(/\/system\/role\/all-groups/, 'get', roleAPI.queryAllRoleGroups)

//  系统设置相关---部门
Mock.mock(/\/system\/dept\/query-all-tree/, 'get', deptAPI.queryAllTree)
Mock.mock(/\/system\/dept\/query-all/, 'post', deptAPI.queryAll)
Mock.mock(/\/system\/dept\/query-by-id/, 'get', deptAPI.queryById)
Mock.mock(/\/system\/dept\/add/, 'post', deptAPI.add)
Mock.mock(/\/system\/dept\/edit/, 'post', deptAPI.edit)
Mock.mock(/\/system\/dept\/del/, 'post', deptAPI.del)
Mock.mock(/\/system\/dept\/all-users/, 'get', deptAPI.queryAllDeptUsers)

//  系统设置相关---字典
Mock.mock(/\/system\/dictionary\/query-all/, 'post', dictionaryAPI.queryAll)
Mock.mock(/\/system\/dictionary\/query-page/, 'post', dictionaryAPI.queryPage)
Mock.mock(/\/system\/dictionary\/query-by-id/, 'get', dictionaryAPI.queryById)
Mock.mock(/\/system\/dictionary\/add/, 'post', dictionaryAPI.add)
Mock.mock(/\/system\/dictionary\/edit/, 'post', dictionaryAPI.edit)
Mock.mock(/\/system\/dictionary\/del/, 'post', dictionaryAPI.del)

//  系统设置相关---资源定义
Mock.mock(/\/system\/security\/query-all/, 'post', securityAPI.queryAll)
Mock.mock(/\/system\/security\/query-page/, 'post', securityAPI.queryPage)
Mock.mock(/\/system\/security\/query-by-id/, 'get', securityAPI.queryById)
Mock.mock(/\/system\/security\/add/, 'post', securityAPI.add)
Mock.mock(/\/system\/security\/edit/, 'post', securityAPI.edit)
Mock.mock(/\/system\/security\/del/, 'post', securityAPI.del)

//  系统设置相关---菜单
Mock.mock(/\/system\/menu\/query-all/, 'post', menuAPI.queryAll)
Mock.mock(/\/system\/menu\/query-by-id/, 'get', menuAPI.queryById)
Mock.mock(/\/system\/menu\/edit/, 'post', menuAPI.edit)
Mock.mock(/\/system\/menu\/sync/, 'post', menuAPI.sync)
Mock.mock(/\/system\/menu\/all-securities/, 'get', menuAPI.queryAllMenuSecurities)
Mock.mock(/\/system\/menu\/all-roles/, 'get', menuAPI.queryMenuRoles)

//  用户-部门，中间表
Mock.mock(/\/system\/user-dept\/del-by-entity-mapping/, 'post', userDeptAPI.delByEntityMapping)
Mock.mock(/\/system\/user-dept\/add/, 'post', userDeptAPI.add)
Mock.mock(/\/system\/user-dept\/reset/, 'post', userDeptAPI.reset)

//  用户-用户组，中间表
Mock.mock(/\/system\/user-group\/del-by-entity-mapping/, 'post', userGroupAPI.delByEntityMapping)
Mock.mock(/\/system\/user-group\/add/, 'post', userGroupAPI.add)
Mock.mock(/\/system\/user-group\/reset/, 'post', userGroupAPI.reset)

//  菜单-角色,中间表
Mock.mock(/\/system\/menu-role\/del-by-entity-mapping/, 'post', menuRoleAPI.delByEntityMapping)
Mock.mock(/\/system\/menu-role\/reset/, 'post', menuRoleAPI.reset)

// 用户-角色组,中间表
Mock.mock(/\/system\/user-role-group\/del-by-entity-mapping/, 'post', userRoleGroupAPI.delByEntityMapping)
Mock.mock(/\/system\/user-role-group\/add/, 'post', userRoleGroupAPI.add)
Mock.mock(/\/system\/user-role-group\/reset/, 'post', userRoleGroupAPI.reset)

// 用户-角色,中间表
Mock.mock(/\/system\/user-role\/del-by-entity-mapping/, 'post', userRoleAPI.delByEntityMapping)
Mock.mock(/\/system\/user-role\/add/, 'post', userRoleAPI.add)
Mock.mock(/\/system\/user-role\/reset/, 'post', userRoleAPI.reset)

// 角色-角色组,中间表
Mock.mock(/\/system\/role-group\/del-by-entity-mapping/, 'post', roleGroupAPI.delByEntityMapping)
Mock.mock(/\/system\/role-group\/add/, 'post', roleGroupAPI.add)

// 用户组-角色组,中间表
Mock.mock(/\/system\/user-group-role-group\/del-by-entity-mapping/, 'post', userGroupRoleGroupAPI.delByEntityMapping)
Mock.mock(/\/system\/user-group-role-group\/add/, 'post', userGroupRoleGroupAPI.add)

// 菜单-资源,中间表
Mock.mock(/\/system\/menu-security\/del-by-entity-mapping/, 'post', menuSecurityAPI.delByEntityMapping)
Mock.mock(/\/system\/menu-security\/add/, 'post', menuSecurityAPI.add)

export default Mock
