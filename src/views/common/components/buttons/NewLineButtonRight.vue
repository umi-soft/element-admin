<template>
  <div class="full">
    <slot/>
    <div class="buttons">
      <slot name="buttons"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .full {
    width: 100%;

    .buttons {
      width: 100%;
      margin-top: 10px;

      .el-button, .el-button-group {
        float: right;
        margin-left: 15px;
      }
    }
  }
</style>
