<template>
  <div id="booksContainer">
    <swiper @change="handleChange" :indicator-dots="index !== 3" indicator-color="pink" indicator-active-color="#02a774" circular>
      <swiper-item>
        <img src="/static/imgs/firstView/1.jpg">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/2.jpg">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/3.jpg">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/firstView/nvsheng.jpg">
      </swiper-item>
    </swiper>
    <button @click="toIndex" class="btn" v-show="index === 3">开始体验</button>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                index:0
            }
        },
        methods:{
            handleChange(event){
                console.log(event)
                this.index = event.mp.detail.current
            },
            judge(){
                let that = this;
                wx.login({
                    success: res => {
                        this.code = res.code
                        wx.getUserInfo({
                            withCredentials: true,
                            success: res => {
                                this.rawData = res.rawData
                                this.signature = res.signature
                                this.encryptedData = res.encryptedData
                                this.iv = res.iv
                                wx.request({
                                    url: 'http://book.zhangfanglue.top/wxlogin/index/judge',
                                    method: 'POST',
                                    data: {
                                        code: this.code,
                                        rawData: this.rawData,
                                        signature: this.signature,
                                        encryptedData: this.encryptedData,
                                        iv: this.iv
                                    },
                                    header: {
                                        'content-type': 'application/json'
                                    },
                                    success: function (res) {
                                        console.log(res.data.data.session3rd)
                                        if (res.data.data.session3rd) {
                                            that.globalData.session.key = res.data.data.session3rd
                                        }
                                        console.log('session' + that.globalData.session.key)
                                        wx.switchTab({
                                            url: '/pages/newindex/main'
                                        })
                                    }
                                })
                            },
                            fail: err => {
                                console.log(this.globalData.session.key)
                                wx.switchTab({
                                    url: '/pages/newindex/main'
                                })
                            }
                        })
                    }
                })
            },
            toIndex(){
                console.log('ok')
                // console.log(this.globalData.session.key)
                this.judge()

            }
        },
        mounted(){
            this.globalData.session = {key:null}
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #booksContainer
    width 100%
    height 100%
    swiper
      width 100%
      height 100%
      img
        height 100%
        width 100%

    .btn{
      width 280rpx
      height 80rpx
      text-align center
      line-height 80rpx
      position absolute
      bottom 20rpx
      left 50%
      margin-left -140rpx
      background rgba(255,255,255,.5)
    }
</style>
