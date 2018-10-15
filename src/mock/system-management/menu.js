import Mock from 'mockjs'
import { deepMerge } from '@/utils'
import Utils from '../utils'

const mockConfig = {
  'id|1': Utils.id,
  'parentId|1': Utils.id, // 上级ID
  'flag|1': Utils.flag, // 是否删除
  'state|1': Utils.state, // 是否启用
  index: '@increment', // 菜单序号
  name: '@cword(5, 10)', // 名称
  icon: '', // 图标
  remark: '@cparagraph(1, 3)', // 备注
  createdBy: '@increment', // 创建人
  createdDate: +Mock.Random.date('T'), // 创建时间
  modifiedBy: '@increment', // 最后修改人
  modifiedDate: +Mock.Random.date('T') // 最后修改时间
}

export const row = Mock.mock(mockConfig)

export const rows = []
rows.push(row)

for (let i = 0; i < 300; i++) {
  rows.push(Mock.mock(mockConfig))
}

export default {
  queryAll: config => {
    return {
      code: 1,
      message: '操作成功',
      data: []
    }
  },
  check: config => {
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  },
  edit: config => {
    const params = JSON.parse(config.body)
    const row = rows[rows.findIndex(item => { return item.id === params.id })]
    deepMerge(row, params)
    return {
      code: 1,
      message: '操作成功',
      data: {}
    }
  }
}
