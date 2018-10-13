<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed')">返回</el-button>
    <el-collapse value="base-info" accordion>
      <el-collapse-item title="基本信息" name="base-info">
        <el-form :model="detail" :label-width="labelWidth">
          <el-form-item label="ID">
            <el-input :value="detail.id" disabled/>
          </el-form-item>
          <el-form-item label="上级ID">
            <el-input :value="detail.parentId" disabled/>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-input :value="detail.state | translateState" disabled/>
          </el-form-item>
          <el-form-item label="字典类型ID">
            <el-input :value="detail.type" disabled/>
          </el-form-item>
          <el-form-item label="字典名称">
            <el-input :value="detail.name" disabled/>
          </el-form-item>
          <el-form-item label="字典规则码">
            <el-input :value="detail.code" disabled/>
          </el-form-item>
          <el-form-item label="字典编号">
            <el-input :value="detail.index" disabled/>
          </el-form-item>
          <el-form-item label="字典备注">
            <el-input :value="detail.remark" type="textarea" disabled/>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

export default {
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
