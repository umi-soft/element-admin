<template>
  <el-tag :type="state === 1 ? 'success' : 'info'" plain>{{ state | translateDictionary( dictionaries.trueOrFalse ) }}</el-tag>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    state: {
      required: true,
      type: [String, Number],
      default: () => {}
    }
  },
  computed: {
    ...mapGetters([
      'dictionaries'
    ])
  }
}
</script>
