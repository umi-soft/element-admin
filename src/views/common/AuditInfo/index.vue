<template>
  <el-form :model="detail" :label-width="labelWidth" :size="size" :inline="inline">
    <el-form-item label="创建人">
      <el-input :value="detail.createdBy" disabled/>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-input :value="detail.createdDate | parseTime" disabled/>
    </el-form-item>
    <el-form-item label="最后修改人">
      <el-input :value="detail.modifiedBy" disabled/>
    </el-form-item>
    <el-form-item label="最后修改时间">
      <el-input :value="detail.modifiedDate | parseTime" disabled/>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  props: {
    inline: {
      required: false,
      type: Boolean,
      default: false
    },
    size: {
      required: false,
      type: String,
      default: 'small'
    },
    labelWidth: {
      required: false,
      type: String,
      default: '200px'
    },
    detail: {
      required: true,
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
