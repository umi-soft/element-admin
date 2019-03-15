import * as RoleAPI from '@/api/system-management/role'
import * as MenuAPI from '@/api/system-management/menu'
import { asyncMenuMap } from '@/router'

export default {
  data() {
    return {
      menusTree: [],
      users: [],
      groups: [],
      depts: []
    }
  },
  methods: {
    initForm() {
      return {
        id: null,
        token: null,
        name: '',
        sortNum: '',
        remark: ''
      }
    },
    initRules() {
      return {
        name: [{
          required: true, message: '请输入角色名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        sortNum: [{
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
    queryAllGroups() {
      this.groups = []
      RoleAPI.queryAllRoleGroups(this.detail.id).then(groups => {
        this.groups = groups
      })
    },
    queryAllDepts() {
      this.depts = []
      RoleAPI.queryAllRoleDepts(this.detail.id).then(depts => {
        this.depts = depts
      })
    },
    filterNodeHandler(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    initMenus() {
      MenuAPI.queryAllMenus({}).then(allMenus => {
        const menusTree = []
        asyncMenuMap.forEach(router => {
          menusTree.push(MenuAPI.createMenuTree(allMenus, router, null))
        })
        this.menusTree = menusTree
        const needSync = this.menusTree.some(menu => {
          return MenuAPI.syncMenuVoter(allMenus, menu)
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
            checkedMenus.push(item.id)
          })
          this.$refs['menusTree'].setCheckedKeys(checkedMenus)
        })
      })
    }
  }
}
