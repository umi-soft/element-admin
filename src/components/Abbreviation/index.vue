<template>
  <el-popover :placement="placement" :width="width" :trigger="trigger">
    <span slot="reference">{{ abbr }}</span>
    <span class="break-word">{{ content }}</span>
  </el-popover>
</template>

<script>
export default {
  props: {
    content: {
      required: false,
      type: String,
      default: ''
    },
    size: {
      required: false,
      type: Number,
      default: 10
    },
    placement: {
      required: false,
      type: String,
      default: 'top-start'
    },
    width: {
      required: false,
      type: Number,
      default: 200
    },
    trigger: {
      required: false,
      type: String,
      default: 'hover'
    }
  },
  data() {
    let abbr = ''
    if (this.content) {
      abbr = this.content.substring(0, this.size)
    }
    return {
      abbr: abbr
    }
  }
}
</script>

<style lang="scss" scoped>
.break-word {
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap !important;
}
</style>
