<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="200px">
    <el-form-item v-if="parentDictionaryName" label="上级字典">
      <el-input :value="parentDictionaryName" disabled/>
    </el-form-item>
    <!--  禁止多级字典新增子节点时编辑分类，应该直接继承自父节点即可 -->
    <el-form-item v-if="categoryEditAble" label="字典分类" prop="type">
      <el-select v-model="form.type" filterable clearable placeholder="请输入字典分类关键词进行搜索">
        <el-option v-for="(item, index) in dictionaryTypeList" :key="index" :label="item.name" :value="item.id"/>
      </el-select>
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
    return {
      newest: null, // 记录最新的值，后端返回时存储
      form: form,
      rules: rules
    }
  },
  computed: {
    categoryEditAble() {
      return !(this.category === '3' && this.form.parentId !== 'root')
    }
  },
  activated() {
    this.newest = null
    deepMergeLeft(this.form, this.initForm())
    this.form.category = this.category
    if (this.category === '3') {
      this.form.parentId = this.detail.id ? this.detail.id : 'root'
      this.form.type = this.detail.type
    }
    this.getParentDictionaryName(this.form.parentId)
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
    this.queryAllDictionaryType()
  },
  methods: {
    customBackHandler() {
      this.$emit('option-changed', 'query', this.newest)
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
