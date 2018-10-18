import * as MenuAPI from '@/api/system-management/menu'

export default {
  data() {
    return {
      menuUrls: [],
      roles: []
    }
  },
  methods: {
    queryMenuRoles() {
      this.roles = []
      const params = { id: this.detail.id }
      MenuAPI.queryAllMenuRole(params).then(roles => { this.roles = roles })
    },
    queryMenuUrls() {
      this.menuUrls = []
      const params = { id: this.detail.id }
      MenuAPI.queryAllMenuUrl(params).then(menuUrls => { this.menuUrls = menuUrls })
    }
  }
}
