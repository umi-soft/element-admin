<template>
  <el-form ref="form" :model="form" :rules="optionType === 'edit' ? editRules : addRules" label-width="200px">
    <el-form-item v-if="form.id !== null" label="ID" prop="id">
      <el-input v-model="form.id" disabled/>
    </el-form-item>
    <el-form-item label="是否启用" prop="state">
      <el-switch v-model="form.state" :active-value="1" :inactive-value="0"/>
    </el-form-item>
    <el-form-item label="用户编号" prop="index">
      <el-input v-model="form.index"/>
    </el-form-item>
    <el-form-item label="登录ID" prop="loginName">
      <el-input v-model="form.loginName"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password"/>
    </el-form-item>
    <el-form-item label="用户姓名" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="form.nickName"/>
    </el-form-item>
    <el-form-item label="照片" prop="avatar">
      <el-upload :show-file-list="false" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
        <img v-if="form.avatar" :src="form.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"/>
      </el-upload>
    </el-form-item>
    <el-form-item label="证件号码" prop="idNumber">
      <el-input v-model="form.idNumber"/>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio v-model="form.gender" label="1">男</el-radio>
      <el-radio v-model="form.gender" label="0">女</el-radio>
    </el-form-item>
    <el-form-item label="生日" prop="birthday">
      <el-date-picker v-model="form.birthday" :picker-options="(time) => { return time.getTime() > Date.now() }" align="right" type="date"/>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="form.phone"/>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email"/>
    </el-form-item>
    <el-form-item label="住址" prop="address">
      <el-input v-model="form.address"/>
    </el-form-item>
    <el-form-item label="标签" prop="tag" placeholder="支持英文逗号隔开">
      <el-input v-model="form.tag"/>
    </el-form-item>
    <el-form-item label="用户备注" prop="remark">
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
import { addUser, editUser } from '@/api/system-management/user'

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
      editRules: editRules
    }
  },
  activated() {
    if (this.optionType === 'edit') {
      deepMerge(this.form, this.detail)
    } else {
      this.initForm(this.form)
    }
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
  },
  methods: {
    initForm(form = {}) {
      return deepMerge(form, {
        id: null,
        state: 1,
        index: '',
        loginName: '',
        password: '',
        name: '',
        nickName: '',
        avatar: '',
        idNumber: '',
        gender: '',
        birthday: '',
        phone: '',
        email: '',
        address: '',
        tag: '',
        remark: ''
      })
    },
    initRules() {
      return {
        state: [{
          required: true, message: '请选择用户启用状态', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        loginName: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入用户姓名', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }],
        nickName: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        gender: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }],
        email: [{
          required: true, message: '请输入用户编号', trigger: 'blur'
        }]
      }
    },
    customSubmitHandler() {
      if (this.optionType === 'edit') {
        editUser(this.form).then(this.submitSuccessHandler)
      } else if (this.optionType === 'add') {
        addUser(this.form).then(this.submitSuccessHandler)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
