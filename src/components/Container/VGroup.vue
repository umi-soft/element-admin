<template>
  <div class="vGroup" v-bind:style="alignStyle">
    <slot/>
  </div>
</template>

<script>
  export default {
    props: ['hor','ver'],
    computed: {
      alignStyle() {
        let _style = {
          'justify-content': 'flex-start',
          '-ms-flex-pack': 'start',
          'align-items': 'flex-start',
          '-ms-flex-align': 'start'
        }
        let val = this.ver
        if (!val) {
          val = 'start'
        }
        if ( val === 'start' || val === 'end') {
          _style['justify-content'] = 'flex-' + val
          _style['-ms-flex-pack'] = val
        } else {
          _style['justify-content'] = val
          _style['-ms-flex-pack'] = val
        }
        val = this.hor
        if (!val) {
          val = 'start'
        }
        if( val === 'start' || val === 'end') {
          _style['align-items'] = 'flex-' + val
          _style['-ms-flex-align'] = val
        } else {
          _style['align-items'] = val
          _style['-ms-flex-align'] = val
        }
        return _style
      }
    }
  };
</script>

<style scoped>
  .vGroup {
    display: flex ;
    display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box;     /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;  /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */

    flex-direction: column;
    -ms-flex-direction: column;

    justify-content: flex-start ;
    -ms-flex-pack: start;

    align-items: flex-start;
    -ms-flex-align: start;
  }
</style>
