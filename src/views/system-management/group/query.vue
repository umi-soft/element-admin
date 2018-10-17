<template>
  <el-row>
    <el-card>
      <el-col :span="18">
        <el-form
          :model="queryCriteria"
          :inline="true">
          <el-form-item label="启用状态:" prop="flag">
            <el-select v-model="queryCriteria.flag" placeholder="请选择分组启用状态">
              <el-option value="1" label="已启用"/>
              <el-option value="0" label="已禁用"/>
            </el-select>
          </el-form-item>
          <el-form-item label="分组名称:" prop="name">
            <el-input v-model="queryCriteria.name" placeholder="请输入分组名称"/>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="query-btn">
        <el-button round type="info" @click="resetHandler">重置</el-button>
        <el-button round type="primary" @click="queryHandler">查询</el-button>
      </el-col>
    </el-card>
    <el-col :span="24" style="margin: 10px 0px;">
      <button-right>
        分组列表
        <template slot="button">
          <el-button-group>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','check', selected)">查看</el-button>
            <el-button type="primary" @click="$emit('option-changed','add')">新增</el-button>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','edit', selected)">编辑</el-button>
            <el-button v-if="selected" type="primary" @click="delHandler">删除</el-button>
          </el-button-group>
        </template>
      </button-right>
    </el-col>
    <el-col :span="24">
      <el-table :data="pagination.list" highlight-current-row stripe border @current-change="(row) => { selected = row }" @row-dblclick="$emit('option-changed','check', selected)" @sort-change="sortChangeHandler">
        <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" sortable="custom"/>
        <el-table-column prop="createdDate" label="创建时间" width="180" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
        </el-table-column>
        <el-table-column prop="modifiedDate" label="最后修改时间" width="180" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.modifiedDate | parseTime }}</template>
        </el-table-column>
        <el-table-column prop="state" label="启用状态" width="100" sortable="custom" align="center">
          <template slot-scope="scope">
            <state :detail="scope.row"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination :pagination="pagination" @page-size-changed="pageSizeChangeHandler" @page-changed="pageChangeHandler"/>
    </el-col>
  </el-row>
</template>

<script>
import { deepMerge } from '@/utils'
import BaseQueryPageForm from '@/views/common/mixins/BaseQueryPageForm'
import { queryPageGroups, delGroup } from '@/api/system-management/group'

export default {
  mixins: [BaseQueryPageForm],
  data() {
    const queryCriteria = this.initQueryCriteria()
    return {
      queryCriteria: queryCriteria,
      selected: null
    }
  },
  methods: {
    initQueryCriteria(form = {}) {
      return deepMerge(form, {
        flag: '',
        name: ''
      })
    },
    executeQueryPage() {
      queryPageGroups(this.createQueryParams()).then(data => {
        this.queryResultHandler(data)
      })
    },
    customDelHandler() {
      delGroup(this.selected.id).then(() => {
        this.queryHandler()
      })
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
