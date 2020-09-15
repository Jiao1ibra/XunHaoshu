<template>
  <div class='swiper'>
    <swiper
      :indicator-dots='true'
      indicator-color="pink"
      indicator-active-color="green"
      :autoplay='true'
      :interval='6000'
      :duration='1000'
      :circular='true'
    >
      <div :key='imgindex' v-for='(top,imgindex) in imgUrls'>
        <swiper-item>
          <img
            @click='bookDetail(img.id)'
            class='slide-image'
            mode='aspectFit'
            v-for='(img,index) in top'
            :key='index'
            :src="img.image"
          >
        </swiper-item>
      </div>
    </swiper>

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
    export default {
        props:['tops'],
        computed:{
            imgUrls(){
                // 如果通用 请用chunk函数  比如lodash的chunk方法
                let res = this.tops
                console.log([res.slice(0,3),res.slice(3,6),res.slice(6)])
                return [res.slice(0,3),res.slice(3,6),res.slice(6,9)]
            }
        },
        data(){
            return{
                modalName: null
            }
        },
        methods:{
            bookDetail(bookid){
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
            }
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.swiper
  margin-top 10rpx
  border-bottom 1rpx solid #eee
  .slide-image
    width 33%
    height 250rpx
</style>
