<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive>
      <component :is="component" :option-type="optionType" :detail="group" @option-changed="optionChangeHandler"/>
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
      group: {}
    }
  },
  methods: {
    optionChangeHandler(optionType = 'query', group = {}) {
      NProgress.start()
      this.group = group
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
