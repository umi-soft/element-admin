import * as menuAPI from '@/api/system-management/menu'

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
      menuAPI.queryAllMenuRole(params).then(roles => { this.roles = roles })
    },
    queryMenuUrls() {
      this.menuUrls = []
      const params = { id: this.detail.id }
      menuAPI.queryAllMenuUrl(params).then(menuUrls => { this.menuUrls = menuUrls })
    }
  }
}
