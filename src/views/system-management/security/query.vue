<template>
  <el-row>
    <el-card>
      <el-col :span="24">
        <el-form
          :model="queryCriteria" label-width="130px">
          <el-col :span="6">
            <el-form-item label="是否为内置资源:" prop="fromSystem">
              <el-select v-model="queryCriteria.fromSystem" clearable placeholder="全部">
                <el-option v-for="item in dictionaries.trueOrFalse" :key="item.key" :value="item.key" :label="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属服务:" prop="serviceId">
              <el-select v-model="queryCriteria.serviceId" clearable placeholder="全部">
                <el-option v-for="item in dictionaries.allMicroService" :key="item.key" :value="item.key" :label="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源定义:" prop="securityDef">
              <el-input v-model="queryCriteria.securityDef" placeholder="请输入资源定义"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源名称:" prop="name">
              <el-input v-model="queryCriteria.name" placeholder="请输入资源名称"/>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col :span="24" class="query-btn">
        <flex-center>
          <el-button round type="info" @click="resetHandler">重置</el-button>
          <el-button round type="primary" @click="queryHandler">查询</el-button>
        </flex-center>
      </el-col>
    </el-card>
    <el-col :span="24" style="margin: 10px 0px;">
      <button-right>
        资源列表
        <template slot="button">
          <el-button-group>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','check', selected)">查看</el-button>
            <el-button type="primary" @click="$emit('option-changed','add')">新增</el-button>
            <el-button v-if="selected && selected.fromSystem == 0" type="primary" @click="$emit('option-changed','edit', selected)">编辑</el-button>
            <el-button v-if="selected && selected.fromSystem == 0" type="primary" @click="delHandler">删除</el-button>
          </el-button-group>
        </template>
      </button-right>
    </el-col>
    <el-col :span="24">
      <el-table :data="pagination.list" highlight-current-row stripe border @current-change="(row) => { selected = row }" @row-dblclick="$emit('option-changed','check', selected)" @sort-change="sortChangeHandler">
        <el-table-column prop="serviceId" label="服务名称" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.serviceId | translateDictionary(dictionaries.allMicroService) }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="securityDef" label="定义" sortable="custom"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" sortable="custom"/>
        <el-table-column prop="createdDate" label="创建时间" width="180" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
        </el-table-column>
        <el-table-column prop="modifiedDate" label="最后修改时间" width="180" sortable="custom" align="center">
          <template slot-scope="scope">{{ scope.row.modifiedDate | parseTime }}</template>
        </el-table-column>
      </el-table>
      <pagination :pagination="pagination" @page-size-changed="pageSizeChangeHandler" @page-changed="pageChangeHandler"/>
    </el-col>
  </el-row>
</template>

<script>
import { deepMerge } from '@/utils'
import BaseQueryPageForm from '@/views/common/mixins/BaseQueryPageForm'
import * as SecurityAPI from '@/api/system-management/security'
import mixins from './mixins'

export default {
  // TODO 新增、修改、查看操作，字段补全
  mixins: [BaseQueryPageForm, mixins],
  data() {
    const queryCriteria = this.initQueryCriteria()
    return {
      queryCriteria: queryCriteria,
      selected: null
    }
  },
  activated() {
    this.selected = null
  },
  methods: {
    initQueryCriteria(form = {}) {
      return deepMerge(form, {
        fromSystem: '',
        serviceId: '',
        securityDef: '',
        name: ''
      })
    },
    executeQueryPage() {
      SecurityAPI.queryPage(this.createQueryParams()).then(data => {
        this.queryResultHandler(data)
      })
    },
    customDelHandler() {
      SecurityAPI.del(this.selected.id).then(() => {
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
