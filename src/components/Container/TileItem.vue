<template>
  <div class="groupClass" v-bind:style="{width:widthValue}">
      <slot/>
  </div>
</template>

<script>
  export default {
    props: {
      col: {
        default:1
      }
    },
    data() {
      return {
        widthNum:25,
      }
    },
    computed: {
      widthValue() {
        return (this.widthNum * parseInt(this.col)) + '%'
      }
    },
    methods:{
      resetItemSize( w ,h ) {
        this.widthNum = w
      }
    },
    mounted() {
      this.$parent.$emit("TileItem.create.event",this)
    },
    beforeDestroy() {
      this.$parent.$emit('TileItem.remove.event', this)
    }
  }
</script>

<style scoped>
  .groupClass {
    flex:0 0 auto;
    position:relative;
  }
  .groupInnerClass {
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    overflow: auto;
  }
</style>
