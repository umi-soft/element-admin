<template>
  <div class="full">
    <div class="left">
      <slot/>
    </div>
    <div class="right">
      <slot name="button"/>
    </div>
  </div>
</template>

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

      .el-button, .el-button-group {
        float: right;
        margin-left: 15px;
      }
    }
  }
</style>
