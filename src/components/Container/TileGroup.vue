<template>
  <div class="titleGroup" >
    <slot/>
  </div>
</template>

<script>
  export default {
    props: ['column'],
    data(){
      return {
        fields:[],
        colNum:0,
        widthNum:0
      }
    },
    created() {
      this.$on('TileItem.create.event', (field) => {
        if (field) {
          this.fields.push(field);
          if (field && field.resetItemSize)
            field.resetItemSize(this.widthNum);
        }
      });
      this.$on('TileItem.remove.event', (field) => {
        if (field.prop) {
          this.fields.splice(this.fields.indexOf(field), 1)
        }
      })
    },
    mounted(){
      this.countItemSize()
    },
    watch:{
      column(){
        this.countItemSize()
      }
    },
    methods:{
      countItemSize(){
        if (!this.fields && this.fields.length===0){
          return
        }
        let _num = parseInt(this.column)
        if (_num) {
          this.colNum = _num
          this.widthNum = Math.floor(100/_num)
        } else {
          this.colNum = 0
          this.widthNum = 0
        }
        for (let item of this.fields) {
          if (item && item.resetItemSize) {
            item.resetItemSize(this.widthNum)
          }
        }
      }
    }
  }
</script>

<style scoped>
  .titleGroup {
    display: flex ;
    display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box;     /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;  /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */

    flex-direction: row;
    flex-wrap: wrap;/*flex-flow: row wrap;*/
    -ms-flex-wrap: wrap;

    justify-content: flex-start;
    -ms-flex-pack: start;

    align-items: flex-start;
    -ms-flex-align: start;

    align-content: flex-start;
    overflow: hidden;
  }
</style>
