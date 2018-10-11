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
          <el-form-item label="角色编号">
            <el-input :value="detail.index" disabled/>
          </el-form-item>
          <el-form-item label="角色名称">
            <el-input :value="detail.name" disabled/>
          </el-form-item>
          <el-form-item label="角色备注">
            <el-input :value="detail.remark" type="textarea" disabled/>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
      <el-collapse-item title="角色用户" name="role-user">
        等等吧，没心情
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
</style>
