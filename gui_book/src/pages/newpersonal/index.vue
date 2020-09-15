<template>
  <div style="background-color: rgb(241,241,241)">
    <view class="bg-gradual-green UCenter-bg">
      <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/imgs/personal/personal.png'" class="touxiang"></img>
      <button class="toubutton" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">{{userInfo.nickName?userInfo.nickName:'登录'}}</button>
      <img class="gif-wave" mode="scaleToFill"src="../../../static/imgs/wave.gif"></img>
    </view>
    <view class="padding flex text-center text-grey bg-white shadow-warp">
      <view class="flex flex-sub flex-direction solid-right">
        <button class="cu-btn content" open-type="share" style="background-color: white">
          <img src="../../../static/imgs/personal/forword.png" alt="" style="margin: auto;margin-top: 20rpx;height: 50rpx;width: 50rpx">
        </button>
        <view class="margin-top-sm">
          <button class="cu-btn content" open-type="share" style="background-color: white">
            <text class="cuIcon-forward"></text>
            <text class="text-grey">转发</text>
          </button>
        </view>
      </view>
      <view class="flex flex-sub flex-direction solid-right" @click="onlookmyaccustom">
<!--        <view class="text-xxl text-blue">{{starCount}}</view>-->
        <img src="../../../static/imgs/personal/book.png" alt="" style="margin: auto;height: 100rpx;width: 100rpx">
        <view class="margin-top-sm">
          <text class="cuIcon-favorfill text-yellow"></text> 我的习惯</view>
      </view>
      <view class="flex flex-sub flex-direction">
<!--        <view class="text-xxl text-green">{{forksCount}}</view>-->
        <button class="cu-btn content" open-type="share" style="background-color: white">
          <img src="../../../static/imgs/personal/share.png" alt="" style="margin: auto;margin-top: 20rpx;height: 50rpx;width: 50rpx">
        </button>
        <view class="margin-top-sm">
          <button class="cu-btn content" open-type="share" style="background-color: white">
            <text class="cuIcon-share"></text>
            <text class="text-grey">分享</text>
          </button>
        </view>
      </view>
    </view>
    <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">


      <view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
        <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
            <view class="content">温馨提示</view>
            <view class="action" @tap="hideModal">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="padding-xl">
            为了保证您后续的操作，请授权登录
          </view>
          <view class="cu-bar bg-white">
            <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">确定</view>
            <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
          </view>
        </view>
      </view>
      <view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
        <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
            <view class="content">温馨提示</view>
            <view class="action" @tap="hideModal">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="padding-xl">
            您还未对图书进行评分哦，快去评分吧！
          </view>
          <view class="cu-bar bg-white">
            <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">确定</view>
            <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
          </view>
        </view>
      </view>
      <view class="cu-modal" :class="modalName=='DialogModal3'?'show':''">
        <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
            <view class="content">温馨提示</view>
            <view class="action" @tap="hideModal">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="padding-xl">
            您还未对图书进行收藏哦，快去收藏吧！
          </view>
          <view class="cu-bar bg-white">
            <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">确定</view>
            <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
          </view>
        </view>
      </view>
      <view class="cu-modal" :class="modalName=='DialogModal4'?'show':''">
        <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
            <view class="content">温馨提示</view>
            <view class="action" @tap="hideModal">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="padding-xl">
            您还未对浏览相关图书哦，快去浏览吧！
          </view>
          <view class="cu-bar bg-white">
            <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">确定</view>
            <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
          </view>
        </view>
      </view>
      <view class="cu-modal" :class="modalName=='DialogModal5'?'show':''">
        <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
            <view class="content">温馨提示</view>
            <view class="action" @tap="hideModal">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="padding-xl">
            您还未进行图书的推荐哦，快去荐购吧！
          </view>
          <view class="cu-bar bg-white">
            <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">确定</view>
            <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
          </view>
        </view>
      </view>
      <view class="cu-modal" :class="modalName=='DialogModal6'?'show':''">
        <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
            <view class="content">温馨提示</view>
            <view class="action" @tap="hideModal">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="padding-xl">
            请您再多看几本书吧！
          </view>
          <view class="cu-bar bg-white">
            <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">确定</view>
            <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
          </view>
        </view>
      </view>


      <view class="cu-item arrow">
        <view class="content" @click="onlookRating">
          <text class="cuIcon-appreciatefill text-red"></text>
          <text class="text-grey">我的评分</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content" @click="onlookCollection">
          <text class="cuIcon-evaluate_fill text-orange"></text>
          <text class="text-grey">我的收藏</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content" @click="onlookhistory">
          <text class="cuIcon-footprint text-green"></text>
          <text class="text-grey">我的足迹</text>
        </view>
      </view>
    </view>
    <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
      <view class="cu-item arrow">
        <view class="content" @click="onmessage">
          <text class="cuIcon-message text-grey"></text>
          <text class="text-grey">消息与通知</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <button class="cu-btn content" open-type="feedback">
          <text class="cuIcon-writefill text-cyan"></text>
          <text class="text-grey">意见或反馈</text>
        </button>
      </view>
      <view class="cu-item arrow">
        <navigator class="content" url="/pages/about/main" hover-class="none">
          <text class="cuIcon-edit text-gray"></text>
          <text class="text-grey">帮助和说明</text>
        </navigator>
      </view>
    </view>
    <view class="cu-tabbar-height"></view>
  </div>
</template>

<script>
    export default {
      data(){
          return{
              modalName:null,
              // starCount: 1000,
              // forksCount: 2000,
              // visitTotal: 3000,

              userInfo: {},
              lookhistory: [],
              Exceed: 0,
              UserBookClassification: [],
              UserLike: [],
              UserRecently:[],
              UserRecently2:[]
          }
      },
        methods: {
            handleGetUserInfo(e) {
                let that = this;
                console.log(e);
                if (e.mp.detail.userInfo) {
                    this.userInfo = e.mp.detail.userInfo
                }wx.login({
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
                    this.modalName = 'DialogModal1'
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
                            }else if (res.data.statusCode == 404){
                                that.modalName = 'DialogModal4'
                            }
                            // app.globalData.session = res.data.data.session3rd
                        }
                    })
                }
            },
            onlookRating(){
                if (this.globalData.session.key == null){
                    this.modalName = 'DialogModal1'
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
                            }else if (res.data.statusCode == 404){
                                that.modalName = 'DialogModal2'
                            }
                            // app.globalData.session = res.data.data.session3rd
                        }
                    })
                }
            },
            onlookCollection(){
                if (this.globalData.session.key == null){
                    this.modalName = 'DialogModal1'
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
                            // console.log(res.data.statusCode)
                            if (res.data.statusCode == 500) {
                                console.log('错误')
                                console.log(res)
                            } else if (res.data.statusCode == 200) {
                                wx.navigateTo({
                                    url: '/pages/index/main?booksArr=' + JSON.stringify(res.data.data) + '&type=' + 1
                                })
                            }else if (res.data.statusCode == 404){
                                that.modalName = 'DialogModal3'
                            }
                            // app.globalData.session = res.data.data.session3rd
                        }
                    })
                }
            },
            onlookmyaccustom(){
                if (this.globalData.session.key == null){
                    this.modalName = 'DialogModal1'
                }else{
                    let that = this
                    wx.request({
                        url: 'http://book.zhangfanglue.top/user/get/judgeUserRating',
                        method: 'GET',
                        data: {}, header: {
                            'content-type': 'application/json',
                            'session': that.globalData.session.key
                        },
                        success: function (res) {
                            // console.log(res.data.statusCode)
                            if (res.data.statusCode == 500) {
                                that.modalName = 'DialogModal6'
                            } else if (res.data.statusCode == 200) {
                                wx.navigateTo({
                                    url: '/pages/accustom/main?Exceed='+JSON.stringify(that.Exceed)+'&UserBookClassification='+JSON.stringify(that.UserBookClassification)
                                        +'&UserLike='+JSON.stringify(that.UserLike) +'&UserRecently='+JSON.stringify(that.UserRecently)
                                })
                            }
                            // app.globalData.session = res.data.data.session3rd
                        }
                    })
                }
            },
            hideModal(e) {
                this.modalName = null
            },
            onmessage(){
                if (this.globalData.session.key == null){
                    this.modalName = 'DialogModal1'
                }else{
                    let that = this
                    wx.request({
                        url: 'http://book.zhangfanglue.top/user/get/getMessageOfBuy',
                        method: 'GET',
                        data: {}, header: {
                            'content-type': 'application/json',
                            'session': that.globalData.session.key
                        },
                        success: function (res) {
                            // console.log(res.data.statusCode)
                            if (res.data.statusCode == 500) {
                                that.modalName = 'DialogModal5'
                            } else if (res.data.statusCode == 200) {
                                wx.navigateTo({
                                    url: '/pages/bookList3/main?booksArr=' + JSON.stringify(res.data.data.list)
                                })
                            }
                            // app.globalData.session = res.data.data.session3rd
                        }
                    })
                }
            },
            getExceedNum(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/get/getUserNo',
                    method: 'GET',
                    data: {}, header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function (res) {
                        if (res.data.statusCode == 200) {
                            that.Exceed = res.data.data.num
                            console.log('okExceedNum')
                        }
                        // app.globalData.session = res.data.data.session3rd
                    }
                })
            },
            getUserBookClassification(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/get/userRating',
                    method: 'GET',
                    data: {}, header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function (res) {
                        if (res.data.statusCode == 200) {
                            console.log(res)
                            that.UserBookClassification = res.data.data
                            console.log('okUserClassification')
                        }
                        // app.globalData.session = res.data.data.session3rd
                    }
                })
            },
            getUserLike(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/get/getUserRatingAve',
                    method: 'GET',
                    data: {}, header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function (res) {
                        if (res.data.statusCode == 200) {
                            console.log(res)
                            that.UserLike = res.data.data
                            console.log('okUserLike')
                        }
                        // app.globalData.session = res.data.data.session3rd
                    }
                })
            },
            getUserRecently(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/get/userReadTime',
                    method: 'GET',
                    data: {
                        time: ''
                    }, header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function (res) {
                        if (res.data.statusCode == 200) {
                            console.log(res)
                            that.UserRecently = res.data.data
                            console.log('okUserRecently')
                        }
                        // app.globalData.session = res.data.data.session3rd
                    }
                })
            },
            chartinit(){
                this.getExceedNum()
                this.getUserBookClassification()
                this.getUserLike()
                this.getUserRecently()
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
            if(this.globalData.session.key)
                this.chartinit();
        },
        onShareAppMessage: function( options ){
            var that = this;
            // 设置菜单中的转发按钮触发转发事件时的转发内容
            var shareObj = {
                title: "寻好书",    // 默认是小程序的名称(可以写slogan等)
                path: '/pages/share/share',    // 默认是当前页面，必须是以‘/'开头的完整路径
                imageUrl: '',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
                success: function(res){
                    // 转发成功之后的回调
                    if(res.errMsg == 'shareAppMessage:ok'){
                    }
                },
                fail: function(){
                    // 转发失败之后的回调
                    if(res.errMsg == 'shareAppMessage:fail cancel'){
                        // 用户取消转发
                    }else if(res.errMsg == 'shareAppMessage:fail'){
                        // 转发失败，其中 detail message 为详细失败信息
                    }
                },
            };
            // 来自页面内的按钮的转发
            if( options.from == 'button' ){
                // var eData = options.target.dataset;
                // console.log( eData.name );   // shareBtn
                // // 此处可以修改 shareObj 中的内容
                // shareObj.path = '/pages/btnname/btnname?btn_name='+eData.name;
            }
            // 返回shareObj
            return shareObj;
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .UCenter-bg {
    height: 500rpx;
    display: flex;
    justify-content: center;
    padding-top: 40rpx;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-weight: 300;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  .UCenter-bg text {
    opacity: 0.8;
  }

  .UCenter-bg image {
    width: 200rpx;
    height: 200rpx;
  }

  .UCenter-bg .gif-wave{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
  }

  map,.mapBox{
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
  }

  map,.mapBox{
    width: 750rpx;
    height: 300rpx;
  }
  .touxiang
      width 100rpx
      height 100rpx
      vertical-align middle
      border-radius 100rpx
  .toubutton
    display inline-block
    height 60rpx
    line-height 60rpx
    background rgba(255,255,255,0.5)
    vertical-align middle
    margin-top 50rpx
    max-width 200rpx
</style>
