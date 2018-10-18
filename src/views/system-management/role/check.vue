<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed')">返回</el-button>
    <el-collapse value="base-info" accordion>
      <el-collapse-item title="基本信息" name="base-info">
        <el-form :model="detail" :label-width="labelWidth">
          <input-item-view label="ID">{{ detail.id }}</input-item-view>
          <input-item-view label="启用状态">{{ detail.state | translateState }}</input-item-view>
          <input-item-view label="角色编号">{{ detail.index }}</input-item-view>
          <input-item-view label="角色名称">{{ detail.name }}</input-item-view>
          <text-item-view label="角色备注">{{ detail.remark }}</text-item-view>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
      <el-collapse-item title="角色菜单信息" name="role-menu">
        <el-tree :data="[{}]">
          <div slot-scope="{ data }" class="custom-tree-node">
            <div class="name">名称</div>
            <div class="remark">备注</div>
            <div class="icon">图标</div>
          </div>
        </el-tree>
        <el-tree ref="menusTree" :data="menusTree" :filter-node-method="filterNodeHandler" class="filter-tree" node-key="id" show-checkbox accordion>
          <div slot-scope="{ data }" class="custom-tree-node">
            <div class="name">
              {{ data.name }}
            </div>
            <div class="remark">
              {{ data.remark }}
            </div>
            <div class="icon">
              <svg-icon :icon-class="data.icon"/>
            </div>
          </div>
        </el-tree>
      </el-collapse-item>
      <el-collapse-item title="角色用户" name="role-user">
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
      labelWidth: '200px',
      users: [],
      menusTree: []
    }
  },
  activated() {
    this.queryAllUsers()
    this.initMenus()
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .el-button {
    margin-bottom: 10px;
  }

  /deep/ .el-tree {
    border-bottom: 1px solid #ebeef5;

    .el-tree-node__content {
      border-top: 1px solid #ebeef5;
      border-left: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      min-height: 40px;
    }
  }

  .custom-tree-node {
    width: 100%;

    .name {
      float: left;
      min-height: 40px;
      line-height: 40px;
    }

    .remark {
      float: right;
      width: 300px;
      min-height: 40px;
      line-height: 40px;
      border-left: 1px solid #ebeef5;
      text-align: center;
    }

    .icon {
      float: right;
      width: 100px;
      min-height: 40px;
      line-height: 40px;
      border-left: 1px solid #ebeef5;
      text-align: center;
    }
  }
</style>
