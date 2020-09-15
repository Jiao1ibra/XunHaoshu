<template>
    <div id="indexContainer">
<!--      <swiper indicator-dots indicator-color="pink" indicator-active-color="green" circular>-->
<!--        <swiper-item @click="toDetail(item)" v-for="(item,index) in carouel" :key="index">-->
<!--          <img :src="item.image">-->
<!--        </swiper-item>-->
<!--      </swiper>-->

<!--      <div class="booksList">-->
<!--        <div @click="tobookList(booksArr)" class="listNav">-->
<!--          <span>全部商品</span>-->
<!--          <span class="more"> > </span>-->
<!--        </div>-->
<!--        <div class="list">-->
<!--          <div @click="toDetail(item)" class="bookItem" v-for="(item,index) in booksArr" :key="index">-->
<!--            <img :src="item.image">-->
<!--            <p>《{{item.title}}》</p>-->
<!--            <p>{{item.author}}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div v-if="!type" class="list">
        <div @click="toDetail(item.id)" class="bookItem" v-for="(item,index) in booksArr" :key="index">
          <img :src="item.image">
          <p>{{item.title}}</p>
        </div>
      </div>
      <div v-else class="list">
        <div @click="toDetail(item.id)" class="bookItem2" v-for="(item,index) in booksArr" :key="index">
          <img :src="item.image">
          <p>{{item.title}}</p>
        </div>
      </div>
      <p class='footer' v-if='!more'>
        暂时没有更多数据
      </p>
    </div>

</template>

<script>
    // import datas from './datas/data.json'
    // console.log(datas,typeof datas)
    export default {
        data(){
            return{
                booksArr: [],
                type: 0,
                more:true
            }
        },
        // computed:{
        //     carouel(){
        //         return [...this.booksArr].splice(0,4)
        //     }
        // },
        methods:{
            toDetail(bookid){
                // console.log(bookid)
                // console.log(this.globalData.session.key)
                // if (this.globalData.session.key == null){
                //     wx.showModal({
                //         title: '温馨提示',
                //         content: '为了保证您后续的操作，请授权登录',
                //         showCancel: true,//是否显示取消按钮
                //
                //         success (res) {
                //             if (res.confirm) {
                //                 wx.switchTab({
                //                     url: '/pages/personal/main'
                //                 })
                //             } else if (res.cancel) {
                //                 // console.log('用户点击取消')
                //             }
                //         }
                //     })
                // }else {

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
                // }
            }
            // tobookList(booksArr){
            //     wx.navigateTo({
            //         url:'/pages/bookList/main?booksArr='+JSON.stringify(booksArr)
            //     })
            // }
        },
        onPullDownRefresh(){
            console.log('下拉')
            wx.showNavigationBarLoading()
            setTimeout(function (){wx.stopPullDownRefresh();wx.hideNavigationBarLoading()},1000)
        },
        onReachBottom(){
            this.more = false
        },
        mounted(){
            console.log(this)
            if(this.$mp){
                this.booksArr = JSON.parse(this.$mp.query.booksArr)
                this.type = JSON.parse(this.$mp.query.type)
            }
            if(this.type == 0)
                wx.setNavigationBarTitle({title: '我的足迹'})
            else if(this.type == 1)
                wx.setNavigationBarTitle({title: '我的收藏'})
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #indexContainer
      .list
        display flex
        flex-wrap wrap
      .bookItem
        width 30%
        display flex
        flex-direction column
        align-items center
        border-bottom 1rpx solid #eee
        margin auto
        &:nth-child(3n+1)
          border-right 1rpx solid #eee
        &:nth-child(3n+2)
          border-right 1rpx solid #eee
        box-sizing border-box
        image
          width 200rpx
          height 200rpx
          margin 15rpx 0
        p
          font-size 24rpx
          line-height 50rpx
      .bookItem2
        width 50%
        display flex
        flex-direction column
        align-items center
        border-bottom 1rpx solid #eee
        margin auto
        &:nth-child(2n+1)
          border-right 1rpx solid #eee
        box-sizing border-box
        image
          width 200rpx
          height 200rpx
          margin 15rpx 0
        p
          font-size 24rpx
          line-height 50rpx
    .footer
      text-align center
      font-size 25rpx
      margin 20rpx
      color #808080
</style>
