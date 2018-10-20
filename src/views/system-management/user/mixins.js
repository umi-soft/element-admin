import { mapGetters } from 'vuex'
import * as UserAPI from '@/api/system-management/user'

export default {
  computed: {
    ...mapGetters([
      'dictionaries'
    ])
  },
  methods: {
    initRules() {
      return {
        state: [{
          required: true, message: '请选择用户启用状态', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        loginName: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入用户姓名', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        nickName: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        gender: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        email: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }]
      }
    },
    queryAllUserDepts() {
      this.depts = []
      const params = { id: this.detail.id }
      UserAPI.queryAllUserDepts(params).then(depts => { this.depts = depts })
    },
    queryAllUserGroups() {
      this.groups = []
      const params = { id: this.detail.id }
      UserAPI.queryAllUserGroups(params).then(groups => { this.groups = groups })
    },
    queryAllUserRoles() {
      this.roles = []
      const params = { id: this.detail.id }
      UserAPI.queryAllUserRoles(params).then(roles => { this.roles = roles })
    }
  }
}
