<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="200px">
    <el-form-item v-if="parentDeptName" label="上级部门">
      <el-input :value="parentDeptName" disabled/>
    </el-form-item>
    <el-form-item label="部门类型" prop="type">
      <el-input v-model="form.type"/>
    </el-form-item>
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="部门编号" prop="sortNum">
      <el-input v-model="form.sortNum"/>
    </el-form-item>
    <el-form-item label="部门备注" prop="remark">
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
    return {
      form: form,
      rules: rules
    }
  },
  activated() {
    deepMergeLeft(this.form, this.initForm())
    if (this.detail.id) {
      this.form.parentId = this.detail.id
    }
    this.getParentDeptName(this.form.parentId)
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
  },
  methods: {
    customSubmitHandler() {
      DeptAPI.addDept(this.form).then(data => {
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
