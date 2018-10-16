export default {
  methods: {
    backHandler() {
      if (this.customBackHandler) {
        this.customBackHandler()
      } else {
        this.$emit('option-changed')
      }
    },
    submitHandler() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        this.$confirm('确定要保存吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(this.executeSubmit).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      })
    },
    submitSuccessHandler() {
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.backHandler()
    }
  }
}
