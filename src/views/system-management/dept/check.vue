<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed')">返回</el-button>
    <el-collapse value="base-info" accordion>
      <el-collapse-item title="基本信息" name="base-info">
        <el-form :model="detail" :label-width="labelWidth">
          <input-item-view label="ID">{{ detail.id }}</input-item-view>
          <input-item-view v-if="parentDeptName" label="上级部门">{{ parentDeptName }}</input-item-view>
          <input-item-view label="部门编号">{{ detail.sortNum }}</input-item-view>
          <input-item-view label="部门类型">{{ detail.type }}</input-item-view>
          <input-item-view label="部门名称">{{ detail.name }}</input-item-view>
          <text-item-view label="部门备注">{{ detail.remark }}</text-item-view>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
      <el-collapse-item title="部门用户信息" name="dept-user">
        <el-table :data="users" border style="width: 100%">
          <el-table-column type="index" width="100" align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="loginName" label="登录ID" sortable align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名" sortable align="center"/>
          <el-table-column prop="gender" label="性别" width="100" sortable align="center">
            <template slot-scope="scope">{{ scope.row.gender | translateGender }}</template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱" sortable align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="phone" label="电话" width="160" sortable align="center"/>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="部门角色信息" name="dept-role">
        <el-table :data="roles" border style="width: 100%">
          <el-table-column type="index" width="100" align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="name" label="名称"/>
          <el-table-column :show-overflow-tooltip="true" prop="remark" label="备注"/>
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
    this.getParentDeptName(this.detail.parentId)
    this.queryAllUsers()
    this.queryAllRoles()
  }
}
</script>

<style lang="scss" scoped>
  .el-button {
    margin-bottom: 10px;
  }
</style>
