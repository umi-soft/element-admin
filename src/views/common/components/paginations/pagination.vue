<template>
  <el-pagination
    :current-page="pagination.page"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    :page-sizes="pageSizes"
    :pager-count="pagerCount"
    :layout="layout"
    @size-change="pageSizeChangeHandler"
    @current-change="pageChangeHandler"/>
</template>

<script>
export default {
  props: {
    pagination: {
      required: true,
      type: Object
    },
    pageSizes: {
      required: false,
      type: Array,
      default: () => [10, 30, 50, 100, 200]
    },
    pagerCount: {
      required: false,
      type: Number,
      default: 5
    },
    layout: {
      required: false,
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    pageSizeChangeHandler(pageSize) {
      this.$emit('page-size-changed', pageSize)
    },
    pageChangeHandler(page) {
      this.$emit('page-changed', page)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-pagination {
    padding-top: 10px;
  }
</style>
