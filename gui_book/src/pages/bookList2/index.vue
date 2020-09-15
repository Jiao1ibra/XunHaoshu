<template>
  <div id="bookListContainer">
<!--    <div @click="toDetail(item.id)" class="bookItem" v-for="(item,index) in booksArr" :key="index">-->
<!--      <img class="bookImg" :src="item.image" alt="">-->
<!--      <div class="bookInfo">-->
<!--        <p class="book_title">{{item.title}}</p>-->
<!--        <p class="book_author">作者：{{item.author}}</p>-->
<!--        <p class="book_pub">出版社：{{item.publisher}}</p>-->
<!--      </div>-->
<!--      <p class="bookRating">{{item.rating?item.rating:item.user_rating}} <Rate :value="item.rating?item.rating:item.user_rating"></Rate></p>-->
<!--    </div>-->
    <view class="cu-list2 menu-avatar2">
      <view class="cu-item2" :class="modalName=='move-box-'+ index?'move-cur2':''" v-for="(item,index) in booksArr" :key="index"
            @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" :data-index="item" @click="toDetail(item.id)">
        <view class="cu-avatar2 xxl2" :style="[{backgroundImage: 'url(' + item.image + ')'}]" style="background-size:168rpx 200rpx;"></view>
        <view class="content2" style="margin-left: 60rpx">
          <view class="text-grey">{{item.title}}</view>
          <view class="text-gray text-sm">作者：{{item.author}}</view>
          <view class="text-orange text-df" v-if="item.rating||item.user_rating"><Rate :value="item.rating?item.rating:item.user_rating"></Rate>{{item.rating?item.rating:item.user_rating}}</view>
          <!--            :class = "[getRating(item.rating)?class9:class10]"></text>{{item.rating}}</view>-->
          <view class="text-gray text-sm" v-else>暂无评分</view>
        </view>
        <view class="action2">
          <view class="cu-tag round bg-grey sm">{{Random[index%Random.length]}}</view>
        </view>
        <view class="move2" @click.stop="delete_rating(item.id,index)">
          <view class="bg-red">删除</view>
        </view>
      </view>
    </view>
    <p class='footer' v-if='booksArrnull && booksArrnull.length > 0'>
      --以下图书可对本馆进行荐购--
    </p>
    <view class="cu-list2 menu-avatar2">
      <view class="cu-item2" :class="modalName=='move-box-'+ index?'move-cur2':''" v-for="(item,index) in booksArrnull" :key="index"
            @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" :data-index="item" @click="toDetail(item.id)">
        <view class="cu-avatar2 xxl2" :style="[{backgroundImage: 'url(' + item.image + ')'}]" style="background-size:168rpx 200rpx;"></view>
        <view class="content2" style="margin-left: 60rpx">
          <view class="text-grey">{{item.title}}</view>
          <view class="text-gray text-sm">作者：{{item.author}}</view>
          <view class="text-orange text-df" v-if="item.rating||item.user_rating"><Rate :value="item.rating?item.rating:item.user_rating"></Rate>{{item.rating?item.rating:item.user_rating}}</view>
          <!--            :class = "[getRating(item.rating)?class9:class10]"></text>{{item.rating}}</view>-->
          <view class="text-gray text-sm" v-else>暂无评分</view>
        </view>
        <view class="action2">
          <view class="cu-tag round bg-grey sm">0</view>
        </view>
        <view class="move2" @click.stop="delete_rating(item.id,index)">
          <view class="bg-red">删除</view>
        </view>
      </view>
    </view>
    <p class='footer' v-if='booksArr'>
      暂时没有更多数据
    </p>


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
          <view class="action margin-0 flex-sub text-green solid-left" @tap="Topersonal">确定</view>
          <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
        </view>
      </view>
    </view>

  </div>
</template>

<script>
  import Rate from "../../components/newRate";
    export default {
        components:{
            Rate
        },
        props:['booksArr','booksArrnull'],
        data(){
            return {
                Random: [Math.ceil(Math.random()*5+0.1),Math.ceil(Math.random()*5+0.1),Math.ceil(Math.random()*5+0.1),Math.ceil(Math.random()*5+0.1),Math.ceil(Math.random()*5+0.1),Math.ceil(Math.random()*5+0.1)],
                listTouchDirection: null,
                modalName: null,
                booksArr:[],
                booksArrnull:[]
            }
        },
        methods:{
            toDetail(bookid){
                 // console.log(bookid)
                 // console.log(this.globalData.session.key)
                if (this.globalData.session.key == null){
                    this.modalName = 'DialogModal1'
                }else {
                    let that = this
                    wx.request({
                        url: 'http://book.zhangfanglue.top/user/index/browse',
                        method: 'POST',
                        data: {
                            book_id : bookid
                        }, header: {
                            'content-type': 'application/json',
                            'session': that.globalData.session.key
                        },
                        success: function (res) {
                            console.log(res.data)
                            // app.globalData.session = res.data.data.session3rd
                        }
                    })
                    wx.navigateTo({
                        url: '/pages/detail3/main?bookid=' + JSON.stringify(bookid)
                    })
                }
            },
            hideModal(e) {
                this.modalName = null
            },
            Topersonal(){
                wx.switchTab({
                    url:'/pages/newpersonal/main'
                })
            },
            // ListTouch触摸开始
            ListTouchStart(e) {
                this.listTouchStart = e.touches[0].pageX
                console.log('触摸开始')
            },

            // ListTouch计算方向
            ListTouchMove(e) {
                this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
                console.log('计算方向')
            },

            // ListTouch计算滚动
            ListTouchEnd(e) {
                try{
                    if (this.listTouchDirection == 'left'&&e.currentTarget.dataset.index.user_rating) {
                        this.modalName = e.currentTarget.dataset.target
                        console.log('方向为左')
                        console.log(e)
                        console.log(this.modalName)
                    } else {
                        this.modalName = null
                    }
                }catch (e) {
                    this.modalName = null
                }
                this.listTouchDirection = null
            },

            delete_rating(bookid,index){
                // wx.navigateBack({
                //
                //     delta:1
                // })
                // console.log(this.booksArr[0])
                // this.booksArr.splice(0,1)
                // console.log(this.booksArr)
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/get/deleteRating',
                    method: 'POST',
                    data: {
                       book_id: bookid
                    },
                    header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function (res) {
                        wx.showToast({
                            title: '成功删除评分',
                            icon: 'success',
                            duration: 1500
                        })
                        setTimeout(function () {
                            //要延时执行的代码
                            that.booksArr.splice(index,1)
                        }, 1000)
                        // if (getCurrentPages().length != 0) {
                        //     //刷新当前页面的数据
                        //     getCurrentPages()[getCurrentPages().length - 1].onShow();
                        //     console.log(that.booksArr)
                        //
                        // }
                    }
                })

            }
        },
        mounted(){
            console.log(this)
            if(this.$mp){
                this.booksArr = JSON.parse(this.$mp.query.booksArr)
            }
            try{
                if(!this.booksArr[0].rating){
                    wx.setNavigationBarTitle({title: '我的评分'})
                }

            }catch (e) {
                console.log('不是从我的评分跳转来的')
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #bookListContainer
    width :750rpx;
    overflow-x: hidden;
    .bookItem
      display flex
      padding 10rpx
      border-bottom 1rpx solid #eee
      img
        width 140rpx
        height 140rpx
        margin-right 20rpx
      .bookInfo
        width 52%
        font-size 30rpx
        line-height: 50rpx
        .book_title
          font-size 32rpx
          color #333

          white-space nowrap
          overflow hidden
          text-overflow ellipsis
        .book_author
          font-size 28rpx
          color #666
          //超出一行的部分用...代替
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
        .book_pub
          font-size 28rpx
          color #999
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
      .bookRating
        display inline-flex
        color  #D9D919
        font-size 30rpx
        font-weight bold
        width 130rpx
    .footer
      padding-top 30rpx
      text-align center
      font-size 25rpx
      margin 20rpx
      color #808080



  .cu-list2.menu-avatar2>.cu-item2 {
    position: relative;
    display: flex;
    padding-right: 10rpx;
    height: 250rpx;
    background-color: #ffffff;
    justify-content: flex-end;
    align-items: center
  }
  .cu-list2>.cu-item2 {
    transition: all .6s ease-in-out 0s;
    transform: translateX(0rpx)
  }
  .cu-list2.menu-avatar2>.cu-item2:after,
  .cu-list2.menu2>.cu-item2:after {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    border-bottom: 1rpx solid #ddd;
    border-radius: inherit;
    content: " ";
    transform: scale(.5);
    transform-origin: 0 0;
    pointer-events: none
  }

  .cu-list2.menu-avatar2>.cu-item2>.cu-avatar2 {
    position: absolute;
    left: 30rpx
  }

  .cu-avatar2.xxl2 {
    width: 168rpx;
    height: 200rpx;
    font-size: 3em;
  }

  .cu-avatar2 {
    font-variant: small-caps;
    margin: 0;
    padding: 0;
    display: inline-flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    color: #ffffff;
    white-space: nowrap;
    position: relative;
    width: 64rpx;
    height: 64rpx;
    background-size: cover;
    background-position: center;
    vertical-align: middle;
    font-size: 1.5em;
  }

  .cu-list2.menu-avatar2>.cu-item2 .content2 {
    position: absolute;
    left: 146rpx;
    width: calc(100% - 96rpx - 60rpx - 120rpx - 20rpx);
    line-height: 1.6em;
  }

  .cu-list2.menu-avatar2>.cu-item2 .content2>view:first-child {
    font-size: 30rpx;
    display: flex;
    align-items: center
  }

  .cu-list2.menu-avatar2>.cu-item2 .action2 {
    width: 100rpx;
    text-align: center
  }

  .cu-list2>.cu-item2.move-cur2 {
    transform: translateX(-130rpx)
  }

  .cu-list2>.cu-item2 .move2 {
    position: absolute;
    right: 0;
    display: flex;
    width: 130rpx;
    height: 100%;
    transform: translateX(100%)
  }

  .cu-list2>.cu-item2 .move2 view {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center
  }
</style>
