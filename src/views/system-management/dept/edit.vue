<template>
  <div>
    <el-button icon="el-icon-back" round @click="backHandler">返回</el-button>
    <el-card>
      <div slot="header">
        <button-right>
          部门信息
          <template slot="button">
            <el-button type="primary" @click="submitHandler('form')">保存</el-button>
          </template>
        </button-right>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" disabled/>
        </el-form-item>
        <el-form-item v-if="form.parentId" label="上级部门">
          <el-input :value="detail.name" disabled/>
        </el-form-item>
        <el-form-item label="部门类型" prop="type">
          <el-input v-model="form.type"/>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="是否启用" prop="state">
          <el-switch v-model="form.state" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="部门编号" prop="index">
          <el-input v-model="form.index"/>
        </el-form-item>
        <el-form-item label="部门备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card header="用户信息">
      <el-table :data="users" border style="width: 100%">
        <el-table-column type="index" width="100" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="loginName" label="登录ID" sortable align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名" sortable align="center"/>
        <el-table-column prop="gender" label="性别" width="100" sortable align="center">
          <template slot-scope="scope">{{ scope.row.gender | translateGender }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱" sortable align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="phone" label="电话" width="160" sortable align="center"/>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="warning" @click="delDeptUserHandler(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BaseEditForm from '@/views/common/mixins/BaseEditForm'
import { deepMergeLeft } from '@/utils'
import * as DeptAPI from '@/api/system-management/dept'
import mixins from './mixins'

export default {
  mixins: [BaseEditForm, mixins],
  props: {
    detail: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  data() {
    const form = this.initForm()
    const rules = this.initRules()
    rules.id = [{
      required: true, message: '编辑信息时ID不能为空', trigger: 'change'
    }]
    return {
      form: form,
      rules: rules,
      users: []
    }
  },
  activated() {
    DeptAPI.queryDeptById(this.detail.id).then((data) => {
      deepMergeLeft(this.form, data)
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    })
    this.queryAllUsers()
  },
  methods: {
    customSubmitHandler() {
      DeptAPI.editDept(this.form).then(this.submitSuccessHandler)
    },
    customSubmitSuccessHandler() {
      this.$refs['form'].clearValidate()
    },
    delDeptUserHandler(id) {
      const params = {
        userId: id,
        deptId: this.detail.id
      }
      DeptAPI.delDeptUser(params).then(data => {
        this.optionSuccessHandler()
        this.queryAllUsers()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-card {
    margin-top: 10px;
  }
</style>
