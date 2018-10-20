<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="200px">
    <el-form-item v-if="form.parentId !== null" label="上级ID" prop="parentId">
      <el-input v-model="form.parentId" disabled/>
    </el-form-item>
    <el-form-item label="是否启用" prop="state">
      <el-switch v-model="form.state" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item label="字典类型" prop="type">
      <el-select v-model="form.type" filterable clearable placeholder="请输入字典关键词进行搜索">
        <el-option v-for="(item, index) in dictionaryTypeList" :key="index" :label="item.name" :value="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item label="字典名称" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="字典规则码" prop="code">
      <el-input v-model="form.code"/>
    </el-form-item>
    <el-form-item label="字典编号" prop="index">
      <el-input v-model="form.index"/>
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
import { deepMerge } from '@/utils'
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
    const rules = this.initRules()
    return {
      form: form,
      rules: rules
    }
  },
  activated() {
    this.initForm(this.form)
    if (this.detail.id) {
      this.form.parentId = this.detail.id
    }
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
    this.queryAllDictionaryType()
  },
  methods: {
    initForm(form = {}) {
      return deepMerge(form, {
        id: null,
        parentId: null,
        state: 1,
        category: 0,
        type: '',
        name: '',
        code: '',
        index: '',
        remark: ''
      })
    },
    customSubmitHandler() {
      DictionaryAPI.addDictionary(this.form).then(this.submitSuccessHandler)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }
</style>
