<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="200px">
    <el-form-item label="ID" prop="id">
      <el-input v-model="form.id" disabled/>
    </el-form-item>
    <el-form-item v-if="form.parentId !== null" label="上级ID" prop="parentId">
      <el-input v-model="form.parentId" disabled/>
    </el-form-item>
    <el-form-item label="是否启用" prop="state">
      <el-switch v-model="form.state" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item label="字典分类名称" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="字典分类规则码" prop="code">
      <el-input v-model="form.code"/>
    </el-form-item>
    <el-form-item label="字典分类编号" prop="index">
      <el-input v-model="form.index"/>
    </el-form-item>
    <el-form-item label="字典分类备注" prop="remark">
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
import { deepMerge, deepMergeLeft } from '@/utils'
import * as DictionaryAPI from '@/api/system-management/dictionary'
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
    delete form.category
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
    DictionaryAPI.queryDictionaryById(this.detail.id).then((data) => {
      deepMergeLeft(this.form, data)
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    })
  },
  methods: {
    customSubmitHandler() {
      DictionaryAPI.editDictionary(this.form).then(this.submitSuccessHandler)
    }
  }
}
</script>

<style scoped>

</style>
