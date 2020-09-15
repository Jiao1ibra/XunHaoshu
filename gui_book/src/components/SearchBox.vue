<template>
  <div class="search-bar">
    <div class="search-bar-wrapper">
      <input
        class="search-bar-input"
        :maxlength="limit"
        :placeholder="hotSearch.length === 0 ? '搜索关键字' : hotSearch"
        placeholder-style="color: #ADB4BE"
        v-model="searchWord"
        @input="onChange"
        confirm-type="search"
        @confirm="onSearchConfirm"
      />
      <span @click="onClearClick" v-show="searchWord">X</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBox',
    props: {
      focus: {
        type: Boolean, default: false
      },
      limit: {
        type: Number, default: 50
      },
      hotSearch: {
        type: String, default: ''
      }
    },
    data () {
      return {
        searchWord: ''
      }
    },
    methods: {
      onSearchBoxClick () {
        this.$emit('onClick')
      },
      onClearClick () {
        this.searchWord = ''
        this.$emit('onClear')
      },
      onChange (e) {
        // console.log(e)
        const { value } = e.mp.detail
        this.$emit('onChange', value)
      },
      onSearchConfirm (e) {
        // console.log(e)
        const { value } = e.mp.detail
        console.log("ok")
        this.$emit('onClick')
        this.$emit('onConfirm', value)
      },
      setValue (value) {
        this.searchWord = value
      },
      getValue () {
        return this.searchWord
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search-bar
    padding: 15px 15.5px
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
     .search, .clear
       display: flex
       align-items: center
       height: 100%
</style>
