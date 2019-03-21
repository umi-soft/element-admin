<template>
  <el-row>
    <el-card>
      <el-col :span="20">
        <el-form
          :model="queryCriteria"
          :inline="true">
          <el-form-item label="字典分类:" prop="type">
            <el-select v-model="queryCriteria.type" filterable clearable placeholder="全部">
              <el-option v-for="(item, index) in dictionaryTypeList" :key="index" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="字典名称:" prop="name">
            <el-input v-model="queryCriteria.name" placeholder="请输入字典名称"/>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" class="query-btn">
        <el-button round type="info" @click="resetHandler">重置</el-button>
        <el-button round type="primary" @click="queryHandler">查询</el-button>
      </el-col>
    </el-card>
    <el-col :span="24" style="margin: 10px 0px;">
      <button-right>
        字典列表
        <template slot="button">
          <el-button-group>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','check', selected)">查看</el-button>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','add', selected)">新增下级</el-button>
            <el-button type="primary" @click="$emit('option-changed','add')">新增</el-button>
            <el-button v-if="selected" type="primary" @click="$emit('option-changed','edit', selected)">编辑</el-button>
            <el-button v-if="selected" type="primary" @click="delHandler">删除</el-button>
          </el-button-group>
        </template>
      </button-right>
    </el-col>
    <el-col :span="24">
      <el-card>
        <el-input v-model="filter" placeholder="输入关键字对已加载的数据进行过滤"/>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-tree :data="[{}]" :props="defaultProps">
        <div class="custom-tree-node">
          <div class="name">字典名称</div>
          <div class="type">字典分类</div>
        </div>
      </el-tree>
      <!-- eslint-disable-next-line vue/max-attributes-per-line -->
      <el-tree ref="tree" :data="pagination.list" :load="loadChildren" :props="defaultProps" node-key="id" :filter-node-method="filterNodeHandler" class="filter-tree" highlight-current accordion lazy @current-change="(value, node) => selected = value">
        <div slot-scope="{ data }" class="custom-tree-node">
          <div class="name">{{ data.name }}</div>
          <div class="type">{{ getDictionaryTypeName(data.type) }}</div>
        </div>
      </el-tree>
      <pagination :pagination="pagination" @page-size-changed="pageSizeChangeHandler" @page-changed="pageChangeHandler"/>
    </el-col>
  </el-row>
</template>

<script>
import { deepMerge } from '@/utils'
import BaseQueryPageForm from '@/views/common/mixins/BaseQueryPageForm'
import * as DictionaryAPI from '@/api/system-management/dictionary'
import mixins from './mixins'

export default {
  mixins: [BaseQueryPageForm, mixins],
  props: {
    detail: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  data() {
    const queryCriteria = this.initQueryCriteria()
    return {
      queryCriteria: queryCriteria,
      selected: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      filter: ''
    }
  },
  watch: {
    filter(filter) {
      this.$refs.tree.filter(filter)
    }
  },
  created() {
    this.autoRefresh = false
    this.executeQueryPage()
  },
  activated() {
    this.selected = null
    this.queryAllDictionaryType()
    // 目前的设计逻辑为，新增之后，立即跳转至编辑，可由编辑页面返回至查询页面
    // 意味着页面跳转过程中，从查看页面返回的detail，为空对象{}
    // detail为非空对象时，可能是从新增或修改页面返回回来的，id可从当前列表中找到则为编辑，反之则为新增
    // 注意，从新增页面跳转至编辑，再返回，id也是在当前列表中找不到的
    if (this.detail.id != null) {
      let result = this.$refs.tree.getNode(this.detail.id)
      if (result !== null) { // 说明 detail 是从更新页面传递过来的
        // 页面显示的2项字段将被更新, type无需更新，修改时不允许修改
        result.data.name = this.detail.name
        this.$refs.tree.filter(this.filter)
      } else if(this.detail.parentId && this.detail.parentId !== 'root') { // 新增操作获取的, 子节点
        this.$refs.tree.append(this.detail, this.detail.parentId)
        this.$refs.tree.filter(this.filter)
      } else { // 新增操作获取的,根节点
        this.executeQueryPage()
      }
    }
  },
  methods: {
    initQueryCriteria(form = {}) {
      return deepMerge(form, {
        category: '3',
        parentId: 'root',
        type: '',
        name: ''
      })
    },
    executeQueryPage() {
      DictionaryAPI.queryPageDictionaries(this.createQueryParams()).then(data => {
        this.queryResultHandler(data)
        this.$refs.tree.filter(this.filter)
      })
    },
    customDelHandler() {
      DictionaryAPI.delDictionary(this.selected.id).then(() => {
        this.queryHandler()
      })
    },
    loadChildren(node, resolve) {
      if (!node.data.id) return
      DictionaryAPI.queryAllDictionaries([{ field: 'category', value: 3 }, { field: 'parentId', value: node.data.id }]).then(data => {
        resolve(data)
      })
    },
    filterNodeHandler(value, data) {
      if (!value) return true
      const show = data.name.indexOf(value) !== -1
      if (!show && this.selected && this.selected.id === data.id) {
        this.selected = null
      }
      return show
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

    .type {
      float: right;
      width: 400px;
      min-height: 40px;
      line-height: 40px;
      border-left: 1px solid #ebeef5;
      text-align: center;
    }

    .name {
      float: left;
      min-height: 40px;
      line-height: 40px;
    }

  }
</style>
