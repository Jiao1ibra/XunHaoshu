<template>
    <div class="home">
      <div class="search-bar">
        <div class="search-bar-wrapper" @click="onSearchBoxClick">
          <input
            class="search-bar-input"
            placeholder= '搜索关键字'
            placeholder-style="color: #ADB4BE"
            disabled="disabled"
          />
        </div>
      </div>

      <view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
        <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
            <view class="content">温馨提示</view>
            <view class="action" @tap="hideModal">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="padding-xl">
            立即授权登录，体验个性化推荐服务
          </view>
          <view class="cu-bar bg-white">
            <view class="action margin-0 flex-sub text-green solid-left" @tap="Topersonal">确定</view>
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
            恭喜您，已成功签到！
          </view>
          <view class="cu-bar bg-white">
            <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">确定</view>
            <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
          </view>
        </view>
      </view>

<!--      <banner-card image="http://img1.gtimg.com/ninja/1/2019/08/ninja156524938217842.jpg"-->
<!--                   title="热诚欢迎您的图书捐赠" sub-title="立即赠书"-->
<!--                   @onClick="onBannerClick">-->
<!--      </banner-card>-->
      <banner-card image="http://book.zhangfanglue.top/image/background.JPG"
                   title="打卡图书馆" sub-title="立即签到"
                   @onClick="onBannerClick">
      </banner-card>
      <div class="container-card-wrapper">
        <container-card title="热门图书" btnText="查看更多" @onMoreClick="handleObtainMore('top')"
                        :data="topBooks" :nrows="1" :ncols="3" mode="col">
        </container-card>
      </div>
      <div class="container-card-wrapper" v-show="!waitrequest">
        <container-card title="推荐好书" >
        </container-card>
      </div>
      <div class="container-card-wrapper" v-show="isshowrecommend && waitrequest">
        <container-card title="推荐好书" :btnText=waitrequest @onMoreClick="handleObtainMore('recommend')"
                        :data="recommendBooks" :nrows="2" :ncols="2" mode="row">
        </container-card>
      </div>
      <div v-show="!waitrequest">
      <img class="waitrecommend" src="http://book.zhangfanglue.top/image/2018914235048569.gif"></img>
      <text class="text-grey text-center text-sm" style="margin-left: 25%;margin-bottom: 20rpx">专属于您的精彩好书，正在向你赶来</text>
      </div>
      <div class="container-card-wrapper">
        <container-card title="新书上架" btnText="查看更多" @onMoreClick="handleObtainMore('new')"
                        :data="newBooks" :nrows="1" :ncols="3" mode="col">
        </container-card>
      </div>
      <div class="container-card-wrapper">
        <container-card title="图书分类" :show-footer=false @onMoreClick="handleObtainMore('category')"
                        :data="categoryList" :nrows="3" :ncols="2" mode="category">
        </container-card>
      </div>
      <p class='footer' v-if='!more'>
        暂时没有更多数据
      </p>
    </div>
</template>

<script>
import BannerCard from '../../components/BannerCard'
import ContainerCard from '../../components/ContainerCard'
import datas from '../index/datas/data'
    export default {
      data(){
          return{
              modalName: null,
              bookArr:datas,
              newBooks: [],
              recommendBooks: [],
              topBooks: [],
              categoryList: [],
              isshowrecommend: true,
              waitrequest: false
          }
      },
      components:{
          BannerCard,ContainerCard
      },
      methods: {
            onSearchBoxClick() {
                console.log('ok')
                wx.switchTab({
                    url: '/pages/newsearchBook/main'
                })
            },
            onBannerClick() {
                //  跳转到Banner详情
                this.modalName = 'DialogModal2'
            },
            handleObtainMore (kind) {
                switch (kind) {
                    case 'new':
                        // this.newPage += 1
                        // this.obtainNewBooks()
                        this.obtainMoreNewBooks(this.newBooks)
                        break
                    case 'recommend':
                        // this.recommendPage += 1
                        this.obtainMoreRecommendBooks(this.recommendBooks)
                        break
                    case 'top':
                        // this.freePage += 1
                        // this.obtainTopBooks()
                        this.obtainMoreNewBooks(this.topBooks)
                        break
                    case 'category':
                        this.obtainCategories()
                        break
                }
            },
            obtainMoreNewBooks(newbooks){
                wx.navigateTo({
                    url:'/pages/bookList/main?booksArr='+JSON.stringify(newbooks)
                })
            },
            obtainMoreTopBooks(topbooks){
                wx.navigateTo({
                    url:'/pages/bookList/main?booksArr='+JSON.stringify(topbooks)
                })
            },
            obtainMoreRecommendBooks(recommendbooks){
                wx.navigateTo({
                    url:'/pages/bookList/main?booksArr='+JSON.stringify(recommendbooks)
                })
            },
            obtainNewBooks () {
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/book/index/getNewBookList',
                    method: 'GET',
                    data: {
                    },
                    header: {
                        'content-type': 'application/json',
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.data.statusCode == 500){
                            console.log(res)
                        }else if(res.data.statusCode == 200){
                            console.log(res)
                            that.newBooks = res.data.data
                            // console.log(that.newBooks)
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
            },
            obtainTopBooks () {
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/book/index/getWellLikeBookList',
                    method: 'GET',
                    data: {
                    },
                    header: {
                        'content-type': 'application/json',
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.data.statusCode == 500){
                            console.log(res)
                        }else if(res.data.statusCode == 200){
                            console.log(res)
                            that.topBooks = res.data.data
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
            },
            obtainRecommendBooks(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/book/book/getRecommendBookList',
                    method: 'GET',
                    data: {

                    },
                    header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.data.statusCode == 500){
                            console.log(res)
                        }else if(res.data.statusCode == 200){
                            console.log(res)
                            that.recommendBooks = res.data.data
                            that.waitrequest = "查看更多"
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
            },
            obtainCategories () {
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/book/index/getTags',
                    method: 'GET',
                    data: {
                    },
                    header: {
                        'content-type': 'application/json',
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.data.statusCode == 500){
                            console.log(res)
                        }else if(res.data.statusCode == 200){
                            console.log(res)
                            that.categoryList = res.data.data
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
            },
          init () {
              if (this.globalData.session.key == null){
                  this.modalName = 'DialogModal1'
              }
              if(this.globalData.session.key){
                  this.modalName = null
                  this.isshowrecommend = true
                  this.waitrequest = false
              }
              else
                  this.isshowrecommend = false
              this.obtainNewBooks()
              this.obtainTopBooks()
              this.obtainRecommendBooks()
              this.obtainCategories()
          },
          hideModal(e) {
              this.modalName = null
          },
          Topersonal(){
              wx.switchTab({
                  url:'/pages/newpersonal/main'
              })
          }
        },
        onShow(){
            this.init()
        },
        onPullDownRefresh(){
            console.log('下拉')
            this.init()
            wx.showNavigationBarLoading()
            setTimeout(function (){wx.stopPullDownRefresh();wx.hideNavigationBarLoading()},1000)
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home
    .search-bar
      margin-top 30rpx
      padding 15px 15.5px
    .search-bar-wrapper
      background: #F5F6F9
      border-radius: 20px
      padding: 12px 16px
      height: 40px
      box-sizing: border-box
      display: flex
      align-items: center
      .search-bar-input
        flex: 1
        margin: 0 8px
    .container-card-wrapper
      margin-top 10px
    .footer
      padding-top 50rpx
      text-align center
      font-size 25rpx
      margin 20rpx
      color #808080
.waitrecommend
    display: flex
    flex-direction: column
    justify-content: center
    background: white
    align-items: center
    width: 50%
    margin: auto
    height: 120px
    border-radius: 10px
    background-size: 100% 100%
    background-repeat: no-repeat
</style>
