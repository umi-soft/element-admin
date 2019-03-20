<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-input v-model="filter" placeholder="输入关键字进行过滤"/>
      </el-card>
    </el-col>
    <el-col :span="24" style="margin: 10px 0px;">
      <button-right>
        部门树列表
        <template slot="button">
          <el-button-group>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','check', selected)">查看</el-button>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','add', selected)">新增子部门</el-button>
            <el-button type="primary" @click="$emit('option-changed','add')">新增</el-button>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','edit', selected)">编辑</el-button>
            <el-button v-if="selected" type="primary" @click="delHandler">删除</el-button>
          </el-button-group>
        </template>
      </button-right>
    </el-col>
    <el-col :span="24">
      <el-tree :data="[{}]" :props="defaultProps">
        <div class="custom-tree-node">
          <div class="name">名称</div>
          <div class="time">最后修改时间</div>
          <div class="time">创建时间</div>
        </div>
      </el-tree>
      <el-tree ref="tree" :data="nodes" :props="defaultProps" :filter-node-method="filterNodeHandler" class="filter-tree" highlight-current accordion @current-change="(value, node) => selected = value">
        <div slot-scope="{ data }" class="custom-tree-node">
          <div class="name">{{ data.name }}</div>
          <div class="time">{{ data.modifiedDate | parseTime }}</div>
          <div class="time">{{ data.createdDate | parseTime }}</div>
        </div>
      </el-tree>
    </el-col>
  </el-row>
</template>

<script>
import * as DeptAPI from '@/api/system-management/dept'

export default {
  props: {
    detail: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      filter: null,
      selected: null,
      nodes: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    filter(filter) {
      this.$refs.tree.filter(filter)
    }
  },
  activated() {
    this.selected = null
    if (this.detail != null && this.detail.id != null) {
      let result = null
      for(let i = 0; i < this.nodes.length; i++) {
        result = this.findNodeById(this.detail.id, this.nodes[i])
        if (result !== null) {
          break
        }
      }
      if (result !== null) { // 说明 detail 是从更新页面传递过来的
        // 页面显示的三项字段将被更新，其中createdDate无需更新
        result.name = this.detail.name
        result.modifiedDate = this.detail.modifiedDate
      } else { // 新增操作获取的
        this.queryAllHandler()
      }
    } else {
      this.queryAllHandler()
    }
  },
  methods: {
    queryAllHandler() {
      DeptAPI.queryAllTreeDepts().then(data => {
        this.nodes = data
        this.$nextTick(() => {
          this.$refs.tree.filter(this.filter)
        })
      })
    },
    delHandler() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeptAPI.delDept(this.selected.id).then(() => {
          this.queryAllHandler()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
    },
    findNodeById(id,node) {
      if (node.id === id) {
        return node
      }
      if (node.children) {
        for(let i = 0; i < node.children.length; i++) {
          const result = this.findNodeById(id, node.children[i])
          if (result !== null) {
            return node
          }
        }
      }
      return null
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

    .time {
      float: right;
      width: 200px;
      min-height: 40px;
      line-height: 40px;
      border-left: 1px solid #ebeef5;
      text-align: center;
    }
  }
</style>
