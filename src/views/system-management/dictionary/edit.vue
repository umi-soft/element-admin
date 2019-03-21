<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="200px">
    <el-form-item label="ID" prop="id">
      <el-input v-model="form.id" disabled/>
    </el-form-item>
    <el-form-item v-if="parentDictionaryName" label="上级字典">
      <el-input :value="parentDictionaryName" disabled/>
    </el-form-item>
    <el-form-item label="字典名称" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="字典规则码" prop="code">
      <el-input v-model="form.code"/>
    </el-form-item>
    <el-form-item label="字典编号" prop="sortNum">
      <el-input v-model="form.sortNum"/>
    </el-form-item>
    <el-form-item label="字典备注" prop="remark">
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
import * as DictionaryAPI from '@/api/system-management/dictionary'
import mixins from './mixins'

export default {
  mixins: [BaseEditForm, mixins],
  data() {
    const form = this.initForm()
    const rules = this.initRules()
    delete form.category
    delete rules.category
    delete form.parentId
    delete rules.parentId
    delete form.type
    delete rules.type
    rules.id = [{
      required: true, message: '编辑信息时ID不能为空', trigger: 'change'
    }]
    return {
      newest: null, // 记录最新的值，后端返回时存储
      form: form,
      rules: rules
    }
  },
  activated() {
    this.newest = this.detail
    DictionaryAPI.queryDictionaryById(this.detail.id).then((data) => {
      deepMergeLeft(this.form, data)
      this.getParentDictionaryName(this.form.parentId)
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    })
    this.queryAllDictionaryType()
  },
  methods: {
    customBackHandler() {
      this.$emit('option-changed', 'query', this.newest)
    },
    customSubmitHandler() {
      DictionaryAPI.editDictionary(this.form).then(data => {
        this.submitSuccessHandler(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }
</style>
