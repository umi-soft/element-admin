<template>
  <el-form ref="form" :model="form" :rules="addRules" label-width="200px">
    <el-form-item v-if="form.id !== null" label="ID" prop="id">
      <el-input v-model="form.id" disabled/>
    </el-form-item>
    <el-form-item v-if="form.parentId" label="上级部门">
      <el-input :value="detail.name" disabled/>
    </el-form-item>
    <el-form-item label="部门类型" prop="type">
      <el-input v-model="form.type"/>
    </el-form-item>
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="是否启用" prop="index">
      <el-switch v-model="form.state" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item label="部门编号" prop="index">
      <el-input v-model="form.index"/>
    </el-form-item>
    <el-form-item label="部门备注" prop="remark">
      <el-input v-model="form.remark" type="textarea"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { deepMerge, deepClone } from '@/utils'
import { addDept, editDept } from '@/api/system-management/dept'

export default {
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
      if (this.detail.id) {
        this.form.parentId = this.detail.id
      }
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
        parentId: null,
        type: '',
        name: '',
        state: 1,
        index: '',
        remark: ''
      })
    },
    initRules() {
      return {
        type: [{
          required: true, message: '请输入部门类型', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入部门名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        state: [{
          required: true, message: '请选择部门启用状态', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入部门编号', trigger: 'change'
        }]
      }
    },
    back() {
      this.$emit('option-changed')
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (this.optionType === 'edit') {
          editDept(this.form).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.back()
          })
        } else if (this.optionType === 'add') {
          addDept(this.form).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.back()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
