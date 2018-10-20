<template>
  <div :class="['el-form-item', elFormItemSize]">
    <label :style="{ width: labelWidth}" class="el-form-item__label">{{ label }}:</label>
    <div :style="{ marginLeft: labelWidth}" class="el-form-item__content">
      <div :class="['el-input', 'is-disabled', elInputSize]">
        <div class="el-input__inner break-word">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String
    },
    labelWidth: {
      required: false,
      type: String,
      default: '200px'
    },
    size: {
      required: false,
      type: String,
      default: 'small'
    }
  },
  computed: {
    elFormItemSize() {
      return 'el-form-item--' + this.size
    },
    elInputSize() {
      return 'el-input--' + this.size
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-input__inner {
    background-color: white !important;
    border: none !important;
  }
  .break-word {
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap !important;
  }
</style>
