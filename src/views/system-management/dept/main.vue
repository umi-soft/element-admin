<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive>
      <component :is="component" :option-type="optionType" :detail="detail" @option-changed="optionChangeHandler"/>
    </keep-alive>
  </transition>
</template>

<script>
import NProgress from 'nprogress' // 进度条组件
import query from './query'
import edit from './edit'
import check from './check'

export default {
  components: { query, edit, check },
  data() {
    return {
      optionType: 'query',
      component: 'query',
      detail: {}
    }
  },
  methods: {
    optionChangeHandler(optionType = 'query', detail = {}) {
      NProgress.start()
      this.detail = detail
      this.component = optionType
      this.optionType = optionType
      if (optionType === 'add') {
        this.component = 'edit'
      }
      NProgress.done()
    }
  }
}
</script>
