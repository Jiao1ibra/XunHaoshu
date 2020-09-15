<template>
  <text class="rate" :style='style'></text>
</template>
<script>
    export default {
        props:{
            value:{type:[Number,String],default:'0'}
        },
        computed:{
            style(){
                return `background-position: 0 ${(10-Math.round(this.value)) * -11}px`
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rate
    position: relative
    display: inline-block
    zoom: 1;
    background: url(https://img3.doubanio.com/f/shire/b8f4c3672ef81106701071831e22422a745d3b74/pics/rating_icons/ic_rating_s.png) no-repeat;
    width: 55px;
    height: 11px;
    margin: 0 3px 0 0;
    overflow: hidden;

</style>
