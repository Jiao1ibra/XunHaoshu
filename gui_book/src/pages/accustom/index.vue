<template>
  <div style="height:100%; width: 100%;">
    <swiper style="height:100%; width: 100%;" autoplay circular duration="1000" vertical="true" class="text-center">
      <swiper-item>
        <div style="color: white">aaa</div>
        <div style="color: white">bbb</div>
        <text class="text-bold text-xxl text-cyan" style="margin-top: 100rpx">阅读分类</text>
        <div style="color: white">aaa</div>
        <div style="color: white">bbb</div>
        <div style="color: white">ccc</div>
        <div style="margin:0 auto;width:375px;">
          <canvas canvas-id="canvas1" style="margin: auto;padding-top: 500rpx"></canvas>
        </div>
      </swiper-item>
      <swiper-item>
        <div style="color: white">aaa</div>
        <div style="color: white">bbb</div>
        <text class="text-bold text-xxl text-cyan" style="margin-top: 100rpx">阅读趋势</text>
        <div style="color: white">aaa</div>
        <div style="color: white">bbb</div>
        <div style="color: white">ccc</div>
        <div style="color: white">ddd</div>
        <div style="margin:0 auto;width:375px;">
          <canvas canvas-id="canvas3" style="margin: auto"></canvas>
        </div>
      </swiper-item>
      <swiper-item>
        <div style="color: white">aaa</div>
        <div style="color: white">bbb</div>
        <text class="text-bold text-xxl text-cyan" style="margin-top: 100rpx">我的喜好</text>
        <div style="color: white">aaa</div>
        <div style="margin:0 auto;width:375px;">
          <canvas canvas-id="canvas6" style="height: 400rpx"></canvas>
        </div>
        <div style="color: white">aaa</div>
        <div style="color: white">bbb</div>
        <text class="text-bold text-xxl text-cyan" style="margin-top: 100rpx">借阅分析</text>
        <div style="color: white">aaa</div>
        <div class="text-xl" style="float: left;text-indent: 150rpx">在所有读者中</div>
        <div style="color: white">bbb</div>
        <div class="text-lg"style="float: left">排在<text class="text-xl text-orange">{{Exceed}}</text>的人之前</div>
        <div style="color: white">bbb</div>
        <div style="color: white">ccc</div>
        <view class="padding bg-white">
          <view class="cu-progress round sm striped active" style="height: 50rpx">
            <view class="bg-green" :style="[{ width:true?Exceed:''}]"></view>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="cu-load load-modal" v-if="loadModal">
      <!-- <view class="cuIcon-emojifill text-orange"></view> -->
      <!--      <image src="/static/logo.png" mode="aspectFit"></image>-->
      <view class="gray-text">加载中...</view>
    </view>
  </div>
</template>

<script>
    import wxCharts from '../../utils/wxcharts'
    export default {
        data(){
            return{
                Exceed: 0,
                UserBookClassification: [],
                UserLike: [],
                UserRecently: [],
                loadModal: false
            }
        },
        methods: {
            charts() {
                new wxCharts({
                    animation: true,
                    canvasId: 'ringCanvas',
                    type: 'ring',
                    extra: {
                        ringWidth: 15,
                        pie: {
                            offsetAngle: -90
                        },
                    },
                    subtitle: {
                        fontSide: 16
                    },
                    series: [{
                        name: '成交量1',
                        data: 15,
                        stroke:false
                    }, {
                        name: '成交量2',
                        data: 35,
                    }, {
                        name: '成交量3',
                        data: 78,
                    }],
                    width: 375,
                    height: 200,
                    dataLabel: false,
                });
                new wxCharts({
                    animation: false,
                    canvasId: 'canvas1',
                    type: 'pie',
                    series: [{ name: this.UserBookClassification[0]['tag'], data: this.UserBookClassification[0]['num'] }, { name: this.UserBookClassification[1]['tag'], data: this.UserBookClassification[0]['num'] },
                              { name: this.UserBookClassification[2]['tag'], data: this.UserBookClassification[2]['num'] }, { name: this.UserBookClassification[3]['tag'], data: this.UserBookClassification[3]['num'] },
                              { name: this.UserBookClassification[4]['tag'], data: this.UserBookClassification[4]['num'] }, { name: this.UserBookClassification[5]['tag'], data: this.UserBookClassification[5]['num'] }],
                    width: 375,
                    height: 300,
                    dataLabel: true,
                });
                new wxCharts({
                    canvasId: 'canvas2',
                    dataPointShape: "circle",
                    type: 'line',
                    extra: {
                        lineStyle: 'curve' //线条的形状（弧形）
                    },
                    categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
                    series: [{
                        name: '成交量1',
                        data: [0.15, null, 0.45, 0.37, 0.4, 0.8],//设置某一个值为null会出现断层
                        format: function (val) {
                            return val.toFixed(2) + '万';
                        }
                    }, {
                        name: '成交量2',
                        data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94],
                        format: function (val) {
                            return val.toFixed(2) + '万';
                        }
                    }],
                    yAxis: {
                        title: '成交金额 (万元)',
                        format: function (val) {
                            return val.toFixed(2);
                        },
                        fontColor: "green",
                        titleFontColor: "green",
                        min: 0,
                        gridColor:"green"
                    },
                    width: 300,
                    height: 300,
                    dataLabel: true
                });
                new wxCharts({
                    canvasId: 'canvas3',
                    dataPointShape: false,
                    type: 'column',
                    categories: ['2019-10', '2019-11', this.UserRecently[0]['day']],
                    series: [{
                        name: this.UserRecently[0]['tag'],
                        data: [6, 8, this.UserRecently[0]['num']],
                        color: "rgba(0,0,0,0.3)"//支持rgba，但不支持渐变色
                    }, {
                        name: this.UserRecently[1]['tag'],
                        data: [2, 4, 1]
                    }, {
                        name: this.UserRecently[2]['tag'],
                        data: [4, 4, this.UserRecently[2]['num']]
                    }, {
                        name: this.UserRecently[3]['tag'],
                        data: [2, 4,this.UserRecently[3]['num']]
                    }, {
                        name: this.UserRecently[4]['tag'],
                        data: [4, 2,this.UserRecently[4]['num']]
                    }, {
                        name: this.UserRecently[5]['tag'],
                        data: [2, 2,this.UserRecently[5]['num']]
                    }],
                    yAxis: {
                        format: function (val) {
                            return val + '本';
                        }
                    },
                    xAxis: {
                        disableGrid: true,
                    },
                    width: 375,
                    height: 275,
                    dataLabel: true,
                    extra: {
                        column: {
                            width: 40 //柱的宽度
                        }
                    }
                });
                new wxCharts({
                    canvasId: 'canvas4',
                    type: 'area',
                    categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
                    series: [{
                        name: '成交量1',
                        data: [70, 40, 65, 100, 34, 18],
                        format: function (val) {
                            return val.toFixed(2) + '万';
                        }
                    }, {
                        name: '成交量2',
                        data: [15, 20, 45, 37, 4, 80],
                        format: function (val) {
                            return val.toFixed(2) + '万';
                        }
                    }],
                    yAxis: {
                        format: function (val) {
                            return val + '万';
                        }
                    },
                    width: 375,
                    height: 375,
                });
                new wxCharts({
                    animation: true,
                    canvasId: 'canvas5',
                    type: 'ring',
                    extra: {
                        ringWidth: 10,//圆环的宽度
                        pie: {
                            offsetAngle: -45//圆环的角度
                        }
                    },
                    title: {
                        name: '70%',
                        color: '#7cb5ec',
                        fontSize: 15
                    },
                    subtitle: {
                        name: '收益率',
                        color: '#666666',
                        fontSize: 15
                    },
                    series: [{
                        name: '成交量1',
                        data: 15,
                        stroke: false
                    }, {
                        name: '成交量2',
                        data: 35,
                        stroke: false
                    }, {
                        name: '成交量3',
                        data: 78,
                        stroke: false
                    }, {
                        name: '成交量4',
                        data: 63,
                        stroke: false
                    }],
                    disablePieStroke: true,
                    width: 375,
                    height: 200,
                    dataLabel: true,
                    legend: true,
                    padding: 0
                });
                new wxCharts({
                    animation: true,
                    canvasId: 'canvas6',
                    type: 'radar',
                    categories: [this.UserLike[0]['tag'], this.UserLike[1]['tag'], this.UserLike[2]['tag'],
                                  this.UserLike[3]['tag'], this.UserLike[4]['tag'], this.UserLike[5]['tag']],
                    series: [{
                        name: '属于我的',
                        data: [this.UserLike[0]['ave'], this.UserLike[1]['ave'], this.UserLike[2]['ave'],
                                this.UserLike[3]['ave'], this.UserLike[4]['ave'], this.UserLike[5]['ave']]
                    },
                        {
                        name: '平均水平',
                        data: [6.5, 6, 7, 6.2, 5.5, 6.5]
                    }],
                    width: 375,
                    height: 200,
                    extra: {
                        radar: {
                            max: 10//雷达数值的最大值
                        }
                    }
                });
            },
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
                            that.loadModal = false
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
                this.loadModal = true
                this.getExceedNum()
                this.getUserBookClassification()
                this.getUserLike()
            }
        },
        // onShow(){
        //     this.charts();
        // },
        mounted(){
            wx.setNavigationBarTitle({title: '我的习惯'})
            // wx.setNavigationBarColor({
            //     frontColor: '#ffffff',
            //     backgroundColor: '#1cbbb4'
            // })
            // this.init();
            if(this.$mp){
                console.log(this.$mp)
                this.Exceed = JSON.parse(this.$mp.query.Exceed)
                this.UserBookClassification = JSON.parse(this.$mp.query.UserBookClassification)
                this.UserLike = JSON.parse(this.$mp.query.UserLike)
                this.UserRecently = JSON.parse(this.$mp.query.UserRecently)
            }
            this.charts();
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  canvas
    text-align:center
    height:300px
    width:375px
    display: block
    margin: 0 auto
</style>
