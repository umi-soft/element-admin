<template>
  <div v-if="!item.hidden && item.children" class="menu-wrapper">
    <!-- item及其一级子路由中，至多包含一个非hidden路由，记录为onlyOneShowing && onlyOneShowing是item本身或没有子路由 && alwaysShow为false -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneShowing.children || onlyOneShowing.noShowingChildren) && !item.alwaysShow">
      <app-link :to="resolvePath(onlyOneShowing.path)">
        <el-menu-item :index="resolvePath(onlyOneShowing.path)" :class="{'submenu-title-no-dropdown':!isNest}">
          <item v-if="onlyOneShowing.meta" :icon="onlyOneShowing.meta.icon||item.meta.icon" :title="onlyOneShowing.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"/>

        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneShowing: null
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // 记录最后一个非hidden子路由
          this.onlyOneShowing = item
          return true
        }
      })

      // 有且仅有一个可显示的非hidden子路由,根据上述记录结果，显示该子路由
      if (showingChildren.length === 1) {
        return true
      }

      // 没有可显示的非hidden子路由,显示自身路由
      if (showingChildren.length === 0) {
        this.onlyOneShowing = { ... parent, noShowingChildren: true }
        return true
      }

      // 非hidden子路由大于1个
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .menu-wrapper {
    .submenu-title-no-dropdown {
      position: relative;

      /deep/ .el-tooltip {
        padding: 0px 10px !important;
      }
    }
    /deep/ .el-submenu__title, .el-menu-item{
      &:hover {
        background-color: #001528 !important;
      }
    }
  }

</style>
