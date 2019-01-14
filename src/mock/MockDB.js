import Mock from 'mockjs'
import Utils from './utils'

export const deptMockConfig = {
  'id|1': Utils.id,
  'parentId|1': Utils.id, // 父级机构
  'deleted|1': Utils.deleted, // 是否删除
  index: '@increment', // 机构序号
  'type|1': ['政府机构', '国有企业', '民营企业'], // 机构类型
  name: '@cword(5, 10)', // 机构名称
  remark: '@cparagraph(1, 3)', // 机构描述
  createdBy: '@increment', // 创建人
  createdDate: +Mock.Random.date('T'), // 创建时间
  modifiedBy: '@increment', // 最后修改人
  modifiedDate: +Mock.Random.date('T') // 最后修改时间
}

export const dictionaryMockConfig = {
  'id|1': Utils.id,
  'parentId': null, // 上级ID
  'deleted|1': Utils.deleted, // 是否删除
  'category|1': [1, 2, 3], // 类型： 1：业务字典类型, 2：单级业务字典, 3：多级业务字典
  'type|1': Utils.id, // 字典类型ID
  name: '@cword(5, 10)', // 名称
  'code|1': Utils.id, // 规则码
  'index': '@increment', // 编号
  remark: '@cparagraph(1, 3)', // 备注
  createdBy: '@increment', // 创建人
  createdDate: +Mock.Random.date('T'), // 创建时间
  modifiedBy: '@increment', // 最后修改人
  modifiedDate: +Mock.Random.date('T') // 最后修改时间
}

export const groupMockConfig = {
  'id|1': Utils.id,
  'deleted|1': Utils.deleted, // 是否删除
  index: '@increment', // 编号
  name: '@cword(5, 10)', // 名称
  remark: '@cparagraph(1, 3)', // 备注
  createdBy: '@increment', // 创建人
  createdDate: +Mock.Random.date('T'), // 创建时间
  modifiedBy: '@increment', // 最后修改人
  modifiedDate: +Mock.Random.date('T') // 最后修改时间
}

export const menuMockConfig = {
  id: '',
  parentId: '', // 上级ID
  deleted: 0, // 是否删除
  index: '', // 菜单序号
  name: '', // 名称
  icon: '', // 图标
  remark: '', // 备注
  createdBy: '', // 创建人
  createdDate: '', // 创建时间
  modifiedBy: '', // 最后修改人
  modifiedDate: '' // 最后修改时间
}

export const roleMockConfig = {
  'id|1': Utils.id,
  'deleted|1': Utils.deleted, // 是否删除
  index: '@increment', // 序号
  name: '@cword(5, 10)', // 名称
  remark: '@cparagraph(1, 3)', // 描述
  createdBy: '@increment', // 创建人
  createdDate: +Mock.Random.date('T'), // 创建时间
  modifiedBy: '@increment', // 最后修改人
  modifiedDate: +Mock.Random.date('T') // 最后修改时间
}

export const userMockConfig = {
  'id|1': Utils.id, // 主键
  'deleted|1': Utils.deleted, // 是否删除
  'disabled|1': Utils.state, // 是否启用
  index: '@increment', // 序号
  'loginName': /[a-z][A-Z][0-9]/, // 登录ID
  'password': '@id', // 密码
  'name': '@cname', // 姓名
  'nickName': '@cname', // 昵称
  'avatar': '', // 肖像地址
  'avatarContent': '', // 肖像二进制
  'idNumber': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, // 证件号码
  'gender|1': [0, 1], // 性别
  'birthday': '@date("yyyy-MM-dd")', // 出生日期
  'phone': /^1[34578]\d{9}$/, // 联系电话
  'email': '@email', // 联系邮箱
  'address': '@county(true)', // 住址
  'tag': '@cword(5, 10)', // 用户标签
  'remark': '@cparagraph(1, 3)', // 描述
  createdBy: '@increment', // 创建人
  createdDate: +Mock.Random.date('T'), // 创建时间
  modifiedBy: '@increment', // 最后修改人
  modifiedDate: +Mock.Random.date('T') // 最后修改时间
}

export const deptsTree = []

export const depts = []

export const deptUsers = []

export const dictionaries = []

export const groups = []

export const groupUsers = []

export const menus = []

export const menuUrls = []

export const roleMenus = []

export const roles = []

export const userRoles = []

export const users = []

export const admin = {}

export const simple = {}
