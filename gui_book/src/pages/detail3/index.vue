<template>
    <div>
      <view class="cu-load load-modal" v-if="loadModal">
        <!-- <view class="cuIcon-emojifill text-orange"></view> -->
        <!--      <image src="/static/logo.png" mode="aspectFit"></image>-->
        <view class="gray-text">加载中...</view>
      </view>
      <BookInfo :info='bookItem' :star= 'bookstar' :like= 'booklike'></BookInfo>
    </div>
</template>

<script>
    import BookInfo from '@/components/BookInfo'
    export default {
        components:{
            BookInfo
        },
        data(){
            return{
              bookItem: {},
              bookId: 0,
              bookstar: 0,
              booklike: false,
              loadModal: true
            }
        },
        mounted(){
            console.log(this)
            // console.log(this.$mp.query.bookItem)
            // console.log(JSON.parse(this.$mp.query.bookItem))
            this.bookId = JSON.parse(this.$mp.query.bookid)
            this.loadModal = true
            let that = this
            wx.request({
                url: 'http://book.zhangfanglue.top/book/book/getSingleBook',
                method: 'GET',
                data: {
                    id : that.bookId
                },
                header: {
                    'content-type': 'application/json',
                    'session': that.globalData.session.key
                },
                success: function(res) {
                    console.log(res)
                    that.bookItem = res.data.data.message
                    that.bookstar = res.data.data.message.user_rating/2
                    that.booklike = res.data.data.message.user_collect
                    console.log(that.booklike)
                    wx.setNavigationBarTitle({
                        title:that.bookItem.title
                    })
                    that.loadModal = false
                },
                fail: function(err) {
                    console.log(err)
                }
            })
        },
        onShareAppMessage(){
            return{
                title:'寻好书'
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
