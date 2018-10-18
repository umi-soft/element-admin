import * as RoleAPI from '@/api/system-management/role'
import { queryAllMenus, createMenuTree, syncMenuVoter } from '@/api/system-management/menu'
import { asyncMenuMap } from '@/router'

export default {
  methods: {
    initRules() {
      return {
        name: [{
          required: true, message: '请输入角色名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        state: [{
          required: true, message: '请选择角色启用状态', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入角色编号', trigger: 'blur'
        }]
      }
    },
    queryAllUsers() {
      this.users = []
      RoleAPI.queryAllRoleUsers(this.detail.id).then(users => {
        this.users = users
      })
    },
    filterNodeHandler(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    initMenus() {
      queryAllMenus({}).then(allMenus => {
        const menusTree = []
        asyncMenuMap.forEach(router => {
          menusTree.push(createMenuTree(allMenus, router, null))
        })
        this.menusTree = menusTree
        const needSync = this.menusTree.some(menu => {
          return syncMenuVoter(allMenus, menu)
        })
        if (needSync) {
          this.$notify({
            title: '提示',
            type: 'warning',
            message: '检测到您需要同步本地菜单信息树至服务端',
            duration: 0
          })
        }

        RoleAPI.queryAllRoleMenus(this.detail.id).then(roleMenus => {
          const checkedMenus = []
          roleMenus.forEach(item => {
            checkedMenus.push(item.menuId)
          })
          this.$refs['menusTree'].setCheckedKeys(checkedMenus)
        })
      })
    }
  }
}
