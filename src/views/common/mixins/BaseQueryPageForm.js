/**
 * 适用于一个一个查询对象+一个分页结果集展示的简单组件
 * 约束：
 * 寄主对象中应具有：
 * --this.queryCriteria : 表单查询对象封装
 * --this.initQueryCriteria() : 表单查询对象初始化函数
 * --this.executeQueryPage : 分页表单查询接口
 */

import { deepMerge, deepClone } from '@/utils'

export default {
  data() {
    const pagination = this.initPagination()
    return {
      pagination: pagination
    }
  },
  activated() {
    this.executeQueryPage()
  },
  methods: {
    initPagination(pagination = {}) {
      return deepMerge(pagination, {
        total: 0,
        pageSize: 10,
        page: 1,
        list: []
      })
    },
    resetHandler() {
      this.initQueryCriteria(this.queryCriteria)
      this.initPagination(this.pagination)
      this.executeQueryPage()
    },
    queryHandler() {
      this.initPagination(this.pagination)
      this.executeQueryPage()
    },
    createQueryParams() {
      const filter = {
        filters: [],
        sorts: []
      }
      Object.keys(this.queryCriteria).forEach(key => {
        const value = this.queryCriteria[key]
        if (value) {
          if (typeof value === 'object') {
            filter.filters.push({ field: key, value: deepClone(value) })
          } else {
            filter.filters.push({ field: key, value: value })
          }
        }
      })
      return {
        pageSize: this.pagination.pageSize,
        page: this.pagination.page,
        filter: filter
      }
    },
    queryResultHandler(result) {
      return deepMerge(this.pagination, result)
    },
    pageSizeChangeHandler(pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.page = 1
      this.executeQueryPage()
    },
    pageChangeHandler(page) {
      this.pagination.page = page
      this.executeQueryPage()
    },
    delHandler() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.customDelHandler) {
          this.customDelHandler()
        } else {
          this.$message({
            type: 'info',
            message: '您未定义删除逻辑处理方法customDelHandler'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
