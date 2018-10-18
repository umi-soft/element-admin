<template>
  <el-tag :type="type" plain>{{ item.state | translateState }}</el-tag>
</template>

<script>
export default {
  props: {
    detail: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      item: this.detail
    }
  },
  computed: {
    type() {
      return this.item.state === 1 ? 'success' : 'info'
    }
  }
}
</script>
