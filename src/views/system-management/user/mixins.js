import { mapGetters } from 'vuex'
import * as UserAPI from '@/api/system-management/user'

export default {
  computed: {
    ...mapGetters([
      'dictionaries'
    ])
  },
  methods: {
    initForm() {
      return {
        id: null,
        token: null,
        state: '',
        index: '',
        loginName: '',
        name: '',
        nickName: '',
        avatar: '',
        idNumber: '',
        gender: '',
        birthday: '',
        phone: '',
        email: '',
        address: '',
        tag: '',
        remark: ''
      }
    },
    initRules() {
      const validateLoginName = (rule, value, callback) => {
        UserAPI.checkLoginName({ id: this.id, loginName: value }).then(data => {
          if (data.exist === 0) {
            callback()
          } else {
            callback(new Error('用户名已存在'))
          }
        })
      }
      return {
        state: [{
          required: true, message: '请选择用户启用状态', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        loginName: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }, {
          validator: validateLoginName, trigger: 'blur'
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
    queryAllUserDepts(id) {
      this.depts = []
      if (!id) id = this.detail.id
      const params = { id: id }
      UserAPI.queryAllUserDepts(params).then(depts => { this.depts = depts })
    },
    queryAllUserGroups(id) {
      this.groups = []
      if (!id) id = this.detail.id
      const params = { id: id }
      UserAPI.queryAllUserGroups(params).then(groups => { this.groups = groups })
    },
    queryAllUserRoles(id) {
      this.roles = []
      if (!id) id = this.detail.id
      const params = { id: id }
      UserAPI.queryAllUserRoles(params).then(roles => { this.roles = roles })
    }
  }
}
