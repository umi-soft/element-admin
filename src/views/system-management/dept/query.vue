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
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','add', selected)">新增</el-button>
            <el-button v-else type="primary" @click="$emit('option-changed','add')">新增</el-button>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','edit', selected)">编辑</el-button>
            <el-button v-if="selected" type="primary" @click="delHandler">删除</el-button>
          </el-button-group>
        </template>
      </button-right>
    </el-col>
    <el-col :span="24">
      <el-tree ref="tree" :data="nodes" :props="defaultProps" :filter-node-method="filterNodeHandler" class="filter-tree" highlight-current accordion @current-change="(value, node) => selected = value"/>
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
    this.queryAllHandler()
  },
  methods: {
    queryAllHandler() {
      queryAllDepts({}).then(data => {
        console.log(data)
        this.nodes = data
      })
    },
    delHandler() {
      delDept(this.selected.id).then(() => {
        this.queryHandler()
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
</style>
