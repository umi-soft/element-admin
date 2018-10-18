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
      <el-collapse-item title="菜单URL信息" name="menu-url">
        <el-col :span="24">
          <el-table :data="menuUrls" border style="width: 100%">
            <el-table-column prop="url" label="URL"/>
          </el-table>
        </el-col>
      </el-collapse-item>
      <el-collapse-item title="菜单角色信息" name="menu-role">
        <el-table :data="roles" border style="width: 100%">
          <el-table-column prop="name" label="角色名称"/>
          <el-table-column prop="createdDate" label="创建时间">
            <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
          </el-table-column>
          <el-table-column prop="modifiedDate" label="最后修改时间">
            <template slot-scope="scope">{{ scope.row.modifiedDate | parseTime }}</template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import * as menuAPI from '@/api/system-management/menu'
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
    this.queryMenuUrls()
    this.queryMenuRoles()
  },
  methods: {
    queryMenuUrls() {
      this.menuUrls = []
      const params = { id: this.detail.id }
      menuAPI.queryAllMenuUrl(params).then(menuUrls => { this.menuUrls = menuUrls })
    },
    queryMenuRoles() {
      this.roles = []
      const params = { id: this.detail.id }
      menuAPI.queryAllMenuRole(params).then(roles => { this.roles = roles })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-button {
    margin-bottom: 10px;
  }
</style>
