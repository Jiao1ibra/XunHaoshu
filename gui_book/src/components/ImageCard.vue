<template>
  <div class="image-card" @click="onClick">
    <img :src="src" :mode="mode" :lazy-load="lazyLoad"
         :style="{ height: '280rpx' }"
         :class="round ? 'round image': 'image'"
         @error="onError" @load="onLoad"
         v-show="!isLoading && !error"
    />
    <img src="../../static/imgs/user.png"
         :mode="mode" :lazy-load="lazyLoad"
         :style="{ height: height }"
         :class="round ? 'round image': 'image'"
         v-show="isLoading || error"
    />
  </div>
</template>

<script>
  export default {
    name: 'ImageCard',
    props: {
      src: { type: String, default: '' },
      mode: { type: String, default: 'widthFix' },
      lazyLoad: { type: Boolean, default: true },
      round: { type: Boolean, default: false },
      height: { type: String, default: 'auto' }
    },
    data () {
      return {
        isLoading: true,
        error: false
      }
    },
    watch: {
      src (newValue, preValue) {}
    },
    methods: {
      onClick () {
        this.$emit('onClick')
      },
      onLoad () {
        // console.log('onLoad')
        this.isLoading = false
        this.error = false
      },
      onError () {
        // console.log('onError')
        this.isLoading = false
        this.error = true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .image-card {
    width: 100%;
    .image {
      width: 100%;
      &.round {
        border-radius: 50%;
      }
    }
  }
</style>
