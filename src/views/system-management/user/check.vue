<template>
  <div>
    <el-button icon="el-icon-back" round @click="$emit('option-changed')">返回</el-button>
    <el-collapse value="base-info" accordion>
      <el-collapse-item title="基本信息" name="base-info">
        <el-form :model="detail" :label-width="labelWidth">
          <input-item-view label="ID">{{ detail.id }}</input-item-view>
          <input-item-view label="启用状态">{{ detail.state | translateState }}</input-item-view>
          <input-item-view label="用户编号">{{ detail.index }}</input-item-view>
          <input-item-view label="登录ID">{{ detail.loginName }}</input-item-view>
          <input-item-view label="用户姓名">{{ detail.name }}</input-item-view>
          <input-item-view label="昵称">{{ detail.nickName }}</input-item-view>
          <input-item-view label="证件号码">{{ detail.idNumber }}</input-item-view>
          <input-item-view label="性别">{{ detail.gender }}</input-item-view>
          <input-item-view label="生日">{{ detail.birthday }}</input-item-view>
          <input-item-view label="电话">{{ detail.phone }}</input-item-view>
          <input-item-view label="邮箱">{{ detail.email }}</input-item-view>
          <input-item-view label="住址">{{ detail.address }}</input-item-view>
          <input-item-view label="标签">{{ detail.tag }}</input-item-view>
          <text-item-view label="用户备注">{{ detail.remark }}</text-item-view>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="肖像" name="user-photo">
        <el-card :body-style="{textAlign: 'center'}">
          <img :src="detail.avatar ? detail.avatar : 'http://element.eleme.io/static/hamburger.50e4091.png'" class="photo">
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="审计信息" name="audit-info">
        <audit-info :detail="detail" :label-width="labelWidth"/>
      </el-collapse-item>
      <el-collapse-item title="用户分组" name="user-group">
        <el-table :data="groups" border style="width: 100%">
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
      <el-collapse-item title="用户部门" name="user-dept">
        <el-table :data="depts" border style="width: 100%">
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
      <el-collapse-item title="用户角色" name="user-role">
        <el-table :data="roles" border style="width: 100%">
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
      depts: [],
      groups: [],
      roles: []
    }
  },
  activated() {
    this.queryAllUserDepts()
    this.queryAllUserGroups()
    this.queryAllUserRoles()
  }
}
</script>

<style lang="scss" scoped>
  .el-button {
    margin-bottom: 10px;
  }

  .photo {
    margin: 0 auto;
    width: 178px;
    height: 178px;
  }
</style>
