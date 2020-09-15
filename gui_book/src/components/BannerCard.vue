<template>
    <div class="banner-card" @click="onClick">
      <div class="bg-img" :style="{backgroundImage: bgImage }">
        <div class="title text-olive text-bold">{{title}}</div>
        <div class="sub-title">{{subTitle}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'BannerCard',
    props: {
      title: String,
      subTitle: String,
      image: String
    },
    computed: {
      bgImage () {
        return 'url(' + this.image + ')'
      }
    },
    methods: {
      onClick () {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .banner-card
    margin-top: 20px
    padding: 0 20px
    box-sizing: border-box
    .bg-img
      display: flex
      flex-direction: column
      justify-content: center
      background: whitesmoke
      align-items: center
      width: 100%
      height: 120px
      border-radius: 10px
      background-size: 100% 100%
      background-repeat: no-repeat
      .title
        font-size: 20px
        color forestgreen
      .sub-title
        width: fit-content
        padding: 5px 15px
        background: #1cbbb4
        border: 1px solid #ccc
        border-radius: 50px
        margin-top: 12px
        font-size: 15px
        color: #FFFFFF
</style>
