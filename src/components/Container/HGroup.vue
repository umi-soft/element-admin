<template>
  <div class="hGroup" v-bind:style="alignStyle">
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
          'align-items': 'center',
          '-ms-flex-align': 'center'
        }
        let val = this.hor
        if (!val) {
          val = 'start'
        }
        if( val === 'start' || val === 'end') {
          _style['justify-content'] = 'flex-' + val
          _style['-ms-flex-pack'] = val
        } else {
          _style['justify-content'] = val
          _style['-ms-flex-pack'] = val
        }

        val = this.ver
        if (!val) {
          val = 'center'
        }
        if( val === "start" || val === "end") {
          _style['align-items'] = "flex-" + val
          _style['-ms-flex-align'] = val
        } else {
          _style['align-items'] = val
          _style['-ms-flex-align'] = val
        }
        return _style
      }
    }
  }
</script>

<style scoped>
  .hGroup {
    float: left;
    display: flex;
    display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box;     /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;  /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */

    flex-direction: row;
    -ms-flex-direction: row;

    justify-content: flex-start ; /* flex-start|flex-end|center|space-between|space-around|initial|inherit*/
    align-items: center;
  }
</style>
