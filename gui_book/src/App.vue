<script>
  import request from "./utils/request";
    export default {
        // mounted(){
        //     wx.login({
        //         success:async (res) => {
        //             let code = res.code
        //             console.log(code)
        //             let result = await request('/getOpenId',{code})
        //         }
        //     })
        // }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../colorui/main.css";
  @import "../colorui/icon.css";

  page
    width 100%
    height 100%
  .btn1
    color:white
    background:#02a774
    margin-top 10px
    margin-bottom: 10px
    padding-left: 15px
    padding-left: 15px
    border-radius: 2px
    font-size: 16px
    line-height: 40px
    height: 40px
    width: 100%
  .text-footer{
    text-align: center
    font-size: 12px
    margin-bottom:5px
  }
  .text-primary{
    color:#02a774
  }
</style>
