<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed','query')">返回</el-button>
    <el-card>
      <template slot="header">
        <button-right>
          角色信息
          <template slot="button">
            <el-button type="primary" @click="submitUserRoleHandler()" >保存</el-button>
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
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-input v-model="filter" placeholder="输入关键字进行过滤"/>
          </el-card>
        </el-col>
      </el-row>
      <template slot="header">
        <button-right>
          部门信息
          <template slot="button">
            <el-button type="primary" @click="submitUserDeptHandler()" >保存</el-button>
          </template>
        </button-right>
      </template>
      <el-tree :data="[{}]" :props="defaultProps">
        <div slot-scope="{ data }" class="custom-tree-node">
          <div class="name">名称</div>
          <div class="time">最后修改时间</div>
          <div class="time">创建时间</div>
        </div>
      </el-tree>
      <el-tree ref="tree" :data="depts" :props="defaultProps" :filter-node-method="filterNodeHandler" class="filter-tree" highlight-current accordion show-checkbox @current-change="(value, node) => selected = value">
        <div slot-scope="{ data }" class="custom-tree-node">
          <div class="name">{{ data.name }}</div>
          <div class="time">{{ data.modifiedDate | parseTime }}</div>
          <div class="time">{{ data.createdDate | parseTime }}</div>
        </div>
      </el-tree>
    </el-card>
    <el-card>
      <template slot="header">
        <button-right>
          用户分组信息
          <template slot="button">
            <el-button type="primary" @click="submitUserGroupHandler()" >保存</el-button>
          </template>
        </button-right>
      </template>
      <el-table :data="groups" border style="width: 100%" @selection-change="clickGroupCheckboxHandler" >
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
import BaseEditForm from '@/views/common/mixins/BaseEditForm'
import * as RoleAPI from '@/api/system-management/role'
import * as DeptAPI from '@/api/system-management/dept'
import * as GroupAPI from '@/api/system-management/group'
import * as UserRoleAPI from '@/api/system-management/userRole'
import * as UserDeptAPI from '@/api/system-management/userDept'
import * as UserGroupAPI from '@/api/system-management/userGroup'
import mixins from './mixins'

export default {
  mixins: [BaseEditForm, mixins],
  props: {
    detail: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filter: null,
      roles: [],
      selectedRoles: [],
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      groups: [],
      selectedGroups: []
    }
  },
  watch: {
    filter(filter) {
      this.$refs.tree.filter(filter)
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
    DeptAPI.queryAllTreeDepts({}).then(data => {
      this.depts = data
    })
    GroupAPI.queryAllGroups(params).then(data => {
      this.groups = data
    })
  },
  methods: {
    clickRoleCheckboxHandler(selection) {
      this.selectedRoles = selection
    },
    clickGroupCheckboxHandler(selection) {
      this.selectedGroups = selection
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
        const userRoles = []
        this.detail.forEach(user => {
          this.selectedRoles.forEach(role => {
            userRoles.push({
              userId: user.id,
              roleId: role.id
            })
          })
        })
        UserRoleAPI.reset(userRoles).then(data => {
          this.optionSuccessHandler()
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消授权'
        })
      })
    },
    submitUserDeptHandler() {
      const selectedDepts = this.$refs.tree.getCheckedNodes()
      if (selectedDepts.length === 0) {
        this.$message({
          type: 'error',
          message: '您未勾选任何部门'
        })
        return
      }
      this.$confirm('此操作将批量授权, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const userDepts = []
        this.detail.forEach(user => {
          selectedDepts.forEach(dept => {
            userDepts.push({
              userId: user.id,
              deptId: dept.id
            })
          })
        })
        UserDeptAPI.reset(userDepts).then(data => {
          this.optionSuccessHandler()
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消授权'
        })
      })
    },
    filterNodeHandler(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    submitUserGroupHandler() {
      if (this.selectedGroups.length === 0) {
        this.$message({
          type: 'error',
          message: '您未勾选任何用户分组'
        })
        return
      }
      this.$confirm('此操作将批量授权, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const userGroups = []
        this.detail.forEach(user => {
          this.selectedGroups.forEach(group => {
            userGroups.push({
              userId: user.id,
              groupId: group.id
            })
          })
        })
        UserGroupAPI.reset(userGroups).then(data => {
          this.optionSuccessHandler()
        })
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
  .el-card {
    margin-top: 10px;
  }
  /deep/ .el-card {
    border: none;
  }
  .query-btn /deep/ .el-button {
    float: right;
    margin-left: 10px;
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

    .time {
      float: right;
      width: 200px;
      min-height: 40px;
      line-height: 40px;
      border-left: 1px solid #ebeef5;
      text-align: center;
    }

  }
</style>
