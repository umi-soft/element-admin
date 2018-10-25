<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
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
      </el-col>
      <el-col :span="12">
        <el-form-item label="照片" prop="avatar">
          <el-upload :show-file-list="false" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
            <img v-if="form.avatar" :src="form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"/>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-for="item in dictionaries.gender" v-model="form.gender" :key="item.key" :label="item.key">{{ item.value }}</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="form.birthday" :picker-options="(time) => { return time.getTime() > Date.now() }" align="right" type="date"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="证件号码" prop="idNumber">
          <el-input v-model="form.idNumber"/>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="form.address"/>
        </el-form-item>
        <el-form-item label="标签" prop="tag" placeholder="支持英文逗号隔开">
          <el-input v-model="form.tag"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="submitHandler('form')">保存</el-button>
          <el-button @click="backHandler">取消</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import BaseEditForm from '@/views/common/mixins/BaseEditForm'
import { deepMergeLeft } from '@/utils'
import * as UserAPI from '@/api/system-management/user'
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
    deepMergeLeft(this.form, this.initForm())
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
  },
  methods: {
    customSubmitHandler() {
      UserAPI.addUser(this.form).then(data => {
        this.submitSuccessHandler(data)
      })
    },
    customSubmitSuccessHandler(data) {
      this.$emit('option-changed', 'edit', data)
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
