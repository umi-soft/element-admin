<template>
  <div>
    <el-button icon="el-icon-back" round @click="backHandler">返回</el-button>
    <el-card>
      <div slot="header">
        <button-right>
          菜单信息
          <template slot="button">
            <el-button type="primary" @click="submitHandler('form')">保存</el-button>
          </template>
        </button-right>
      </div>
      <el-form ref="form" :model="form" :rules="rules" :label-width="labelWidth">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" disabled/>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="菜单编号" prop="index">
          <el-input v-model="form.index"/>
        </el-form-item>
        <el-form-item label="菜单备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <button-right>
          URL信息
          <template slot="button">
            <el-button v-if="!addUrl.show" type="primary" @click="() => { addUrl.show = true; addUrl.url = null; }">添加</el-button>
          </template>
        </button-right>
      </div>
      <el-row>
        <el-col v-if="addUrl.show" :span="24">
          <el-form ref="addUrl" :model="addUrl" :label-width="labelWidth">
            <el-form-item :rules="[{ required: true, message: '请输入系统中正在使用的URL', trigger: ['blur', 'change'] }]" label="URL" prop="url">
              <el-input v-model="addUrl.url" clearable/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addMenuUrlHandler">保存</el-button>
              <el-button type="info" @click="addUrl.show = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col v-else :span="24">
          <el-table :data="menuUrls" border style="width: 100%">
            <el-table-column prop="url" label="URL"/>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button type="warning" @click="delMenuUrlHandler(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <el-card header="角色信息">
      <el-table :data="roles" border style="width: 100%">
        <el-table-column prop="name" label="角色名称"/>
        <el-table-column prop="createdDate" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createdDate | parseTime }}</template>
        </el-table-column>
        <el-table-column prop="modifiedDate" label="最后修改时间">
          <template slot-scope="scope">{{ scope.row.modifiedDate | parseTime }}</template>
        </el-table-column>
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
import { deepMerge } from '@/utils'
import * as menuAPI from '@/api/system-management/menu'
import mixins from './mixins'

export default {
  mixins: [BaseEditForm, mixins],
  props: {
    optionType: {
      required: true,
      type: String
    },
    detail: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  data() {
    const form = this.initForm()
    const rules = this.initRules()
    return {
      labelWidth: '200px',
      form: form,
      rules: rules,

      addUrl: {
        show: false,
        url: null
      }
    }
  },
  activated() {
    deepMerge(this.form, this.detail)
    this.$nextTick(() => {
      this.$refs['form'].clearValidate()
    })
    this.queryMenuUrls()
    this.queryMenuRoles()
  },
  methods: {
    initForm(form = {}) {
      return deepMerge(form, {
        id: null,
        index: '',
        name: '',
        remark: ''
      })
    },
    initRules() {
      return {
        id: [{
          required: true, message: '编辑信息时ID不能为空', trigger: 'change'
        }],
        index: [{
          required: true, message: '请输入菜单编号', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入菜单名称', trigger: 'blur'
        }, {
          min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'
        }]
      }
    },
    customSubmitHandler() {
      menuAPI.editMenu(this.form).then(this.submitSuccessHandler)
    },
    customSubmitSuccessHandler() {
      // 便于继续编辑url,此处不返回
      this.$refs['form'].clearValidate()
    },
    addMenuUrlHandler() {
      this.$refs.addUrl.validate((valid) => {
        if (valid) {
          const params = {
            menuId: this.detail.id,
            url: this.addUrl.url
          }
          menuAPI.addMenuUrl(params).then(data => {
            this.queryMenuUrls()
            this.addUrl.show = false
          })
        }
      })
    },
    delMenuUrlHandler(menuUrl) {
      menuAPI.delMenuUrl(menuUrl).then(data => {
        this.queryMenuUrls()
      })
    },
    delMenuRoleHandler(id) {
      const params = {
        menuId: this.detail.id,
        roleId: id
      }
      menuAPI.delMenuRole(params).then(data => {
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
