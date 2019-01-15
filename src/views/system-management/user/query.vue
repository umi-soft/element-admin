<template>
  <el-row>
    <el-card>
      <el-col :span="24">
        <el-form :model="queryCriteria" label-width="150px">
          <el-col :span="8">
            <el-form-item label="是否删除:" prop="deleted">
              <el-select v-model="queryCriteria.deleted" clearable placeholder="全部">
                <el-option v-for="item in dictionaries.trueOrFalse" :key="item.key" :value="item.key" :label="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登录ID:" prop="loginName">
              <el-input v-model="queryCriteria.loginName" placeholder="请输入登录ID"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="queryCriteria.name" placeholder="请输入姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别:" prop="gender">
              <el-select v-model="queryCriteria.gender" clearable placeholder="全部">
                <el-option v-for="item in dictionaries.gender" :key="item.key" :value="item.key" :label="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="queryCriteria.email" placeholder="请输入邮箱"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="ID:" prop="id">
              <el-input v-model="queryCriteria.id" placeholder="请输入ID"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <flex-center>
              <el-button round type="info" @click="resetHandler">重置</el-button>
              <el-button round type="primary" @click="queryHandler">查询</el-button>
            </flex-center>
          </el-col>
        </el-form>
      </el-col>
    </el-card>
    <el-col :span="24" style="margin: 10px 0px;">
      <button-right>
        用户列表
        <template slot="button">
          <el-button-group>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','check', selected)">查看</el-button>
            <el-button type="primary" @click="$emit('option-changed','add')">新增</el-button>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','edit', selected)">编辑</el-button>
            <el-button v-if="selected" type="primary" @click="delHandler">删除</el-button>
            <el-button v-if="selectedUsers.length > 0" type="primary" @click="$emit('option-changed','batchEdit', selectedUsers)">批量编辑</el-button>
          </el-button-group>
        </template>
      </button-right>
    </el-col>
    <el-col :span="24">
      <el-table :data="pagination.list" highlight-current-row stripe border @current-change="(row) => { selected = row }" @row-dblclick="$emit('option-changed','check', selected)" @sort-change="sortChangeHandler" @selection-change="clickCheckboxHandler">
        <el-table-column type="selection" label="全选" />
        <el-table-column :show-overflow-tooltip="true" prop="loginName" label="登录ID" sortable="custom" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名" sortable="custom" align="center"/>
        <el-table-column prop="gender" label="性别" width="100" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.gender | translateGender }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱" sortable="custom" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="phone" label="电话" width="160" sortable="custom" align="center"/>
        <el-table-column prop="createdDate" label="创建时间" width="180" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
        </el-table-column>
        <el-table-column prop="disabled" label="是否启用" width="100" sortable="custom" align="center">
          <template slot-scope="scope">
            <state :state="scope.row.disabled"/>
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
import * as UserAPI from '@/api/system-management/user'
import mixins from './mixins'

export default {
  mixins: [BaseQueryPageForm, mixins],
  data() {
    const queryCriteria = this.initQueryCriteria()
    return {
      queryCriteria: queryCriteria,
      selected: null,
      selectedUsers: []
    }
  },
  activated() {
    this.selected = null
  },
  methods: {
    initQueryCriteria(form = {}) {
      return deepMerge(form, {
        id: '',
        deleted: '',
        gender: '',
        name: '',
        email: '',
        loginName: ''
      })
    },
    executeQueryPage() {
      UserAPI.queryPageUsers(this.createQueryParams()).then(data => {
        this.queryResultHandler(data)
      })
    },
    customDelHandler() {
      UserAPI.delUser({ id: this.selected.id }).then(() => {
        this.queryHandler()
      })
    },
    clickCheckboxHandler(selection) {
      this.selectedUsers = selection
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-card {
    border: none;
  }
  /deep/ .el-button {
    margin-left: 10px;
  }
</style>
