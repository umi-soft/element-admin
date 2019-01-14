<template>
  <el-tag :type="state === 1 ? 'success' : 'info'" plain>{{ state | translateTrueOrFalse }}</el-tag>
</template>

<script>
export default {
  props: {
    state: {
      required: true,
      type: [String, Number],
      default: () => {}
    }
  }
}
</script>
