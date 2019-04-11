<template>
  <div>
    <el-button icon="el-icon-back" round @click="backHandler">返回</el-button>
    <el-card>
      <div slot="header">
        <button-right>
          基础信息
          <template slot="button">
            <el-button type="primary" @click="submitHandler('form')">保存</el-button>
          </template>
        </button-right>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" disabled/>
        </el-form-item>
        <el-form-item label="分组名称" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="分组编号" prop="sortNum">
          <el-input v-model="form.sortNum"/>
        </el-form-item>
        <el-form-item label="分组备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <template slot="header">
        <select-right>
          <template slot="left">{{ getGroupName() }}</template>
          <el-select v-model="groupId" placeholder="添加分组" clearable filterable @change="addGroupHandler">
            <el-option v-for="(item, index) in allGroups" :key="index" :label="item.name" :value="item.id"/>
          </el-select>
        </select-right>
      </template>
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
          <template slot-scope="scope">{{ scope.row.gender | translateDictionary( dictionaries.gender ) }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱" sortable align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="phone" label="电话" width="160" sortable align="center"/>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="warning" @click="delUserHandler(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card v-if="isRoleGroup" header="角色信息">
      <el-table :data="roles" border style="width: 100%">
        <el-table-column type="index" width="100" align="center"/>
        <el-table-column prop="sortNum" label="角色编号" width="100" sortable align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="角色名称" sortable align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="remark" label="角色备注" sortable align="center"/>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="warning" @click="delGroupRoleHandler(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BaseEditForm from '@/views/common/mixins/BaseEditForm'
import { deepMergeLeft } from '@/utils'
import * as GroupAPI from '@/api/system-management/group'
import * as UserGroupAPI from '@/api/system-management/userGroup'
import * as UserRoleGroupAPI from '@/api/system-management/userRoleGroup'
import * as UserGroupRoleGroupAPI from '@/api/system-management/userGroupRoleGroup'
import * as RoleGroupAPI from '@/api/system-management/roleGroup'
import mixins from './mixins'

export default {
  mixins: [BaseEditForm, mixins],
  data() {
    const form = this.initForm()
    const rules = this.initRules()
    rules.id = [{
      required: true, message: '编辑信息时ID不能为空', trigger: 'change'
    }]
    return {
      form: form,
      rules: rules,
      users: [],
      roles: [],
      groups: [],
      groupId: null,
      allGroups: []
    }
  },
  activated() {
    GroupAPI.queryGroupById(this.detail.id).then((data) => {
      deepMergeLeft(this.form, data)
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    })
    this.queryAllUsers()
    this.queryAllGroups()
    if (this.isRoleGroup) {
      this.queryAllRoles()
    }
    if (this.isUserGroup) {
      GroupAPI.queryAllGroups([{ field: 'category', value: 1 }]).then(data => {
        this.allGroups = data
      }) // 系统已有的所有用户组
    }
    if (this.isRoleGroup) {
      GroupAPI.queryAllGroups([{ field: 'category', value: 2 }]).then(data => {
        this.allGroups = data
      }) // 系统已有的所有角色组
    }
  },
  methods: {
    customSubmitHandler() {
      GroupAPI.editGroup(this.form).then(this.submitSuccessHandler)
    },
    customSubmitSuccessHandler() {
      this.$refs['form'].clearValidate()
    },
    delUserHandler(id) {
      const params = { userId: id }
      let delByEntityMapping = null
      if (this.isUserGroup) {
        params.groupId = this.detail.id
        delByEntityMapping = UserGroupAPI.delByEntityMapping // 用户分组下的用户
      }
      if (this.isRoleGroup) {
        params.roleGroupId = this.detail.id
        delByEntityMapping = UserRoleGroupAPI.delByEntityMapping // 角色分组下的用户
      }
      delByEntityMapping(params).then(() => {
        this.optionSuccessHandler()
        this.queryAllUsers()
      })
    },
    delGroupRoleHandler(id) {
      const params = {
        roleId: id,
        groupId: this.detail.id
      }
      RoleGroupAPI.delByEntityMapping(params).then(() => {
        this.optionSuccessHandler()
        this.queryAllRoles()
      })
    },
    addGroupHandler() {
      if (!this.groupId) return // 防止取消选择时触发
      let params = null
      if (this.isUserGroup) {
        params = {
          userGroupId: this.detail.id,
          roleGroupId: this.groupId
        }
      }
      if (this.isRoleGroup) {
        params = {
          roleGroupId: this.detail.id,
          userGroupId: this.groupId
        }
      }
      UserGroupRoleGroupAPI.add(params).then(() => {
        this.queryAllGroups()
        this.optionSuccessHandler()
      })
    },
    delGroupHandler(id) {
      let params = null
      if (this.isUserGroup) {
        params = {
          userGroupId: this.detail.id,
          roleGroupId: id
        }
      }
      if (this.isRoleGroup) {
        params = {
          roleGroupId: this.detail.id,
          userGroupId: id
        }
      }
      UserGroupRoleGroupAPI.delByEntityMapping(params).then(() => {
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
</style>
