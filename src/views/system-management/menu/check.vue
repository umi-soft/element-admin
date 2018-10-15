<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed')">返回</el-button>
    <el-collapse value="base-info" accordion>
      <el-collapse-item title="基本信息" name="base-info">
        <el-form>
          <input-item-view label="ID">{{ detail.id }}</input-item-view>
          <input-item-view v-if="detail.parentId" label="上级菜单">{{ detail.parentId }}</input-item-view>
          <input-item-view label="菜单编号">{{ detail.index }}</input-item-view>
          <input-item-view label="菜单名称">{{ detail.name }}</input-item-view>
          <input-item-view label="菜单图标名称">{{ detail.icon }}</input-item-view>
          <text-item-view label="菜单备注">{{ detail.remark }}</text-item-view>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
      <el-collapse-item title="菜单角色信息" name="menu-role">
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
