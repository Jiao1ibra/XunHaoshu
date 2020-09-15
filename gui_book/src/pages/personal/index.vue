<template>
    <div id="personContainer">
<!--      <div class="header">-->
      <div class="headers">
        <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/imgs/personal/personal.png'" alt="">
        <button open-type="getUserInfo" @getuserinfo="handleGetUserInfo">{{userInfo.nickName?userInfo.nickName:'登录'}}</button>
      </div>
<!--      <div class="cardList">-->
<!--        <div class="card">-->
<!--          <span>扫码看书</span>-->
<!--          <span class="more"> > </span>-->
<!--        </div>-->
<!--      </div>-->
      <div class="cardList">
        <div class="card_top">
          <img src="../../../static/imgs/personal/inform.png" alt="">
          <span>通知</span>
          <span class="more"><img src="../../../static/imgs/personal/arrow.png" alt=""></span>
        </div>
        <div class="card" @click="onlookRating">
          <img src="../../../static/imgs/personal/dynamic.png" alt="">
          <span>我的评分</span>
          <span class="more"><img src="../../../static/imgs/personal/arrow.png" alt=""></span>
        </div>
        <div class="card_top" @click="onlookCollection">
          <img src="../../../static/imgs/personal/comment.png" alt="">
          <span>我的收藏</span>
          <span class="more"><img src="../../../static/imgs/personal/arrow.png" alt=""></span>
        </div>
        <div class="card">
          <img src="../../../static/imgs/personal/borrow.png" alt="">
          <span>借阅图书</span>
          <span class="more"><img src="../../../static/imgs/personal/arrow.png" alt=""></span>
        </div>
        <div class="card_top" @click="onlookhistory">
          <img src="../../../static/imgs/personal/history.png" alt="">
          <span>我的足迹</span>
          <span class="more"><img src="../../../static/imgs/personal/arrow.png" alt=""></span>
        </div>
        <div class="card">
          <img src="../../../static/imgs/personal/setting.png" alt="">
          <span>设置</span>
          <span class="more"><img src="../../../static/imgs/personal/arrow.png" alt=""></span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {},
                lookhistory: []
            }
        },
        methods: {
            handleGetUserInfo(e) {
                let that = this;
                console.log(e);
                if (e.mp.detail.userInfo) {
                    this.userInfo = e.mp.detail.userInfo
                }
                wx.login({
                    success: res => {
                        that.code = res.code;
                        console.log(e)
                        wx.request({
                            url: 'http://book.zhangfanglue.top/wxlogin/index/login',
                            method: 'POST',
                            data: {
                                code: that.code,
                                rawData: e.mp.detail.rawData,
                                signature: e.mp.detail.signature,
                                encryptedData: e.mp.detail.encryptedData,
                                iv: e.mp.detail.iv
                            }, header: {
                                'content-type': 'application/json'
                            },
                            success: function (res) {
                                console.log(res.data)
                                that.globalData.session = {key:res.data.data.session3rd}
                                console.log(that.globalData)


                                // app.globalData.session = res.data.data.session3rd
                            }
                        })
                    },
                    fail: () => {
                        console.log('获取失败')
                    }
                })
            },
            onlookhistory(){
                    if (this.globalData.session.key == null){
                        wx.showModal({
                            title: '温馨提示',
                            content: '为了保证您后续的操作，请授权登录',
                            showCancel: true,//是否显示取消按钮

                            // success (res) {
                            //     if (res.confirm) {
                            //         wx.switchTab({
                            //             url: '/pages/personal/main'
                            //         })
                            //     } else if (res.cancel) {
                            //         // console.log('用户点击取消')
                            //     }
                            // }
                        })
                    }else {
                        let that = this
                        wx.request({
                            url: 'http://book.zhangfanglue.top/user/get/getBrowse',
                            method: 'GET',
                            data: {}, header: {
                                'content-type': 'application/json',
                                'session': that.globalData.session.key
                            },
                            success: function (res) {
                                if (res.data.statusCode == 500) {
                                    console.log(res)
                                } else if (res.data.statusCode == 200) {
                                    wx.navigateTo({
                                        // url:'/pages/bookList2/main?booksArr='+JSON.stringify(res.data.data) +'&isshowstar=' + 0
                                        url: '/pages/index/main?booksArr=' + JSON.stringify(res.data.data) + '&type=' + 0
                                    })
                                }
                                // app.globalData.session = res.data.data.session3rd
                            }
                        })
                    }
            },
            onlookRating(){
                if (this.globalData.session.key == null){
                    wx.showModal({
                        title: '温馨提示',
                        content: '为了保证您后续的操作，请授权登录',
                        showCancel: true,//是否显示取消按钮

                        // success (res) {
                        //     if (res.confirm) {
                        //         wx.switchTab({
                        //             url: '/pages/personal/main'
                        //         })
                        //     } else if (res.cancel) {
                        //         // console.log('用户点击取消')
                        //     }
                        // }
                    })
                }else {
                    let that = this
                    wx.request({
                        url: 'http://book.zhangfanglue.top/user/get/getRating',
                        method: 'GET',
                        data: {}, header: {
                            'content-type': 'application/json',
                            'session': that.globalData.session.key
                        },
                        success: function (res) {
                            if (res.data.statusCode == 500) {
                                console.log(res)
                            } else if (res.data.statusCode == 200) {
                                wx.navigateTo({
                                    url: '/pages/bookList2/main?booksArr=' + JSON.stringify(res.data.data)
                                })
                            }
                            // app.globalData.session = res.data.data.session3rd
                        }
                    })
                }
            },
            onlookCollection(){
                if (this.globalData.session.key == null){
                    wx.showModal({
                        title: '温馨提示',
                        content: '为了保证您后续的操作，请授权登录',
                        showCancel: true,//是否显示取消按钮

                        // success (res) {
                        //     if (res.confirm) {
                        //         wx.switchTab({
                        //             url: '/pages/personal/main'
                        //         })
                        //     } else if (res.cancel) {
                        //         // console.log('用户点击取消')
                        //     }
                        // }
                    })
                }else {
                    let that = this
                    wx.request({
                        url: 'http://book.zhangfanglue.top/user/get/getCollect',
                        method: 'GET',
                        data: {}, header: {
                            'content-type': 'application/json',
                            'session': that.globalData.session.key
                        },
                        success: function (res) {
                            if (res.data.statusCode == 500) {
                                console.log(res)
                            } else if (res.data.statusCode == 200) {
                                wx.navigateTo({
                                    url: '/pages/index/main?booksArr=' + JSON.stringify(res.data.data) + '&type=' + 1
                                })
                            }
                            // app.globalData.session = res.data.data.session3rd
                        }
                    })
                }
            }
            },
            mounted() {
                wx.getUserInfo({
                    success: (res) => {
                        console.log(res)
                        console.log(res.userInfo);
                        this.userInfo = res.userInfo
                    },
                    fail: () => {
                        console.log('获取失败')
                    }
                })
            }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #personContainer
    .headers
      width: 100%
      height: 360rpx
      background-color: #02a774
      display: flex
      flex-direction: column
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1)
      img
        width: 160rpx
        height: 160rpx
        border-radius: 100%
        margin-top: 25rpx
        margin-left 295rpx
      button
        display inline-block
        height 60rpx
        line-height 60rpx
        background rgba(255,255,255,0.5)
        vertical-align middle
        margin 40rpx auto
        max-width 200rpx
    .header
      padding 40rpx
      background #02a774
      img
        width 100rpx
        height 100rpx
        vertical-align middle
        border-radius 50rpx
      button
        display inline-block
        height 60rpx
        line-height 60rpx
        background rgba(255,255,255,0.5)
        vertical-align middle
        margin-left 40rpx
        max-width 200rpx




    .cardList
      .card_top
        width 95%
        height 60rpx
        line-height 60rpx
        margin 10rpx auto
        border 1rpx solid #eee
        padding 10rpx
        margin-bottom 50rpx
        img
          width: 50rpx
          height: 50rpx
          float: left
        span
          margin-left 20rpx
          height 50rpx
          line-height 50rpx
        .more
          float right
      .card
        width 95%
        height 60rpx
        line-height 60rpx
        margin 10rpx auto
        border 1rpx solid #eee
        padding 10rpx
        img
          width: 50rpx
          height: 50rpx
          float: left
        span
          margin-left 20rpx
          height 50rpx
          line-height 50rpx
        .more
          float right
</style>
