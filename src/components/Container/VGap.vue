<template>
  <div class="sp" v-bind:style="{ flex:'0 0 auto', 'height':gapSty }">
    <slot/>
  </div>
</template>

<script>
  export default {
    props: ['gap'],
    computed: {
      gapSty() {
        if (!this.gap || !parseFloat(this.gap)) {
          return '10px'
        }
        return this.gap + 'px'
      }
    }
  };
</script>

