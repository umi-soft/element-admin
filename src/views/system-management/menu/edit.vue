<template>
  <div>
    <el-button icon="el-icon-back" round @click="backHandler">返回</el-button>
    <el-card>
      <template slot="header">
        <select-right>
          <template slot="left">资源权限信息</template>
          <el-select v-model="securityId" placeholder="添加角色" clearable filterable @change="addSecirityHandler">
            <el-option v-for="(item, index) in allSecurities" :key="index" :label="item.name" :value="item.id"/>
          </el-select>
        </select-right>
      </template>
      <el-table :data="securities" border style="width: 100%">
        <el-table-column type="index" width="100" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="securityDef" label="定义" sortable/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="名称" sortable/>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="warning" @click="delSecirityHandler(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card header="角色信息">
      <el-table :data="roles" border style="width: 100%">
        <el-table-column type="index" width="100" align="center"/>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="角色名称"/>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="warning" @click="delMenuRoleHandler(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BaseEditForm from '@/views/common/mixins/BaseEditForm'
import * as MenuRoleAPI from '@/api/system-management/menuRole'
import * as SecurityAPI from '@/api/system-management/security'
import * as MenuSecurityAPI from '@/api/system-management/menuSecurity'
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
    return {
      labelWidth: '200px',
      securityId: null,
      allSecurities: []
    }
  },
  activated() {
    this.queryMenuSecurities()
    this.queryMenuRoles()
    SecurityAPI.queryAll([]).then(data => { this.allSecurities = data }) // 系统已有的所有资源权限信息
  },
  methods: {
    addSecirityHandler() {
      if (!this.securityId) return
      const params = {
        menuId: this.detail.id,
        securityId: this.securityId
      }
      MenuSecurityAPI.add(params).then(() => {
        this.securityId = null
        this.queryMenuSecurities()
        this.optionSuccessHandler()
      })
    },
    delSecirityHandler(id) {
      const params = {
        menuId: this.detail.id,
        securityId: id
      }
      MenuSecurityAPI.delByEntityMapping(params).then(() => {
        this.queryMenuSecurities()
        this.optionSuccessHandler()
      })
    },
    delMenuRoleHandler(id) {
      const params = {
        menuId: this.detail.id,
        roleId: id
      }
      MenuRoleAPI.delByEntityMapping(params).then(() => {
        this.queryMenuRoles()
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
