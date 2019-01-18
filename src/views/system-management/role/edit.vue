<template>
  <div>
    <el-button icon="el-icon-back" round @click="backHandler">返回</el-button>
    <el-card>
      <div slot="header">
        <button-right>
          角色信息
          <template slot="button">
            <el-button type="primary" @click="submitHandler('form')">保存</el-button>
          </template>
        </button-right>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" disabled/>
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="角色编号" prop="index">
          <el-input v-model="form.index"/>
        </el-form-item>
        <el-form-item label="角色备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <button-right>
          可操作菜单信息
          <template slot="button">
            <el-button type="primary" @click="resetRoleMenus">保存</el-button>
          </template>
        </button-right>
      </div>
      <el-row>
        <el-col :span="24">
          <el-input v-model="menuFilter" placeholder="输入关键字进行过滤"/>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;">
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
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <template slot="header">
        <select-right>
          <template slot="left">角色分组信息</template>
          <el-select v-model="roleGroupId" placeholder="添加分组" clearable filterable @change="addGroupHandler">
            <el-option v-for="(item, index) in allRoleGroups" :key="index" :label="item.name" :value="item.id"/>
          </el-select>
        </select-right>
      </template>
      <el-table :data="groups" border style="width: 100%">
        <el-table-column type="index" width="100" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" sortable/>
        <el-table-column :show-overflow-tooltip="true" prop="remark" label="备注" sortable/>
        <el-table-column prop="createdDate" label="创建时间" width="180" align="center" sortable>
          <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
        </el-table-column>
        <el-table-column prop="modifiedDate" label="最后修改时间" width="180" align="center" sortable>
          <template slot-scope="scope">{{ scope.row.modifiedDate | parseTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="warning" @click="delGroupHandler(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card header="用户信息">
      <el-table :data="users" border style="width: 100%">
        <el-table-column type="index" width="100" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="loginName" label="登录ID" sortable align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名" sortable align="center"/>
        <el-table-column prop="gender" label="性别" width="100" sortable align="center">
          <template slot-scope="scope">{{ scope.row.gender | translateGender }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱" sortable align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="phone" label="电话" width="160" sortable align="center"/>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="warning" @click="delUserRoleHandler(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BaseEditForm from '@/views/common/mixins/BaseEditForm'
import { deepMergeLeft } from '@/utils'
import * as RoleGroupAPI from '@/api/system-management/roleGroup'
import * as RoleAPI from '@/api/system-management/role'
import * as MenuRoleAPI from '@/api/system-management/menuRole'
import * as UserRoleAPI from '@/api/system-management/userRole'
import * as GroupAPI from '@/api/system-management/group'
import mixins from './mixins'

export default {
  mixins: [BaseEditForm, mixins],
  props: {
    detail: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  data() {
    const form = this.initForm()
    const rules = this.initRules()
    rules.id = [{
      required: true, message: '编辑信息时ID不能为空', trigger: 'change'
    }]
    return {
      form: form,
      rules: rules,
      menusTree: [],
      menuFilter: null,
      allRoleGroups: [],
      users: [],
      groups: [],
      roleGroupId: null
    }
  },
  watch: {
    menuFilter(filter) {
      this.$refs.menusTree.filter(filter)
    }
  },
  activated() {
    RoleAPI.queryRoleById(this.detail.id).then((data) => {
      deepMergeLeft(this.form, data)
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    })
    this.initMenus()
    this.queryAllUsers()
    this.queryAllGroups() // 该角色已有的角色组信息
    GroupAPI.queryAllGroups({ filters: [{ field: 'category', value: 2 }], sorts: [] }).then(data => {
      this.allRoleGroups = data
    }) // 系统已有的所有角色组信息
  },
  methods: {
    customSubmitHandler() {
      RoleAPI.editRole(this.form).then(this.submitSuccessHandler)
    },
    customSubmitSuccessHandler() {
      this.$refs['form'].clearValidate()
    },
    resetRoleMenus() {
      const params = {
        roleId: this.detail.id,
        menuIds: this.$refs['menusTree'].getCheckedKeys()
      }
      MenuRoleAPI.reset(params).then(this.optionSuccessHandler)
    },
    delUserRoleHandler(id) {
      const params = {
        userId: id,
        roleId: this.detail.id
      }
      UserRoleAPI.delByEntityMapping(params).then(data => {
        this.queryAllUsers()
        this.optionSuccessHandler()
      })
    },
    addGroupHandler() {
      if (!this.roleGroupId) return // 防止取消选择时触发
      const params = { roleId: this.detail.id, roleGroupId: this.roleGroupId }

      RoleGroupAPI.add(params).then(data => {
        this.queryAllGroups()
        this.optionSuccessHandler()
      })
    },
    delGroupHandler(id) {
      const params = { roleId: this.detail.id, roleGroupId: id }
      RoleGroupAPI.delByEntityMapping(params).then(data => {
        this.queryAllGroups()
        this.optionSuccessHandler()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-card {
    margin-top: 10px;
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
