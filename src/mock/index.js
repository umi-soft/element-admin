import Mock from 'mockjs'
import loginAPI from './login'

import groupAPI from './system-management/group'
import userAPI from './system-management/user'
import roleAPI from './system-management/role'
import deptAPI from './system-management/dept'
import dictionaryAPI from './system-management/dictionary'
import menuAPI from './system-management/menu'

Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/auth/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

//  系统设置相关---用户分组
Mock.mock(/\/system\/group\/queryAll/, 'post', groupAPI.queryAll)
Mock.mock(/\/system\/group\/query/, 'post', groupAPI.queryPage)
Mock.mock(/\/system\/group\/check/, 'post', groupAPI.check)
Mock.mock(/\/system\/group\/add/, 'post', groupAPI.add)
Mock.mock(/\/system\/group\/edit/, 'post', groupAPI.edit)
Mock.mock(/\/system\/group\/del/, 'get', groupAPI.del)
Mock.mock(/\/system\/group\/users/, 'post', groupAPI.queryAllGroupUsers)
Mock.mock(/\/system\/group\/roles/, 'post', groupAPI.queryAllGroupRoles)

//  系统设置相关---用户
Mock.mock(/\/system\/user\/queryAll/, 'post', userAPI.queryAll)
Mock.mock(/\/system\/user\/query/, 'post', userAPI.queryPage)
Mock.mock(/\/system\/user\/check/, 'post', userAPI.check)
Mock.mock(/\/system\/user\/add/, 'post', userAPI.add)
Mock.mock(/\/system\/user\/edit/, 'post', userAPI.edit)
Mock.mock(/\/system\/user\/del/, 'get', userAPI.del)

//  系统设置相关---角色
Mock.mock(/\/system\/role\/queryAll/, 'post', roleAPI.queryAll)
Mock.mock(/\/system\/role\/query/, 'post', roleAPI.queryPage)
Mock.mock(/\/system\/role\/check/, 'post', roleAPI.check)
Mock.mock(/\/system\/role\/add/, 'post', roleAPI.add)
Mock.mock(/\/system\/role\/edit/, 'post', roleAPI.edit)
Mock.mock(/\/system\/role\/del/, 'get', roleAPI.del)

//  系统设置相关---部门
Mock.mock(/\/system\/dept\/queryAll/, 'post', deptAPI.queryAll)
Mock.mock(/\/system\/dept\/query/, 'post', deptAPI.queryPage)
Mock.mock(/\/system\/dept\/check/, 'post', deptAPI.check)
Mock.mock(/\/system\/dept\/add/, 'post', deptAPI.add)
Mock.mock(/\/system\/dept\/edit/, 'post', deptAPI.edit)
Mock.mock(/\/system\/dept\/del/, 'get', deptAPI.del)

//  系统设置相关---字典
Mock.mock(/\/system\/dictionary\/queryAll/, 'post', dictionaryAPI.queryAll)
Mock.mock(/\/system\/dictionary\/query/, 'post', dictionaryAPI.queryPage)
Mock.mock(/\/system\/dictionary\/check/, 'post', dictionaryAPI.check)
Mock.mock(/\/system\/dictionary\/add/, 'post', dictionaryAPI.add)
Mock.mock(/\/system\/dictionary\/edit/, 'post', dictionaryAPI.edit)
Mock.mock(/\/system\/dictionary\/del/, 'get', dictionaryAPI.del)

Mock.mock(/\/system\/menu\/queryAll/, 'post', menuAPI.queryAll)
Mock.mock(/\/system\/menu\/check/, 'post', menuAPI.check)
Mock.mock(/\/system\/menu\/edit/, 'post', menuAPI.edit)
Mock.mock(/\/system\/menu\/sync/, 'post', menuAPI.sync)

export default Mock
