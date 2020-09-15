<template>
  <div class='bookinfo'>
    <div class="thumb">
      <img class='back'
           :src="info.image"
           mode='aspectFill'>
      <img class="img"
           :src="info.image"
           mode='aspectFit'
      >
      <div class="info">
        <div class="title">
          {{info.title}}
        </div>
        <div class="author">
          {{info.author}}
        </div>
      </div>
    </div>
    <div class="detail">
      <p class="bookRating text-orange text-df align-center">评分：{{info.rating}}&nbsp;<Rate :value="info.rating"></Rate></p>
      <div class="right">
        {{info.publisher}}
      </div>
    </div>
    <div class="detail">
      <div class="right">
        {{info.pubdate}}
      </div>
    </div>
    <div class="detail"></div>
    <div class="share" v-if="!info.after">
<!--    <p class="de_p" @click="onCollection">aa</p>-->
    <div class="collect" @click="onCollection">
    <img :src="like?likeb:likea"/>
    <p>收藏</p>
    </div>
    <button open-type='share' class="shareBtn">转发给好友</button>
    </div>
    <div v-else>
      <button class="btn2" @click='recommendbuy(info.id)'>
        推荐进购该图书
      </button>
    </div>
    <div class="title2">
      内容简介
    </div>
    <div class="summary">
<!--      <p :key='i' v-for='(sum,i) in info.summary'>{{sum}}</p>-->
      <p v-html="content">{{info.summary}}</p>                      <!-- 此处text时p改过来的 -->
    </div>
    <div class="title2">
      评论
    </div>
<!--    <CommentList :comments="comments"></CommentList>-->
    <div class="comment">
<!--    <div class="comment" v-if="showAdd">-->
<!--      <textarea v-model='comment'-->
<!--                class='textarea'-->
<!--                :maxlength='100'-->
<!--                placeholder='请输入图书短评'>-->
<!--      </textarea>-->
<!--      <div class='location'>-->
<!--        地理位置：-->
<!--        <switch color='#02a774' :checked='location' @change='getGeo'></switch>-->
<!--        <span class='text-primary'>{{location}}</span>-->
<!--      </div>-->
<!--      <div class='phone'>-->
<!--        手机型号：-->
<!--        <switch color='#02a774' :checked='phone' @change='getPhone'></switch>-->
<!--        <span class='text-primary'>{{phone}}</span>-->
<!--      </div>-->
      <div style="color: white">为了使评论底部有空白</div>
      <div v-if="!info.after">
      <p class="ratetext">{{rateScoreText}}</p>
      <ul class="StarsWrap">
        <li v-for="(i,index) in list" :key="index" @click="clickStars(index)">
          <img :src="star>index?stara:starb"/>
        </li>
      </ul>
<!--      <p class="ratetext" v-show="ratetext">{{rateScoreText}}</p>-->
      <button class="btn2" @click='addComment'>
        评分
      </button>
      </div>
      <div style="color: white">为了使评论底部有空白</div>
    </div>
<!--    <div v-else class='text-footer'>-->
<!--      未登录或者已经评论过啦-->
<!--    </div>-->
  </div>
</template>

<script>
    import star from '../../static/imgs/star/star.png'
    import star2 from '../../static/imgs/star/star_1.png'
    import heart1 from '../../static/imgs/detail/heart.png'
    import heart2 from '../../static/imgs/detail/heart_1.png'
    import Rate from '@/components/newRate'
    import CommentList from '@/components/CommentList'
    export default {
        components: {
            Rate
        },
        data(){
            return{
              ratetext:false,
              comments:'',
              comment:'',
              location:'',
              phone:'',
              rateScoreText: '',
              rateScoreDesc: ['差', '一  般', '还  不  错', '很  满  意', '强  烈  推  荐','点亮您的小星星'],
              stara:star,//亮星星
              list:[0,1,2,3,4],
              starb:star2,//暗星星
              likea:heart1,
              likeb:heart2
            }
        },
        props: ['info','star','like'],
        computed: {
            userinfo () {
                return this.info.user_info || {}
            }
        },
        methods:{
            addComment () {
                if(this.star == 0){
                    wx.showModal({
                        title: '温馨提示',
                        content: '请点亮您的小星星',
                        showCancel: false//是否显示取消按钮
                    })
                }else{
                    let that = this
                    wx.request({
                        url: 'http://book.zhangfanglue.top/book/book/rating',
                        method: 'POST',
                        data: {
                            book_id: that.info.id,
                            rating: that.star *2
                        },
                        header: {
                            'content-type': 'application/json',
                            'session': that.globalData.session.key
                        },
                        success: function(res) {
                            console.log(res)
                            if (res.data.statusCode == 500){
                                console.log(res)
                                wx.showToast({
                                    title: '评分失败',
                                    icon: 'loading',
                                    duration: 2000
                                })
                            }else if(res.data.statusCode == 200){
                                console.log(res)
                                wx.showToast({
                                    title: '成功评分',
                                    icon: 'success',
                                    duration: 2000
                                })
                            }
                        },
                        fail: function(err) {
                            console.log(err)
                        }
                    })
                }
            },
            onCollection(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/index/collect',
                    method: 'POST',
                    data: {
                        book_id: that.info.id,
                    },
                    header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.data.statusCode == 201){
                            console.log(res)
                            that.like = 0
                            wx.showToast({
                                title: '取消收藏',
                                icon: 'loading',
                                duration: 2000
                            })
                        }else if(res.data.statusCode == 200){
                            that.like = 1
                            console.log(res)
                            wx.showToast({
                                title: '成功收藏',
                                icon: 'success',
                                duration: 2000
                            })
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
            },
            getGeo (e) {
                // RmKXCpjKlwyFUVVXSCXcLF4KUsOimuuy
                const ak = 'MlWqjxU0eitIuLzRS0CqoGQ5fiPjdmM6'
                let url = 'http://api.map.baidu.com/reverse_geocoding/v3/'

                if (e.target.value) {
                    wx.getLocation({
                        success: geo => {
                            wx.request({
                                url,
                                data: {
                                    ak,
                                    location: `${geo.latitude},${geo.longitude}`,
                                    output: 'json'
                                },
                                success: res => {
                                    console.log(res)
                                    if (res.data.status === 0) {
                                        this.location = res.data.result.addressComponent.province+res.data.result.addressComponent.city
                                    } else {
                                        this.location = '未知地点'
                                        // console.log('出错了')
                                    }
                                }
                            })
                        }
                    })
                } else {
                    this.location = ''
                }
            },
            getPhone (e) {
                console.log('手机型号获取种')
                if (e.target.value) {
                    const phoneInfo = wx.getSystemInfoSync()
                    // console.log(phoneInfo)
                    this.phone = phoneInfo.model
                } else {
                    // 没选中
                    this.phone = ''
                }
            },
            clickStars(i){
                this.ratetext = true
                this.rateScoreText=this.rateScoreDesc[i]
                this.star = i+1
                console.log("点击了"+(i+1)+"颗星")
            },
            recommendbuy(bookid){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/index/recommendBuy',
                    method: 'POST',
                    data: {
                        book_id: that.info.id,
                    },
                    header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.data.statusCode == 500){
                            console.log(res)
                            wx.showToast({
                                title: '已荐购,请等待',
                                icon: 'loading',
                                duration: 2000
                            })
                        }else if(res.data.statusCode == 200){
                            console.log(res)
                            wx.showToast({
                                title: '成功荐购',
                                icon: 'success',
                                duration: 2000
                            })
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
            }
        },
        updated(){
            if(this.star == 0)
                this.rateScoreText=this.rateScoreDesc[5]
            else
                this.rateScoreText=this.rateScoreDesc[this.star-1]
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .bookinfo
    font-size: 14px
    .btn2
      color white
      background #02a774
      margin-bottom 50rpx
      padding-left 15px
      padding-left 15px
      border-radius 2px
      font-size 16px
      line-height 40px
      height 40px
      width 60%
      border-radius 98rpx
      margin-top 30rpx
    .shareBtn
      color:white
      background:#02a774
      width 300rpx
      height 80rpx
      line-height 80rpx
      text-align center
      display inline-block
    .comment
      margin-top 20rpx
      .ratetext
        margin 20rpx auto
        margin-bottom 0
        text-align center
        height 40rpx
        line-height 40rpx
        font-size 30rpx
        color #666
      .btn2
          color white
          background #02a774
          margin-bottom 50rpx
          padding-left 15px
          padding-left 15px
          border-radius 2px
          font-size 16px
          line-height 40px
          height 40px
          width 80%
          border-radius 98rpx
          margin-top 30rpx
      .StarsWrap
        width: 100%
        height 50rpx
        margin-top 20rpx
        li:first-child
          margin-left 175rpx
        li:last-child
          margin-right 100rpx
        li
          float left
          margin-left 40rpx
          img
            height 50rpx
            width 50rpx
      .textarea
        width:730rpx
        height:200rpx
        background:#eee
        padding:10rpx
      .location
        margin-top:10px
        padding:5px 10px
      .phone
        margin-top:10px
        padding:5px 10px
    .badge
      display inline-block
      margin 5px
      padding 5px
      border-radius 10px
      border 1px #EA5A49 solid
      color #EA5A49
    .title2
      margin-top 20rpx
      background-color #f5f5dc
      text-align center
      color #ffd200
      margin-bottom 20rpx
    .summary
      padding:0 15px
      p
        line-height 25px
        text-indent  2em
        font-size 14px
        white-space pre-wrap
    .right
      float  right
    .share
      text-align center
      margin 75rpx auto
      .collect
        margin-left 80rpx
        display inline-flex
        float left
        border solid 2px
        border-color lightcoral
        border-radius 15%
        padding 15rpx
        img
          height 45rpx
          width 45rpx
        p
          font-size 30rpx
          font-weight bold
          color lightcoral
          padding-left 10rpx
    .detail
      padding 5px 10px
      .avatar
        width 20px
        height 20px
        border-radius 50%
        vertical-align middle
      .bookRating
        display inline-flex
        font-weight bold
    .thumb
      width 750rpx
      height:500rpx
      overflow:hidden
      position: relative
      .back
        filter: blur(15px)
        width:100%
      .img
        position: absolute
        width:100%
        height:300rpx
        left:0
        top:30rpx
      .info
        color:white
        position: absolute
        width:100%
        left:0
        top:330rpx
        text-align: center
        .title
          font-size:20px
        .author
          font-size: 14px
</style>
