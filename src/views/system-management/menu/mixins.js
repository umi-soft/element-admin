import * as MenuAPI from '@/api/system-management/menu'

export default {
  data() {
    return {
      parentMenuName: '',
      menuUrls: [],
      roles: []
    }
  },
  methods: {
    initForm() {
      return {
        id: null,
        token: null,
        index: '',
        name: '',
        remark: ''
      }
    },
    initRules() {
      return {
        id: [{
          required: true, message: '编辑信息时ID不能为空', trigger: 'change'
        }],
        index: [{
          required: true, message: '请输入菜单编号', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入菜单名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }]
      }
    },
    queryMenuRoles() {
      this.roles = []
      const params = { id: this.detail.id }
      MenuAPI.queryAllMenuRole(params).then(roles => { this.roles = roles })
    },
    queryMenuUrls() {
      this.menuUrls = []
      const params = { id: this.detail.id }
      MenuAPI.queryAllMenuUrl(params).then(menuUrls => { this.menuUrls = menuUrls })
    },
    getParentMenuName(id) {
      this.parentMenuName = ''
      if (!id) return
      MenuAPI.queryMenuById(id).then(menu => {
        this.parentMenuName = menu.name
      })
    }
  }
}
