<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed')">返回</el-button>
    <el-collapse value="base-info" accordion>
      <el-collapse-item title="基本信息" name="base-info">
        <el-form :model="detail" :label-width="labelWidth">
          <el-form-item label="ID">
            <el-input :value="detail.id" disabled/>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-input :value="detail.state | translateState" disabled/>
          </el-form-item>
          <el-form-item label="用户编号">
            <el-input :value="detail.index" disabled/>
          </el-form-item>
          <el-form-item label="登录ID" prop="loginName">
            <el-input v-model="detail.loginName" disabled/>
          </el-form-item>
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="detail.name" disabled/>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="detail.nickName" disabled/>
          </el-form-item>
          <el-form-item label="证件号码" prop="idNumber">
            <el-input v-model="detail.idNumber" disabled/>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="detail.gender" label="1" disabled>男</el-radio>
            <el-radio v-model="detail.gender" label="0" disabled>女</el-radio>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-input v-model="detail.birthday" disabled/>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="detail.phone" disabled/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="detail.email" disabled/>
          </el-form-item>
          <el-form-item label="住址" prop="address">
            <el-input v-model="detail.address" disabled/>
          </el-form-item>
          <el-form-item label="标签" prop="tag" placeholder="支持英文逗号隔开">
            <el-input v-model="detail.tag" disabled/>
          </el-form-item>
          <el-form-item label="用户备注">
            <el-input :value="detail.remark" type="textarea" disabled/>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="肖像" name="user-photo">
        <el-card :body-style="{textAlign: 'center'}">
          <img :src="detail.avatar ? detail.avatar : 'http://element.eleme.io/static/hamburger.50e4091.png'" class="photo">
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
      <el-collapse-item title="用户部门" name="user-dept">
        等着吧，组件没想好怎么抽象
      </el-collapse-item>
      <el-collapse-item title="用户分组" name="user-group">
        等着吧，组件没想好怎么抽象
      </el-collapse-item>
      <el-collapse-item title="用户角色" name="user-role">
        等着吧，组件没想好怎么抽象
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import AuditInfo from '@/views/common/AuditInfo/index'

export default {
  components: { AuditInfo },
  props: {
    detail: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      labelWidth: '200px'
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-button {
    margin-bottom: 10px;
  }

  .photo {
    margin: 0 auto;
    width: 178px;
    height: 178px;
  }
</style>
