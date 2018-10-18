<template>
  <el-form ref="form" :model="form" :rules="optionType === 'edit' ? editRules : addRules" label-width="200px">
    <el-form-item v-if="form.id !== null" label="ID" prop="id">
      <el-input v-model="form.id" disabled/>
    </el-form-item>
    <el-form-item v-if="form.parentId !== null" label="上级ID" prop="parentId">
      <el-input v-model="form.parentId" disabled/>
    </el-form-item>
    <el-form-item label="是否启用" prop="state">
      <el-switch v-model="form.state" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item label="字典类型" prop="type">
      <el-select v-model="form.type" :remote-method="queryAllDictionaryType" :loading="loading" filterable clearable remote reserve-keyword placeholder="请输入字典关键词进行搜索">
        <el-option v-for="(item,index) in list" :key="index" :label="item.name" :value="item.id"/>
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
import { deepMerge, deepClone } from '@/utils'
import * as DictionaryAPI from '@/api/system-management/dictionary'

export default {
  mixins: [BaseEditForm],
  props: {
    optionType: {
      required: true,
      type: String
    },
    detail: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  data() {
    const form = this.initForm()
    const addRules = this.initRules()
    const editRules = deepClone(addRules)
    editRules.id = [{
      required: true, message: '编辑信息时ID不能为空', trigger: 'change'
    }]
    return {
      form: form,
      addRules: addRules,
      editRules: editRules,

      list: [],
      loading: false
    }
  },
  activated() {
    if (this.optionType === 'edit') {
      deepMerge(this.form, this.detail)
    } else {
      this.initForm(this.form)
      if (this.detail.id) {
        this.form.parentId = this.detail.id
      }
    }
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
  },
  methods: {
    initForm(form = {}) {
      return deepMerge(form, {
        id: null,
        parentId: null,
        state: 1,
        category: 1,
        type: '',
        name: '',
        code: '',
        index: '',
        remark: ''
      })
    },
    initRules() {
      return {
        state: [{
          required: true, message: '请选择字典启用状态', trigger: 'blur'
        }],
        type: [{
          required: true, message: '请选择字典类型', trigger: 'change'
        }],
        name: [{
          required: true, message: '请输入字典名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入字典编号', trigger: 'blur'
        }]
      }
    },
    customSubmitHandler() {
      if (this.optionType === 'edit') {
        DictionaryAPI.editDictionary(this.form).then(this.submitSuccessHandler)
      } else if (this.optionType === 'add') {
        DictionaryAPI.addDictionary(this.form).then(this.submitSuccessHandler)
      }
    },
    queryAllDictionaryType(name) {
      if (!name) {
        this.loading = true
        DictionaryAPI.queryAllDictionaries({
          filters: [{
            field: 'name',
            value: name
          }],
          sorts: []
        }).then((list) => {
          this.list = list
          this.loading = false
        }, () => {
          this.list = []
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }
</style>
