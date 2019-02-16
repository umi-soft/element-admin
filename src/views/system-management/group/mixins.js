import * as GroupAPI from '@/api/system-management/group'

export default {
  props: {
    detail: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isUserGroup: this.$route.query.category === '' + 1,
      isRoleGroup: this.$route.query.category === '' + 2
    }
  },
  methods: {
    initForm() {
      return {
        id: null,
        // 新增操作，根据路由决定该值的实际取值，分组可面向用户、角色等
        // 其他操作不允许修改该字段
        category: this.$route.query.category,
        name: '',
        sortNum: '',
        remark: ''
      }
    },
    initRules() {
      return {
        category: [{
          required: true, message: '请输入分组类型', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入分组名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        sortNum: [{
          required: true, message: '请输入分组编号', trigger: 'blur'
        }]
      }
    },
    queryAllUsers() {
      this.users = []
      let queryAllUsers = null
      if (this.isUserGroup) {
        queryAllUsers = GroupAPI.queryAllUserGroupUsers // 用户分组下的所有用户
      }
      if (this.isRoleGroup) {
        queryAllUsers = GroupAPI.queryAllRoleGroupUsers // 角色分组下的所有用户
      }
      queryAllUsers(this.detail.id).then(users => {
        this.users = users
      })
    },
    queryAllGroups() {
      this.groups = []
      let queryAllGroups = null
      if (this.isUserGroup) {
        queryAllGroups = GroupAPI.queryAllRoleGroups // 用户分组下的所有角色分组
      }
      if (this.isRoleGroup) {
        queryAllGroups = GroupAPI.queryAllUserGroups // 角色分组下的所有用户分组
      }
      queryAllGroups(this.detail.id).then(groups => {
        this.groups = groups
      })
    },
    queryAllRoles() {
      this.roles = []
      GroupAPI.queryAllGroupRoles(this.detail.id).then(roles => {
        this.roles = roles
      })
    },
    getGroupName() {
      if (this.isUserGroup) return '关联的角色组信息'
      if (this.isRoleGroup) return '关联的用户组信息'
      return '未知分组信息'
    }
  }
}
