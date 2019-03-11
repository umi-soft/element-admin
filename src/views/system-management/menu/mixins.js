import * as MenuAPI from '@/api/system-management/menu'

export default {
  data() {
    return {
      parentMenuName: '',
      roles: [],
      securities: []
    }
  },
  methods: {
    initForm() {
      return {
        id: null,
        token: null,
        sortNum: '',
        name: '',
        remark: ''
      }
    },
    initRules() {
      return {
        id: [{
          required: true, message: '编辑信息时ID不能为空', trigger: 'change'
        }],
        sortNum: [{
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
      MenuAPI.queryAllMenuRole(this.detail.id).then(roles => { this.roles = roles })
    },
    queryMenuSecurities() {
      this.securities = []
      MenuAPI.queryAllMenuSecurities(this.detail.id).then(securities => {
        this.securities = securities
      })
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
