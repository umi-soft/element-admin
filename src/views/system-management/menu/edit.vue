<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="200px">
    <el-form-item label="ID" prop="id">
      <el-input v-model="form.id" disabled/>
    </el-form-item>
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="菜单编号" prop="index">
      <el-input v-model="form.index"/>
    </el-form-item>
    <el-form-item label="菜单备注" prop="remark">
      <el-input v-model="form.remark" type="textarea"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitHandler">保存</el-button>
      <el-button @click="backHandler">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import BaseEditForm from '@/views/common/mixins/BaseEditForm'
import { deepMerge } from '@/utils'
import { editMenu } from '@/api/system-management/menu'

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
    const rules = this.initRules()
    return {
      form: form,
      rules: rules
    }
  },
  activated() {
    deepMerge(this.form, this.detail)
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
  },
  methods: {
    initForm(form = {}) {
      return deepMerge(form, {
        id: null,
        index: '',
        name: '',
        remark: ''
      })
    },
    initRules() {
      return {
        id: [{
          required: true, message: '编辑信息时ID不能为空', trigger: 'change'
        }],
        index: [{
          required: true, message: '请输入菜单编号', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入菜单名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }]
      }
    },
    executeSubmit() {
      editMenu(this.form).then(this.submitSuccessHandler)
    }
  }
}
</script>

<style scoped>

</style>
