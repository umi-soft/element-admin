<template>
  <div class="full">
    <div class="left">
      <slot name="left"/>
    </div>
    <div class="right">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .full {
    width: 100%;
    .left {
      display: inline;
      width: 50%;
      min-height: 32px;
      line-height: 32px;
    }
    .right {
      display: inline;
      width: 50%;
      min-height: 32px;
      line-height: 32px;

      .el-select {
        float: right;
        margin-left: 15px;
      }
    }
  }
</style>
