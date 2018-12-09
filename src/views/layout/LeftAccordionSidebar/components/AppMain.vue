<template>
  <section class="app-main">
    <el-card>
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key"/>
        </keep-alive>
      </transition>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
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

