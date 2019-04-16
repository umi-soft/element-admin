<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components/index'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  created() {
    this.$store.dispatch('loadBaseSystemDictionary')
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        'hide-sidebar': !this.sidebar.opened,
        'open-sidebar': this.sidebar.opened,
        'without-animation': this.sidebar.withoutAnimation
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  $sidebar-container-width: 220px !important;
  $hide-sidebar-container-width: 36px !important;

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    // 主体区域
    .main-container {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: $sidebar-container-width;
      position: relative;
    }

    // 侧边栏
    .sidebar-container {
      transition: width 0.28s;
      width: $sidebar-container-width;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;

      //reset element-ui css
      /deep/ .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
      }

      /deep/ .el-scrollbar__bar.is-vertical {
        right: 0px;
      }
      /deep/ .is-horizontal {
        display: none;
      }
      /deep/ a {
        display: inline-block;
        width: 100%;
        overflow: hidden;
      }
      /deep/ .svg-icon {
        margin-right: 16px;
      }
      /deep/ .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
      }
    }

    &.hide-sidebar {
      .sidebar-container {
        width: $hide-sidebar-container-width;
      }
      .main-container {
        margin-left: $hide-sidebar-container-width;
      }

      /deep/ .el-submenu {
        overflow: hidden;
        & > .el-submenu__title {
          padding: 0 10px !important;
          .el-submenu__icon-arrow {
            display: none;
          }
        }
      }

      /deep/ .logo {
        display: none;
      }

      .el-menu--vertical > .el-menu .svg-icon {
        margin-right: 20px;
      }
    }

    &.without-animation {
      .main-container, .sidebar-container {
        transition: none;
      }
    }
  }
</style>
