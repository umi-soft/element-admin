import { mapGetters } from 'vuex'
import * as DeptAPI from '@/api/system-management/dept'

export default {
  data() {
    return {
      parentDeptName: '',
      users: [],
      roles: []
    }
  },
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
        parentId: null,
        type: '',
        name: '',
        sortNum: '',
        remark: ''
      }
    },
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
        sortNum: [{
          required: true, message: '请输入部门编号', trigger: 'blur'
        }]
      }
    },
    queryAllUsers() {
      this.users = []
      DeptAPI.queryAllDeptUsers(this.detail.id).then(users => {
        this.users = users
      })
    },
    queryAllRoles() {
      this.roles = []
      DeptAPI.queryAllDeptRoles(this.detail.id).then(roles => {
        this.roles = roles
      })
    },
    getParentDeptName(id) {
      this.parentDeptName = ''
      if (!id) return
      DeptAPI.queryDeptById(id).then(dept => {
        this.parentDeptName = dept.name
      })
    }
  }
}
