<template>
  <div class="groupClass" >
    <div class="groupInnerClass">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
  .groupClass {
    flex: auto;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .groupInnerClass {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
  }
</style>
