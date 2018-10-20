<template>
  <div class="flex-container">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
  .flex-container{
    width: 100%;
    padding: 10px 0px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
</style>
