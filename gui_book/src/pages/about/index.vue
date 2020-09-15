<template>
  <div class="box">
    <view class="cu-bar bg-white">
      <view class="action sub-title">
        <text class="text-xl text-bold text-green">搜索图书</text>
        <text class="bg-green"></text>
        <!-- last-child选择器-->
      </view>
    </view>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">在搜索图书功能页，输入对应书籍的关键字。</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">系统便可为你匹配相应图书进行显示，来供您选择。</p>
    <view class="cu-bar bg-white">
      <view class="action sub-title">
        <text class="text-xl text-bold text-green">查看图书</text>
        <text class="bg-green"></text>
        <!-- last-child选择器-->
      </view>
      <text class="text-df text-green">(需授权登录)</text>
    </view>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">点击图书进入图书详情页，了解此书的详细信息。</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">为了使系统更为人性化，我们还增加了图书评分功能。</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">针对不同图书，每个人可以打出自己心中对它的分数。</p>
    <view class="cu-bar bg-white">
      <view class="action sub-title">
        <text class="text-xl text-bold text-green">个性化推荐图书</text>
        <text class="bg-green"></text>
        <!-- last-child选择器-->
      </view>
      <text class="text-df text-green">(需授权登录)</text>
    </view>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">在您对几本图书进行浏览、收藏或评分之后。</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">系统将通过<text class="text-lg text-bold text-cyan" style="margin-left: 10rpx;margin-right: 10rpx">大数据</text>和<text class="text-lg text-bold text-cyan" style="margin-left: 10rpx;margin-right: 10rpx">数据挖掘</text>等相关算法</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">为您个性化进行相关图书推荐</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">为您挑选真正适合您的图书，帮助您重拾读书的乐趣！</p>
    <view class="cu-bar bg-white">
      <view class="action sub-title">
        <text class="text-xl text-bold text-green">读书习惯</text>
        <text class="bg-green"></text>
        <!-- last-child选择器-->
      </view>
      <text class="text-df text-green">(需授权登录)</text>
    </view>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">当您使用本系统一段时间之后。</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">系统将利用可视化技术向您展示：</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">您最近评分的图书分类、近期的收藏图书量</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">您对各类图书的偏好程度以及在同期水平之下的排名</p>
    <view class="cu-bar bg-white">
      <view class="action sub-title">
        <text class="text-xl text-bold text-green">意见反馈</text>
        <text class="bg-green"></text>
        <!-- last-child选择器-->
      </view>
    </view>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">期待您对本系统的批评与建议</p>
    <p class="solid-bottom text-df padding" style="text-indent: 40rpx;padding: 10rpx">我们会努力做到更好的！</p>
  </div>
</template>

<script>
    export default {
        mounted(){
            wx.setNavigationBarTitle({title: '帮助和说明'})

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .box
    margin 20rpx 0
    .cu-bar
      margin-top 20rpx
</style>
