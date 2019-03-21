export default {
  methods: {
    backHandler(data) {
      if (this.customBackHandler) {
        this.customBackHandler(data)
      } else {
        this.$emit('option-changed')
      }
    },
    submitHandler(form, otherSubmitHandler = null) {
      this.$refs[form].validate((valid) => {
        if (!valid) return false
        this.$confirm('确定要保存吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (otherSubmitHandler) {
            otherSubmitHandler()
          } else {
            this.customSubmitHandler()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      })
    },
    submitSuccessHandler(data) {
      this.optionSuccessHandler()
      if (this.customSubmitSuccessHandler) {
        this.customSubmitSuccessHandler(data)
      } else {
        this.backHandler(data)
      }
    },
    optionSuccessHandler() {
      this.$message({
        type: 'success',
        message: '操作成功'
      })
    }
  }
}
