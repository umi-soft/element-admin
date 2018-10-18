import * as DeptAPI from '@/api/system-management/dept'

export default {
  methods: {
    initRules() {
      return {
        type: [{
          required: true, message: '请输入部门类型', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入部门名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        state: [{
          required: true, message: '请选择部门启用状态', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入部门编号', trigger: 'blur'
        }]
      }
    },
    queryAllUsers() {
      this.users = []
      DeptAPI.queryAllDeptUsers(this.detail.id).then(users => {
        this.users = users
      })
    }
  }
}
