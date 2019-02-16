<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed')">返回</el-button>
    <el-collapse value="base-info" accordion>
      <el-collapse-item title="基本信息" name="base-info">
        <el-form>
          <input-item-view label="ID">{{ detail.id }}</input-item-view>
          <input-item-view v-if="parentMenuName" label="上级菜单">{{ parentMenuName }}</input-item-view>
          <input-item-view label="菜单编号">{{ detail.sortNum }}</input-item-view>
          <input-item-view label="菜单名称">{{ detail.name }}</input-item-view>
          <input-item-view label="菜单图标名称">{{ detail.icon }}</input-item-view>
          <text-item-view label="菜单备注">{{ detail.remark }}</text-item-view>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
      <el-collapse-item title="菜单资源权限信息" name="menu-security">
        <el-col :span="24">
          <el-table :data="securities" border style="width: 100%">
            <el-table-column type="index" width="100" align="center"/>
            <el-table-column :show-overflow-tooltip="true" prop="securityDef" label="定义" sortable/>
            <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" sortable/>
          </el-table>
        </el-col>
      </el-collapse-item>
      <el-collapse-item title="菜单角色信息" name="menu-role">
        <el-table :data="roles" border style="width: 100%">
          <el-table-column type="index" width="100" align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="name" label="角色名称"/>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins],
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
  },
  activated() {
    this.getParentMenuName(this.detail.parentId)
    this.queryMenuSecurities()
    this.queryMenuRoles()
  }
}
</script>

<style lang="scss" scoped>
  .el-button {
    margin-bottom: 10px;
  }
</style>
