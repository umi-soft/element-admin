<template>
  <el-form :model="detail" :label-width="labelWidth" :size="size" :inline="inline">
    <input-item-view label="创建人">{{ detail.createdBy }}</input-item-view>
    <input-item-view label="创建时间">{{ detail.createdDate | parseTime }}</input-item-view>
    <input-item-view label="最后修改人">{{ detail.modifiedBy }}</input-item-view>
    <input-item-view label="最后修改时间">{{ detail.modifiedDate | parseTime }}</input-item-view>
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
