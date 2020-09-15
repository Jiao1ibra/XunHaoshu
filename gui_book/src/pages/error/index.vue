<template>
  <div class="container ub-box">
    <dl class="ub-box ub-col ub-ver z-width-100-percent" style="background:#fff">
      <i class="z-margin-bottom-20-px iconfont icon-jijianfasong z-font-size-60" style="color:#06c1ae"></i>
      <span class="z-font-size-15 z-color-888">苦逼的程序员正在加班...</span>
    </dl>
  </div>
</template>

<script>
import css from '../newsearchBook/common.css'
    export default {
        data () {
            return {}
        },
        methods: {},
        onShow () {
            wx.setNavigationBarTitle({title: '正在开发'})
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .container
    width 100%
    height 100vh
    background #fff
</style>
