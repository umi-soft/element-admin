<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed')">返回</el-button>
    <el-collapse value="base-info" accordion>
      <el-collapse-item title="基本信息" name="base-info">
        <el-form :model="detail" :label-width="labelWidth">
          <input-item-view label="ID">{{ detail.id }}</input-item-view>
          <input-item-view label="分组编号">{{ detail.sortNum }}</input-item-view>
          <input-item-view label="分组名称">{{ detail.name }}</input-item-view>
          <text-item-view label="分组备注">{{ detail.remark }}</text-item-view>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
      <el-collapse-item :title="getGroupName()" name="group">
        <el-table :data="groups" border style="width: 100%">
          <el-table-column type="index" width="100" align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="name" label="名称"/>
          <el-table-column :show-overflow-tooltip="true" prop="remark" label="备注"/>
          <el-table-column prop="createdDate" label="创建时间" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
          </el-table-column>
          <el-table-column prop="modifiedDate" label="最后修改时间" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.modifiedDate | parseTime }}</template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="用户信息" name="group-user">
        <el-table :data="users" border style="width: 100%">
          <el-table-column type="index" width="100" align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="loginName" label="登录ID" sortable align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名" sortable align="center"/>
          <el-table-column prop="gender" label="性别" width="100" sortable align="center">
            <template slot-scope="scope">{{ scope.row.gender | translateDictionary( dictionaries.gender ) }}</template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱" sortable align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="phone" label="电话" width="160" sortable align="center"/>
        </el-table>
      </el-collapse-item>
      <el-collapse-item v-if="isRoleGroup" title="角色信息" name="group-role">
        <el-table :data="roles" border style="width: 100%">
          <el-table-column type="index" width="100" align="center"/>
          <el-table-column prop="sortNum" label="角色编号" width="100" sortable align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="name" label="角色名称" sortable align="center"/>
          <el-table-column :show-overflow-tooltip="true" prop="remark" label="角色备注" sortable align="center"/>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins],
  data() {
    return {
      labelWidth: '200px',
      users: [],
      roles: [],
      groups: []
    }
  },
  activated() {
    this.queryAllUsers() // 查询分组下的用户
    this.queryAllGroups() // 查询分组关联的分组
    if (this.isRoleGroup) {
      this.queryAllRoles()
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-button {
    margin-bottom: 10px;
  }
</style>
