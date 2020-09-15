<template>
  <div class="container-card">
    <div class="header">{{title}}</div>
    <div class="content">
      <div class="book-row" v-for="(item, index) in bookData" :key="index">
        <div class="book-col" :style="{ flex: '0 0 ' + (100/ncols) + '%'}" v-for="(book, bookIndex) in item" :key="bookIndex">
          <div class="book-wrapper" :style="{ flexDirection: mode === 'col' ? 'column' : 'row' }"
               @click="onBookClick(book.id)" v-if="mode === 'col' || mode === 'row'">
            <image-card :src="book.image"></image-card>
            <div class="title-wrapper title-col" v-if="mode === 'col'">
              <div class="book-title">{{book.title}}</div>
            </div>
            <div class="title-wrapper title-row" v-else>
              <div class="book-title">{{book.title}}</div>
              <div class="title-author-wrapper">
                <!--                  <div class="book-title book-author"><span v-for="(author, aindx) in book.author" :key="aindx">{{author.name}}·</span></div>-->
                <div class="book-title book-author">{{book.publisher}}</div>
<!--                <div class="book-title book-author">{{book.title}}</div>-->
              </div>
            </div>
          </div>
          <div class="category-wrapper" v-else @click="onCategoryClick(book.tag)">
            <div class="category-text">{{book.tag}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <image-card :src="book.img_1"></image-card>
              </div>
              <div class="category-img2">
                <image-card :src="book.img_2"></image-card>
              </div>
            </div>
          </div>
        </div>
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
          为了保证您后续的操作，请授权登录
        </view>
        <view class="cu-bar bg-white">
          <view class="action margin-0 flex-sub text-green solid-left" @tap="Topersonal">确定</view>
          <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
        </view>
      </view>
    </view>

      <button class="more" @click="onMoreClick" v-show="showFooter&&btnText">{{btnText}}</button>
  </div>
</template>

<script>
    import ImageCard from './ImageCard'
    export default {
        name: 'ContainerCard',
        components: {ImageCard},
        props: {
            title: { type: String, default: '' },
            data: { type: Array, default: [] },
            btnText: { type: String, default: '' },
            nrows: { type: Number, default: 0 },
            ncols: { type: Number, default: 1 },
            mode: { type: String, default: 'row' },
            showTitle: { type: Boolean, default: true },
            showButton: { type: Boolean, default: true },
            linearBg: { type: Boolean, default: false },
            showFooter: {type: Boolean,default: true}
        },
        computed: {
            bookData () {
                const { data, nrows, ncols } = this
                if (data && data.length > 0) {
                    const number = nrows * ncols
                    const _bookData = data.slice(0, number)
                    const _bookDataRow = []
                    let _row = 0
                    while (_row < nrows) {
                        _bookDataRow.push(_bookData.slice(_row * ncols, (_row + 1) * ncols))
                        _row++
                    }
                    return _bookDataRow
                } else {
                    return []
                }
            }
        },
        data(){
          return{
              modalName: null
          }
        },
        methods: {
            onBookClick (bookid) {
                console.log(bookid)
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
            onCategoryClick(categorytag){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/book/index/findTagBooks',
                    method: 'GET',
                    data: {
                        tag: categorytag
                    },
                    header: {
                        'content-type': 'application/json',
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.data.statusCode == 500){
                            console.log(res)
                        }else if(res.data.statusCode == 200){
                            // console.log(res)
                            wx.navigateTo({
                                url:'/pages/bookList/main?booksArr='+JSON.stringify(res.data.data)
                            })
                        }
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
            },

            // tobookList(booksArr){
            //     console.log(booksArr)
            //     wx.navigateTo({
            //         url:'/pages/bookList/main?booksArr='+JSON.stringify(booksArr)
            //     })
            // },
            onMoreClick () {
                console.log(this.bookData)
                this.$emit('onMoreClick')
            },
            Topersonal(){
                wx.switchTab({
                    url:'/pages/newpersonal/main'
                })
            },
            hideModal(e) {
                this.modalName = null
            },
        }
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .container-card
    .header
      padding: 13px 0 0 20.5px
    .content
      padding: 0 12px
      margin-top: 10.5px
      .book-row
        display: flex
        flex-flow: row nowrap
        margin-top: 12px
        .book-col
          padding: 0 8px
          box-sizing: border-box
          .book-wrapper
            display: flex
            .title-wrapper
              &.title-col
                .book-title
                  font-size: 12px
                  color: #212731
                  line-height: 16.5px
                  max-height: 33px
                  font-weight: 500
                  overflow: hidden
                  word-break: break-word
              &.title-row
                flex: 0 0 50%
                padding: 10px
                display: flex
                flex-direction: column
                justify-content: space-between
                .book-title
                  font-size: 14px
                  color: #1F1F1F
                  line-height: 18px
                  max-height: 36px
                  overflow: hidden
                  word-break: break-word
                .book-author
                  font-size: 12px
                  color: #868686
                  line-height: 14px
                  max-height: 14px

          .category-wrapper
            position: relative
            display: flex
            flex-direction: column
            justify-content: space-between
            background: #F8F9FB
            border-radius: 10px
            height: 96px
            padding: 13px 0 14.5px 16px
            box-sizing: border-box
            .category-text
              width: 150px
              overflow: hidden
              text-overflow: ellipsis
              color: #212832
              font-size: 16px
              line-height: 22.5px
            .category-num
              color: #868686
              font-size: 12px
              line-height: 16.5px
            .category-img-wrapper
              position: absolute
              right: 0
              bottom: 0
              .category-img1
                position: absolute
                right: 0
                bottom: -5px
                z-index: 100
                width: 48px
                border-radius: 0 0 10px 0
                .img
                  border-radius: 0 0 10px 0
              .category-img2
                position: absolute
                right: 30px
                bottom: -5px
                z-index: 90
                width: 36px
    .more
      width: 50%
      margin-top: 35rpx;
      height 80rpx
      background-color: burlywood
      color: white
      border-radius: 98rpx
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
  .book-btn
        width: 100%
        font-size: 14px
        color: #3696EF
        border: 1px solid #EDEEEE
</style>

