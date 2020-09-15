<template>
  <div id="detailContainer">
    <div class="bookInfo">
      <h1>{{bookItem.title}}</h1>
      <img :src="bookItem.cover" alt="">
      <div class="info">
        <p>作者：{{bookItem.author}}</p>
        <p>出版社：{{bookItem.press}}</p>
        <p>出版日期：{{bookItem.date}}</p>
        <p>定价：{{bookItem.price}}</p>
      </div>
    </div>
    <button class="shareBtn" open-type="share">分享给好友</button>
    <div class="content">
      <article>
        <h2>作者简介</h2>
        <section>
          {{bookDetail.author_intro}}
        </section>
      </article>
      <article>
        <h2>内容简介</h2>
        <section>
          {{bookDetail.content_intro}}
        </section>
      </article>
    </div>
  </div>
</template>

<script>
    import request from '../../utils/request'
    export default {
        data(){
            return {
                bookItem: {},
                bookDetail: {}
            }
        },
        methods:{
          async handleDetail(data){
              console.log(data)
              let result = await request('/book/detail',data)
              console.log(result,'返回的结果数据')
              this.bookDetail = result.data
          }
        },
        mounted(){
            console.log(this)
            // console.log(this.$mp.query.bookItem)
            // console.log(JSON.parse(this.$mp.query.bookItem))
            this.bookItem = JSON.parse(this.$mp.query.bookItem)
            wx.setNavigationBarTitle({
                title:this.bookItem.title
            })
            // console.log(this.bookItem.cover_link)
            this.handleDetail({url:this.bookItem.cover_link})

        },
        onShareAppMessage(event){
            console.log(event)
            return{
                title:'邀您一起体验济大书馆',
                path:'/pages/index/main',
                imageUrl:'/static/imgs/firstView/nvsheng.jpg'
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #detailContainer
    .bookInfo
      display flex
      flex-direction column
      h1
        text-align center
        font-size 40rpx
        font-weight bold
        margin 10rpx 0
      img
        margin 0 auto
        width 70%
        height 700rpx
      .info
        margin-left 15%
        p
          line-height 50rpx
    .shareBtn
      width 300rpx
      height 80rpx
      line-height 80rpx
      text-align center
      margin 20rpx auto
    .content
      margin 30rpx 100rpx
      article
        margin-top 50rpx
        h2
          font-size 30rpx
          font-weight bold
          color #02a774
          text-align center
        section
          font-size 28rpx
          text-indent 28rpx
</style>
