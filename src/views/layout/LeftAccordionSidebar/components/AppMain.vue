<template>
  <section class="app-main">
    <el-card>
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 84px);
  width: 100%;
  padding: 15px;
  position: relative;
  overflow: hidden;
}
</style>

