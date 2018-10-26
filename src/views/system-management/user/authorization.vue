<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed','query')">返回</el-button>
    <el-card>
      <template slot="header">
        <button-right>
          角色信息
          <template slot="button">
            <el-button type="primary" @click="submitUserRoleHandler()" >授权</el-button>
          </template>
        </button-right>
      </template>
      <el-table :data="roles" border style="width: 100%" @selection-change="clickRoleCheckboxHandler" >
        <el-table-column type="selection" label="全选" />
        <el-table-column :show-overflow-tooltip="true" prop="name" label="名称"/>
        <el-table-column :show-overflow-tooltip="true" prop="remark" label="备注"/>
        <el-table-column prop="createdDate" label="创建时间" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
        </el-table-column>
        <el-table-column prop="modifiedDate" label="最后修改时间" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.modifiedDate | parseTime }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import * as UserAPI from '@/api/system-management/user'
import * as RoleAPI from '@/api/system-management/role'
import mixins from './mixins'

export default {
  mixins: [mixins],
  props: {
    detail: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      roles: [],
      selectedRoles: []
    }
  },
  activated() {
    const params = {
      filters: [],
      sorts: []
    }
    RoleAPI.queryAllRoles(params).then(data => {
      this.roles = data
    })
  },
  methods: {
    clickRoleCheckboxHandler(selection) {
      this.selectedRoles = selection
    },
    submitUserRoleHandler() {
      if (this.selectedRoles.length === 0) {
        this.$message({
          type: 'error',
          message: '您未勾选任何角色'
        })
        return
      }
      this.$confirm('此操作将批量授权, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已授权成功'
        })
        const userRoles = []
        this.detail.forEach(user => {
          this.selectedRoles.forEach(role => {
            userRoles.push({
              userId: user.id,
              roleId: role.id
            })
          })
        })
        UserAPI.addUserRole(userRoles)
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消授权'
        })
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  /deep/ .el-card {
    border: none;
  }
  .query-btn /deep/ .el-button {
    float: right;
    margin-left: 10px;
  }
</style>
