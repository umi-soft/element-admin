import { mapGetters } from 'vuex'
import store from '@/store'
import * as UserAPI from '@/api/system-management/user'
import defaultAvatar from '@/assets/images/avatar.jpeg'

export default {
  data() {
    return {
      uploadAvatarHeaders: {
        Authorization: store.getters.token
      },
      uploadAvatar: UserAPI.uploadAvatar,
      previewAvatar: UserAPI.previewAvatar + '?token=' + this.$store.getters.token + '&avatar='
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
        disabled: '',
        sortNum: '',
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
        UserAPI.checkLoginName({ id: this.form.id, loginName: value }).then(data => {
          if (data.exist === 0) {
            callback()
          } else {
            callback(new Error('用户名已存在'))
          }
        })
      }
      return {
        disabled: [{
          required: true, message: '请选择用户启用状态', trigger: 'blur'
        }],
        sortNum: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        loginName: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }, {
          validator: validateLoginName, trigger: 'change'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入用户姓名', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        nickName: [{
          required: true, message: '请输入简称', trigger: 'blur'
        }],
        gender: [{
          required: true, message: '请输入性别', trigger: 'blur'
        }],
        email: [{
          required: true, message: '请输入邮箱', trigger: 'blur'
        }]
      }
    },
    getAvatar(avatar) {
      if (avatar) {
        return this.previewAvatar + avatar
      } else if (avatar.trim().startsWith("http")) {
        return avatar
      } else {
        return defaultAvatar
      }
    },
    // 用户所属的部门信息
    queryAllUserDepts(id) {
      this.depts = []
      if (!id) id = this.detail.id
      const params = { id: id }
      UserAPI.queryAllUserDepts(params).then(depts => { this.depts = depts })
    },
    // 用户所属的用户组信息查询
    queryAllUserGroups(id) {
      this.userGroups = []
      if (!id) id = this.detail.id
      const params = { id: id }
      UserAPI.queryAllUserGroups(params).then(groups => { this.userGroups = groups })
    },
    // 用户所属的角色组信息查询
    queryAllRoleGroups(id) {
      this.roleGroups = []
      if (!id) id = this.detail.id
      const params = { id: id }
      UserAPI.queryAllUserRoleGroups(params).then(groups => { this.roleGroups = groups })
    },
    // 用户所属的角色信息
    queryAllUserRoles(id) {
      this.roles = []
      if (!id) id = this.detail.id
      const params = { id: id }
      UserAPI.queryAllUserRoles(params).then(roles => { this.roles = roles })
    },
    // eslint-disable-next-line no-unused-vars
    uploadAvatarSuccess(response, file, fileList) {
      this.form.avatar = response.data.fileName
    },
    // eslint-disable-next-line no-unused-vars
    uploadAvatarError(response, file, fileList) {
      this.form.avatar = null
    }
  }
}
