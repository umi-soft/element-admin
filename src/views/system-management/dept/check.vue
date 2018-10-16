<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed')">返回</el-button>
    <el-collapse value="base-info" accordion>
      <el-collapse-item title="基本信息" name="base-info">
        <el-form :model="detail" :label-width="labelWidth">
          <input-item-view label="ID">{{ detail.id }}</input-item-view>
          <input-item-view label="上级部门ID">{{ detail.parentId }}</input-item-view>
          <input-item-view label="启用状态">{{ detail.state | translateState }}</input-item-view>
          <input-item-view label="部门编号">{{ detail.index }}</input-item-view>
          <input-item-view label="部门类型">{{ detail.type }}</input-item-view>
          <input-item-view label="部门名称">{{ detail.name }}</input-item-view>
          <text-item-view label="部门备注">{{ detail.remark }}</text-item-view>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
      <el-collapse-item title="部门用户信息" name="dept-user">
        等着吧，组件没想好怎么抽象
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
