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
import deptRoleAPI from './system-management/deptRole'

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
// Mock.mock(/\/admin\/auth\/captcha/, 'get', loginAPI.captcha)
// Mock.mock(/\/admin\/auth\/login/, 'post', loginAPI.loginByLoginName)
Mock.mock(/\/admin\/auth\/user-authorities/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/admin\/auth\/system-authorities/, 'get', loginAPI.getRouterRoles)
Mock.mock(/\/admin\/auth\/logout/, 'get', loginAPI.logout)

//  系统设置相关---用户分组
Mock.mock(/\/admin\/group\/query-all/, 'post', groupAPI.queryAll)
Mock.mock(/\/admin\/group\/query-page/, 'post', groupAPI.queryPage)
Mock.mock(/\/admin\/group\/query-by-id/, 'get', groupAPI.queryById)
// Mock.mock(/\/admin\/group\/add/, 'post', groupAPI.add)
Mock.mock(/\/admin\/group\/edit/, 'post', groupAPI.edit)
Mock.mock(/\/admin\/group\/del/, 'post', groupAPI.del)
Mock.mock(/\/admin\/group\/all-role-group-users/, 'get', groupAPI.queryAllRoleGroupUsers)
Mock.mock(/\/admin\/group\/all-user-group-users/, 'get', groupAPI.queryAllUserGroupUsers)
Mock.mock(/\/admin\/group\/all-role-groups/, 'get', groupAPI.queryAllRoleGroups)
Mock.mock(/\/admin\/group\/all-user-groups/, 'get', groupAPI.queryAllUserGroups)
Mock.mock(/\/admin\/group\/all-roles/, 'get', groupAPI.queryAllGroupRoles)

//  系统设置相关---用户
Mock.mock(/\/admin\/user\/query-page/, 'post', userAPI.queryPage)
Mock.mock(/\/admin\/user\/query-by-id/, 'get', userAPI.queryById)
Mock.mock(/\/admin\/user\/check-login-name/, 'post', userAPI.checkLoginName)
Mock.mock(/\/admin\/user\/upload-avatar/, 'post', userAPI.uploadAvatar)
// Mock.mock(/\/admin\/user\/add/, 'post', userAPI.add)
Mock.mock(/\/admin\/user\/edit/, 'post', userAPI.edit)
Mock.mock(/\/admin\/user\/edit-password/, 'post', userAPI.editUserPassword)
Mock.mock(/\/admin\/user\/del/, 'post', userAPI.del)
Mock.mock(/\/admin\/user\/all-roles/, 'get', userAPI.queryAllUserRoles)
Mock.mock(/\/admin\/user\/all-depts/, 'get', userAPI.queryAllUserDepts)
Mock.mock(/\/admin\/user\/all-groups/, 'get', userAPI.queryAllUserGroups)
Mock.mock(/\/admin\/user\/all-role-groups/, 'get', userAPI.queryAllUserRoleGroups)

//  系统设置相关---角色
Mock.mock(/\/admin\/role\/query-all/, 'post', roleAPI.queryAll)
Mock.mock(/\/admin\/role\/query-page/, 'post', roleAPI.queryPage)
Mock.mock(/\/admin\/role\/query-by-id/, 'get', roleAPI.queryById)
Mock.mock(/\/admin\/role\/add/, 'post', roleAPI.add)
Mock.mock(/\/admin\/role\/edit/, 'post', roleAPI.edit)
Mock.mock(/\/admin\/role\/del/, 'post', roleAPI.del)
Mock.mock(/\/admin\/role\/all-menus/, 'get', roleAPI.queryAllRoleMenus)
Mock.mock(/\/admin\/role\/all-users/, 'get', roleAPI.queryAllRoleUsers)
Mock.mock(/\/admin\/role\/all-groups/, 'get', roleAPI.queryAllRoleGroups)
Mock.mock(/\/admin\/role\/all-depts/, 'get', roleAPI.queryAllRoleDepts)

//  系统设置相关---部门
Mock.mock(/\/admin\/dept\/query-all-tree/, 'get', deptAPI.queryAllTree)
Mock.mock(/\/admin\/dept\/query-all/, 'post', deptAPI.queryAll)
Mock.mock(/\/admin\/dept\/query-by-id/, 'get', deptAPI.queryById)
Mock.mock(/\/admin\/dept\/add/, 'post', deptAPI.add)
Mock.mock(/\/admin\/dept\/edit/, 'post', deptAPI.edit)
Mock.mock(/\/admin\/dept\/del/, 'post', deptAPI.del)
Mock.mock(/\/admin\/dept\/all-users/, 'get', deptAPI.queryAllDeptUsers)
Mock.mock(/\/admin\/dept\/all-roles/, 'get', deptAPI.queryAllDeptRoles)

//  系统设置相关---字典
Mock.mock(/\/admin\/dictionary\/query-all/, 'post', dictionaryAPI.queryAll)
Mock.mock(/\/admin\/dictionary\/query-page/, 'post', dictionaryAPI.queryPage)
Mock.mock(/\/admin\/dictionary\/query-by-id/, 'get', dictionaryAPI.queryById)
Mock.mock(/\/admin\/dictionary\/add/, 'post', dictionaryAPI.add)
Mock.mock(/\/admin\/dictionary\/edit/, 'post', dictionaryAPI.edit)
Mock.mock(/\/admin\/dictionary\/del/, 'post', dictionaryAPI.del)

//  系统设置相关---资源定义
Mock.mock(/\/admin\/security\/query-all/, 'post', securityAPI.queryAll)
Mock.mock(/\/admin\/security\/query-page/, 'post', securityAPI.queryPage)
Mock.mock(/\/admin\/security\/query-by-id/, 'get', securityAPI.queryById)
Mock.mock(/\/admin\/security\/add/, 'post', securityAPI.add)
Mock.mock(/\/admin\/security\/edit/, 'post', securityAPI.edit)
Mock.mock(/\/admin\/security\/del/, 'post', securityAPI.del)

//  系统设置相关---菜单
Mock.mock(/\/admin\/menu\/query-all/, 'post', menuAPI.queryAll)
Mock.mock(/\/admin\/menu\/query-by-id/, 'get', menuAPI.queryById)
Mock.mock(/\/admin\/menu\/edit/, 'post', menuAPI.edit)
Mock.mock(/\/admin\/menu\/sync/, 'post', menuAPI.sync)
Mock.mock(/\/admin\/menu\/all-securities/, 'get', menuAPI.queryAllMenuSecurities)
Mock.mock(/\/admin\/menu\/all-roles/, 'get', menuAPI.queryMenuRoles)

//  用户-部门，中间表
Mock.mock(/\/admin\/user-dept\/del-by-entity-mapping/, 'post', userDeptAPI.delByEntityMapping)
Mock.mock(/\/admin\/user-dept\/add/, 'post', userDeptAPI.add)
Mock.mock(/\/admin\/user-dept\/reset/, 'post', userDeptAPI.reset)

//  用户-用户组，中间表
Mock.mock(/\/admin\/user-group\/del-by-entity-mapping/, 'post', userGroupAPI.delByEntityMapping)
Mock.mock(/\/admin\/user-group\/add/, 'post', userGroupAPI.add)
Mock.mock(/\/admin\/user-group\/reset/, 'post', userGroupAPI.reset)

//  菜单-角色,中间表
Mock.mock(/\/admin\/menu-role\/del-by-entity-mapping/, 'post', menuRoleAPI.delByEntityMapping)
Mock.mock(/\/admin\/menu-role\/reset/, 'post', menuRoleAPI.reset)

// 用户-角色组,中间表
Mock.mock(/\/admin\/user-role-group\/del-by-entity-mapping/, 'post', userRoleGroupAPI.delByEntityMapping)
Mock.mock(/\/admin\/user-role-group\/add/, 'post', userRoleGroupAPI.add)
Mock.mock(/\/admin\/user-role-group\/reset/, 'post', userRoleGroupAPI.reset)

// 用户-角色,中间表
Mock.mock(/\/admin\/user-role\/del-by-entity-mapping/, 'post', userRoleAPI.delByEntityMapping)
Mock.mock(/\/admin\/user-role\/add/, 'post', userRoleAPI.add)
Mock.mock(/\/admin\/user-role\/reset/, 'post', userRoleAPI.reset)

// 角色-角色组,中间表
Mock.mock(/\/admin\/role-group\/del-by-entity-mapping/, 'post', roleGroupAPI.delByEntityMapping)
Mock.mock(/\/admin\/role-group\/add/, 'post', roleGroupAPI.add)

// 用户组-角色组,中间表
Mock.mock(/\/admin\/user-group-role-group\/del-by-entity-mapping/, 'post', userGroupRoleGroupAPI.delByEntityMapping)
Mock.mock(/\/admin\/user-group-role-group\/add/, 'post', userGroupRoleGroupAPI.add)

// 菜单-资源,中间表
Mock.mock(/\/admin\/menu-security\/del-by-entity-mapping/, 'post', menuSecurityAPI.delByEntityMapping)
Mock.mock(/\/admin\/menu-security\/add/, 'post', menuSecurityAPI.add)

// 部门-角色,中间表
Mock.mock(/\/admin\/dept-role\/del-by-entity-mapping/, 'post', deptRoleAPI.delByEntityMapping)
Mock.mock(/\/admin\/dept-role\/add/, 'post', deptRoleAPI.add)

export default Mock
