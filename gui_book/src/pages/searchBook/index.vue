<template>
    <div id="searchContainer">
      <div class="searchHeader">
        <input @confirm="handleSearch" confirm-type="搜索" v-model="searchContent" type="text" placeholder="书中自有黄金屋" placeholder-class="placeholder" auto-focus />
        <span class="clear" @click="handleClear" v-show="searchContent">X</span>
      </div>
      <BooksList :booksArr="booksArr"/>
    </div>
</template>

<script>
    import BooksList from '../bookList2/index'
    import request from '../../utils/request'
    export default {
        components:{BooksList},   //将整个searchBook作为一个子组件 命名为BooksList
        data(){
            return {
                searchContent: '',
                booksArr:[]
            }
        },
        methods:{
            handleClear(){
                this.searchContent = ''
            },
            async handleSearch(){
                // console.log('ok')
                let data = {key:this.searchContent}

                console.log(data)
                // let result = await request('/searchBooks',data)
                let result = await request('/book/list',data)
                console.log(result,'返回的结果数据')
                this.booksArr = result.data
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#searchContainer
  .searchHeader
    width 80%
    height 80rpx
    margin auto
    border-bottom 1rpx solid #02a774
    position relative
    input
      height 100%
      width 100%
      text-align center
      .placeholder
        color #02a774
        text-align center
        font-size 28rpx
    .clear
      position absolute
      right 20rpx
      top 20rpx
      z-index 2
</style>
