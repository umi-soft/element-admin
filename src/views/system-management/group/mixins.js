import * as GroupAPI from '@/api/system-management/group'

export default {
  methods: {
    initRules() {
      return {
        name: [{
          required: true, message: '请输入分组名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        state: [{
          required: true, message: '请选择分组启用状态', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入分组编号', trigger: 'blur'
        }]
      }
    },
    queryAllUsers() {
      this.users = []
      GroupAPI.queryAllGroupUsers(this.detail.id).then(users => {
        this.users = users
      })
    }
  }
}
