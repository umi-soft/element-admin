<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-input v-model="filter" placeholder="输入关键字进行过滤"/>
      </el-card>
    </el-col>
    <el-col :span="24" style="margin: 10px 0px;">
      <button-right>
        菜单树列表
        <template slot="button">
          <el-button-group>
            <el-button v-if="selected && !needSync" type="primary" @click="$emit('option-changed','check', selected)">查看</el-button>
            <el-button v-if="needSync" type="primary" @click="syncMenus">同步</el-button>
            <el-button v-if="selected && !needSync" type="primary" @click="$emit('option-changed','edit', selected)">编辑</el-button>
          </el-button-group>
        </template>
      </button-right>
    </el-col>
    <el-col :span="24">
      <el-tree :data="[{}]">
        <div class="custom-tree-node">
          <div class="name">名称</div>
          <div class="remark">备注</div>
          <div class="icon">图标</div>
        </div>
      </el-tree>
      <el-tree ref="tree" :data="menusTree" :filter-node-method="filterNodeHandler" class="filter-tree" highlight-current accordion @current-change="(value, node) => selected = value">
        <div slot-scope="{ data }" class="custom-tree-node">
          <div class="name">
            {{ data.name }}
          </div>
          <div class="remark">
            {{ data.remark }}
          </div>
          <div class="icon">
            <svg-icon :icon-class="data.icon"/>
          </div>
        </div>
      </el-tree>
    </el-col>
  </el-row>
</template>

<script>
import { asyncMenuMap } from '@/router'
import * as MenuAPI from '@/api/system-management/menu'

export default {
  data() {
    return {
      filter: null,
      selected: null,
      menusTree: [],
      allMenus: [],
      needSync: false
    }
  },
  watch: {
    filter(filter) {
      this.$refs.tree.filter(filter)
    }
  },
  activated() {
    this.selected = null
    this.initMenus()
  },
  methods: {
    initMenus() {
      MenuAPI.queryAllMenus({}).then(data => {
        this.allMenus = data
        const menusTree = []
        asyncMenuMap.forEach(router => {
          menusTree.push(MenuAPI.createMenuTree(this.allMenus, router, null))
        })
        this.menusTree = menusTree
        this.needSync = this.menusTree.some(menu => {
          return MenuAPI.syncMenuVoter(this.allMenus, menu)
        })
        if (this.needSync) {
          this.$notify({
            title: '提示',
            type: 'warning',
            message: '检测到您需要同步本地菜单信息树至服务端',
            duration: 0
          })
        }
      })
    },
    syncMenus() {
      this.$confirm('确定要同步吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        MenuAPI.syncMenus(this.menusTree).then(() => {
          this.needSync = false
          this.initMenus()
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        })
      }, () => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    filterNodeHandler(value, data) {
      if (!value) return true
      const show = data.name.indexOf(value) !== -1
      if (!show && this.selected && this.selected.id === data.id) {
        this.selected = null
      }
      return show
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-card {
    border: none;
  }
  .query-btn /deep/ .el-button {
    float: right;
    margin-left: 10px;
  }

  /deep/ .el-tree {
    border-bottom: 1px solid #ebeef5;

    .el-tree-node__content {
      border-top: 1px solid #ebeef5;
      border-left: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      min-height: 40px;
    }
  }

  .custom-tree-node {
    width: 100%;

    .name {
      float: left;
      min-height: 40px;
      line-height: 40px;
    }

    .remark {
      float: right;
      width: 300px;
      min-height: 40px;
      line-height: 40px;
      border-left: 1px solid #ebeef5;
      text-align: center;
    }

    .icon {
      float: right;
      width: 100px;
      min-height: 40px;
      line-height: 40px;
      border-left: 1px solid #ebeef5;
      text-align: center;
    }
  }
</style>
