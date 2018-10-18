<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="200px">
    <el-form-item label="分组名称" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="是否启用" prop="state">
      <el-switch v-model="form.state" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item label="分组编号" prop="index">
      <el-input v-model="form.index"/>
    </el-form-item>
    <el-form-item label="分组备注" prop="remark">
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
import * as GroupAPI from '@/api/system-management/group'
import mixins from './mixins'

export default {
  mixins: [BaseEditForm, mixins],
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
    const rules = this.initRules()
    return {
      form: form,
      rules: rules
    }
  },
  activated() {
    this.initForm(this.form)
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
  },
  methods: {
    initForm(form = {}) {
      return deepMerge(form, {
        name: '',
        state: 1,
        index: '',
        remark: ''
      })
    },
    customSubmitHandler() {
      GroupAPI.addGroup(this.form).then(data => {
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
