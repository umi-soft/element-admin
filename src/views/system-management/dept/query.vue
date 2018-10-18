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
        <div slot-scope="{ data }" class="custom-tree-node">
          <div class="name">名称</div>
          <div class="state">状态</div>
          <div class="time">最后修改时间</div>
          <div class="time">创建时间</div>
        </div>
      </el-tree>
      <el-tree ref="tree" :data="nodes" :props="defaultProps" :filter-node-method="filterNodeHandler" class="filter-tree" highlight-current accordion @current-change="(value, node) => selected = value">
        <div slot-scope="{ data }" class="custom-tree-node">
          <div class="name">{{ data.name }}</div>
          <div class="state">
            <state :detail="data"/>
          </div>
          <div class="time">{{ data.modifiedDate | parseTime }}</div>
          <div class="time">{{ data.createdDate | parseTime }}</div>
        </div>
      </el-tree>
    </el-col>
  </el-row>
</template>

<script>
import { queryAllDepts, delDept } from '@/api/system-management/dept'

export default {
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
    this.queryAllHandler()
  },
  methods: {
    queryAllHandler() {
      queryAllDepts({}).then(data => {
        this.nodes = data
      })
    },
    delHandler() {
      delDept(this.selected.id).then(() => {
        this.queryAllHandler()
      })
    },
    filterNodeHandler(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
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

    .state {
      float: right;
      width: 100px;
      min-height: 40px;
      line-height: 40px;
      border-left: 1px solid #ebeef5;
      text-align: center;
    }
  }
</style>
