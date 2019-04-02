<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="200px">
    <el-form-item label="所属微服务" prop="serviceId">
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
    <el-form-item label="备注" prop="remark">
      <el-input v-model="form.remark" type="textarea"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitHandler('form')">保存</el-button>
      <el-button @click="backHandler">取消</el-button>
    </el-form-item>
  </el-form>
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
    return {
      form: form,
      rules: rules
    }
  },
  activated() {
    deepMergeLeft(this.form, this.initForm())
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
  },
  methods: {
    customSubmitHandler() {
      SecurityAPI.add(this.form).then(data => {
        this.submitSuccessHandler(data)
      })
    },
    customSubmitSuccessHandler(data) {
      this.$emit('option-changed', 'edit', data)
    }
  }
}
</script>

<style scoped>

</style>
