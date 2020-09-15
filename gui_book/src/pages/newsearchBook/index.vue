<template>
  <div class="container1">
    <dl class="ub-box ub-col">
<!--      <dd class="z-width-100-percent z-padding-all-8-px z-bg-color-fff ub-box ub-ver z-box-sizing-border" style="height: 150rpx">-->
<!--        <div class="ub-flex-1 search ub-box ub-ver-v" style="height: 80rpx">-->
<!--          <i class="iconfont icon-sousuo z-color-666 z-font-size-16"></i>-->
<!--          <input v-model="searchVal" @input="doInput" @confirm="doSearch" class="ub-flex-1 z-font-size-16 z-color-666 z-padding-v-5-px z-margin-left-8-px" placeholder="搜索关键字" :focus="focus" />-->
<!--        </div>-->
<!--        <span @click.stop="onClearClick" class="z-font-size-14 z-margin-left-8-px" style="color:#06c1ae">取消</span>-->
<!--      </dd>-->
      <dd>
        <view class="box">
          <view class="cu-bar bg-white">
            <view class="search-form round">
              <text class="cuIcon-search"></text>
              <input :focus="focus" @input="doInput" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search" v-model="searchVal" @confirm="doSearch"></input>
            </view>
            <view class="action">
              <button class="cu-btn bg-green shadow-blur round" @click.stop="onClearClick">取消</button>
            </view>
          </view>
        </view>
      </dd>
      <!--搜索值不为空的时候，显示搜索列表-->
      <div v-if="searchVal.length>0" class="ub-box ub-col" style="padding:8px 8px 0 8px">
        <scroll-view scroll-y style="height: calc(100vh - 80px)" scroll-top="0">
          <ul class="ub-box ub-col" v-if="showsearch">
<!--            <li @click.stop="clickSearchItem(val)" v-if="currSearchList.length>0" class="search-item ub-box ub-ver z-box-sizing-border" v-for="(val, i) in currSearchList" :key="i">-->
<!--              <i class="iconfont icon-sousuo z-color-999 z-font-size-16 z-margin-right-10-px"></i>-->
<!--              <p class="ub-flex-1 z-color-333 z-font-size-14">{{val.title}}</p>-->
<!--            </li>-->
            <li @click.stop="clickSearchItem(searchVal)" v-if="currSearchList.length===0" class="search-item ub-box ub-ver z-box-sizing-border">
              <i class="iconfont icon-sousuo z-color-999 z-font-size-16 z-margin-right-10-px"></i>
              <p class="ub-flex-1 z-color-333 z-font-size-14">搜索"{{searchVal}}"</p>
              <i class="iconfont icon-xiayiyeqianjinchakangengduo z-color-999 z-font-size-16"></i>
            </li>
          </ul>
          <BooksList2 :booksArr="currSearchList" :booksArrnull="currSearchListnull" v-if="!showsearch&&!shownone" />
          <div class="container2 ub-box" v-show="shownone">
            <dl class="ub-box ub-col ub-ver z-width-100-percent" style="background:#fff">
              <i class="z-margin-bottom-20-px iconfont icon-jijianfasong z-font-size-60" style="color:#06c1ae"></i>
              <span class="z-font-size-15 z-color-888">正在采购相关图书...</span>
            </dl>
          </div>
        </scroll-view>
      </div>
      <!--搜索值为空的时候，显示猜你想找和历史搜索-->
      <div v-if="searchVal.length===0" class="ub-box ub-col">
        <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-15-px ub-box">
          <p class="z-font-size-15 z-color-888">猜你想找</p>
        </dd>
        <dd class="z-margin-h-10-px z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box">
          <ul class="ub-box ub-wrap">
            <li @click.stop="clickSearchItem(val.title)" v-for="(val, idx) in guess" :key="idx" class="item z-font-size-13 z-color-333">{{val.title}}</li>
          </ul>
        </dd>
        <dd class="z-margin-h-8-px z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-15-px ub-box ub-between">
          <p class="z-font-size-15 z-color-888">历史搜索</p>
        </dd>
        <dd class="z-margin-h-10-px z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box">
          <ul class="ub-box ub-wrap">
            <li @click.stop="clickSearchItem(val.name)" v-for="(val, idx) in history" :key="idx" class="item z-font-size-13 z-color-333">{{val.name}}</li>
          </ul>
        </dd>
      </div>
    </dl>
    <view class="cu-load load-modal" v-if="loadModal">
      <!-- <view class="cuIcon-emojifill text-orange"></view> -->
<!--      <image src="/static/logo.png" mode="aspectFit"></image>-->
      <view class="gray-text">加载中...</view>
    </view>
  </div>
</template>
<script>

    import css from './common.css'
    import BooksList2 from '../bookList2/index'
    export default {
        components:{BooksList2},
        data () {
            return {
                loadModal: false,
                searchVal: '',
                showsearch: true,
                shownone: false,
                focus: {
                    type: Boolean, default: true
                },
                // 测试搜索结果集
                // searchAllList: [
                //     {id: '1', val: '我呀便当', num: '7'},
                //     {id: '2', val: '我家黑鱼馆', num: '5'},
                //     {id: '3', val: '我家酸菜鱼', num: '3'},
                //     {id: '4', val: '我家厨房', num: '1'},
                //     {id: '5', val: '我家吃铺', num: '1'},
                //     {id: '6', val: '我的店', num: '2'},
                //     {id: '7', val: '我爱水果', num: '3'},
                //     {id: '8', val: '我家美蛙鱼头', num: '1'},
                //     {id: '9', val: '我家黑鱼', num: '2'},
                //     {id: '10', val: '我的巧克力', num: '1'},
                //     {id: '11', val: '我的公寓', num: '1'},
                //     {id: '12', val: '我香我逸西餐厅', num: '1'},
                // ],
                currSearchList: [], // 当前根据搜索关键词搜索到的列表
                currSearchListnull: [],
                guess: [
                    // {goodId: '1', name: '北京欢乐谷'}, {goodId: '2', name: '故宫博物院'},
                    // {goodId: '3', name: '北京野生动物园'}, {goodId: '4', name: '古北水镇'},
                    // {goodId: '5', name: '八达岭长城'}, {goodId: '6', name: '北京海洋馆'},
                    {title: '百年孤独'},
                    {title: '猫的摇篮'},
                    {title: '宇宙尽头的餐馆'},
                    {title: '生命，宇宙以及一切'},
                    {title: '2666'}
                ],
                history: [
                    // {goodId: '6', name: '北京海洋馆'},
                    // {goodId: '3', name: '北京野生动物园'},
                    {name: '小王子'},
                    {name: '哈利波特'},
                    {name: '刘慈欣'}
                ]
            }
        },
        methods: {
            doInput(e) {
                this.showsearch = true
                this.shownone = false
                this.currSearchList = []
                // this.filterList()
            },
            doSearch(e) {
                // let i = this.history.length
                // this.history[i] = {name:this.searchVal}
                this.loadModal = true;
                this.focus = false
                this.history.splice(0,0,{name:this.searchVal})
                if(this.history.length == 9)
                    this.history.pop()
                // v.this.history.push({name: 'Taobaosss' });
                this.showsearch = false
                console.log(this.globalData.session)
                // this.searchVal = e.mp.detail.value
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/book/index/search',
                    method: 'GET',
                    data: {
                      message: that.searchVal
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        that.loadModal = false
                        console.log(res)
                        if (res.data.statusCode == 500){
                            // wx.navigateTo({
                            //     url:'/pages/error/main'
                            // })
                            that.shownone = true
                            // console.log("无图书")
                        }else if(res.data.statusCode == 200){
                            console.log(res.data.data.book_list)
                            that.currSearchList = res.data.data.book_list
                            that.currSearchListnull = res.data.data.book_list_after
                        }
                    },
                    fail: function(err) {
                        that.loadModal = false
                        console.log(err)
                    }
                })
            },
            // filterList() {
            //     this.currSearchList = this.searchAllList.filter(item => {
            //         if (item.val.indexOf(this.searchVal) >= 0) return item
            //     })
            // },
            clickSearchItem(val) {
                // this.showsearch = false
                this.searchVal = val
                this.doSearch()

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
                            that.guess = res.data.data
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
            },
            obtainRecommendBooks_2(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/book/index/guessLikeWithOutSession',
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
                            that.guess = res.data.data
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
            },
            onClearClick () {
                this.searchVal = ''
                this.focus = true
            }
        },
        mounted() {
            this.searchVal = ''
            if (this.globalData.session.key)
                this.obtainRecommendBooks()
            else
                this.obtainRecommendBooks_2()
            // this.currSearchList = JSON.parse(JSON.stringify(this.searchAllList))
        },
        onShow() {
            this.focus = true
            wx.setNavigationBarTitle({title: '搜索图书'})
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .container1
    padding-top 50rpx
    width:100%
    height:100vh
    background:#fff
    .container2
      width 100%
      height 700rpx
      background #fff
  .search
    background: #f5f5f5
    border-radius: 15px
    padding: 0 10px
  .search-item
    border-bottom: 1px solid #eee
    padding: 15px 0px
  .item
    padding: 8px 10px
    background: #f5f5f5
    border-radius: 3px
    margin: 0 8px 8px 0
  .box
    margin: 20rpx 0
    .cu-bar
      margin-top: 20rpx;
</style>

