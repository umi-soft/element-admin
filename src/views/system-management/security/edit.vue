<template>
  <div>
    <el-button icon="el-icon-back" round @click="backHandler">返回</el-button>
    <el-card>
      <div slot="header">
        <button-right>
          基础信息
          <template slot="button">
            <el-button type="primary" @click="submitHandler('form')">保存</el-button>
          </template>
        </button-right>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" disabled/>
        </el-form-item>
        <el-form-item label="所属微服务" prop="type">
          <el-select v-model="form.serviceId" filterable clearable placeholder="请输入关键词进行搜索">
            <el-option v-for="(item, index) in dictionaries.allMicroService" :key="index" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="定义" prop="securityDef">
          <el-input v-model="form.securityDef"/>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="分组备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"/>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import BaseEditForm from '@/views/common/mixins/BaseEditForm'
import { deepMergeLeft } from '@/utils'
import * as SecurityAPI from '@/api/system-management/security'
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
      rules: rules
    }
  },
  activated() {
    SecurityAPI.queryById(this.detail.id).then((data) => {
      deepMergeLeft(this.form, data)
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    })
  },
  methods: {
    customSubmitHandler() {
      SecurityAPI.edit(this.form).then(this.submitSuccessHandler)
    },
    customSubmitSuccessHandler() {
      this.$refs['form'].clearValidate()
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-card {
    margin-top: 10px;
  }
</style>
