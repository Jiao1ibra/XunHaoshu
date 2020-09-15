<script>

    export default {
        Exceed: 0,
        UserBookClassification: [],
        UserLike: [],
        methods:{
            getExceedNum(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/get/getUserNo',
                    method: 'GET',
                    data: {}, header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function (res) {
                        if (res.data.statusCode == 200) {
                            that.Exceed = res.data.data.num
                        }
                        // app.globalData.session = res.data.data.session3rd
                    }
                })
            },
            getUserBookClassification(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/get/userRating',
                    method: 'GET',
                    data: {}, header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function (res) {
                        if (res.data.statusCode == 200) {
                            console.log(res)
                            that.UserBookClassification = res.data.data
                            that.charts();
                        }
                        // app.globalData.session = res.data.data.session3rd
                    }
                })
            },
            getUserLike(){
                let that = this
                wx.request({
                    url: 'http://book.zhangfanglue.top/user/get/getUserRatingAve',
                    method: 'GET',
                    data: {}, header: {
                        'content-type': 'application/json',
                        'session': that.globalData.session.key
                    },
                    success: function (res) {
                        if (res.data.statusCode == 200) {
                            console.log(res)
                            that.UserLike = res.data.data
                        }
                        // app.globalData.session = res.data.data.session3rd
                    }
                })
            },
            init(){
                this.getExceedNum()
                this.getUserBookClassification()
                this.getUserLike()
            }
        }
    }
</script>

