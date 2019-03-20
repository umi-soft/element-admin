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
