<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-input placeholder="输入关键字进行过滤" v-model="filter"/>
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
      <el-tree ref="tree" class="filter-tree" highlight-current accordion :data="nodes" :props="defaultProps" :filter-node-method="filterNodeHandler" @current-change="(value, node) => { this.selected = value }"/>
    </el-col>
  </el-row>
</template>

<script>
import { deepClone } from '@/utils'
import { queryAllDepts, delDept } from '@/api/system-management/dept'
import ButtonRight from '@/views/common/layout/ButtonRight'

export default {
  components: { ButtonRight },
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
  },
  watch: {
    filter(filter) {
      this.$refs.tree.filter(filter)
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
