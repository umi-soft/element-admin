<template>
  <el-form ref="form" :model="form" :rules="addRules" label-width="200px">
    <el-form-item v-if="form.id !== null" label="ID" prop="id">
      <el-input v-model="form.id" disabled/>
    </el-form-item>
    <el-form-item label="分组名称" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="是否启用" prop="index">
      <el-switch v-model="form.state" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item label="分组编号" prop="index">
      <el-input v-model="form.index"/>
    </el-form-item>
    <el-form-item label="分组备注" prop="remark">
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
import { deepMerge, deepClone } from '@/utils'
import { addGroup, editGroup } from '@/api/system-management/group'

export default {
  mixins: [ BaseEditForm ],
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
      editRules: editRules
    }
  },
  activated() {
    if (this.optionType === 'edit') {
      deepMerge(this.form, this.detail)
    } else {
      this.initForm(this.form)
    }
    // 使用$nextTick目的是为了防止clearValidate部分不生效（index 字段，可能是因为关键字的原因）
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
  },
  methods: {
    initForm(form = {}) {
      return deepMerge(form, {
        id: null,
        name: '',
        state: 1,
        index: '',
        remark: ''
      })
    },
    initRules() {
      return {
        name: [{
          required: true, message: '请输入分组名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        state: [{
          required: true, message: '请选择分组启用状态', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入分组编号', trigger: 'change'
        }]
      }
    },
    executeSubmit() {
      if (this.optionType === 'edit') {
        editGroup(this.form).then(this.submitSuccessHandler)
      } else if (this.optionType === 'add') {
        addGroup(this.form).then(this.submitSuccessHandler)
      }
    }
  }
}
</script>

<style scoped>

</style>
