<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="getDefaultActive()"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <el-menu-item class="logo" index="-1">UMI-SOFT</el-menu-item>
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { obj2Param } from '@/utils'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    getDefaultActive() {
      const query = obj2Param(this.$route.query)
      let routerPath = this.$route.path
      if (query) {
        routerPath = routerPath + '?' + query
      }
      return routerPath
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .scrollbar-wrapper {
    overflow-x: hidden!important;

    .el-scrollbar__view {
      height: 100%;
    }
  }
</style>
