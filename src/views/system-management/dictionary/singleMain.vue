<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive>
      <component :is="optionType" :detail="detail" category="2" @option-changed="optionChangeHandler"/>
    </keep-alive>
  </transition>
</template>

<script>
import NProgress from 'nprogress' // 进度条组件
import query from './singleQuery'
import edit from './edit'
import add from './add'
import check from './check'

export default {
  components: { query, edit, add, check },
  data() {
    return {
      optionType: 'query',
      detail: {}
    }
  },
  methods: {
    optionChangeHandler(optionType = 'query', detail = {}) {
      NProgress.start()
      this.detail = detail
      this.optionType = optionType
      NProgress.done()
    }
  }
}
</script>
