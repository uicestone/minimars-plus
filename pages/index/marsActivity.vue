<template>
  <view class="marsActivityBox">
    <view class="marsActivity_header">
      <image src="../../static/images/224.jpg" mode="aspectFill" />
    </view>
    <view class="marsActivity_titleBox">
      <view class="marsActivity_title">圣诞树DIY</view>
      <view class="marsActivity_details">
        <view class="marsActivity_time">
          <span>活动时间：</span>
          <view>2020.12.19</view>
        </view>
        <view class="marsActivity_time">
          <span>适用年龄：</span>
          <view>3岁-10岁</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less">
.marsActivityBox {
  .marsActivity_header {
    width: 750rpx;
    height: 394rpx;
    background: #ededed;
    border-radius: 20rpx;

    image {
      width: 750rpx;
      height: 394rpx;
    }
  }

  .marsActivity_titleBox {
    width: 634rpx;
    margin: 0 auto;

    .marsActivity_title {
      margin-left: -15rpx;
      width: 180rpx;
      height: 40rpx;
      padding: 10rpx;
      font-size: 36rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 40rpx;
      margin-top: 40rpx;
      margin-bottom: 10rpx;
      background-color: #9fcdff;
      border-radius: 30rpx;
    }

    .marsActivity_details {
      height: 50rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 40rpx;

      .marsActivity_time {
        display: flex;
        padding-top: 10rpx;

        view {
          font-size: 35rpx;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
