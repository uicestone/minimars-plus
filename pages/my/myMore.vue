<template>
  <view class="mymore_box">
    <view class="my_vip_content">
      <view class="my_vip_content_box">
        <view class="my_vip_content_namebox">
          <span>个人资料</span>
          <image src="../../static/images/111.png" />
        </view>
        <view class="my_vip_content_namebox">
          <span>条款</span>
          <image src="../../static/images/111.png" />
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
.mymore_box {
  width: 750rpx;
  min-height: 100vh;
  background-color: #f8f8f8;

  .my_vip_content {
    padding-top: 20rpx;

    .my_vip_content_box {
      width: 690rpx;
      margin: 0 auto;

      .my_vip_content_namebox {
        display: flex;
        justify-content: space-between;
        padding: 15px 20rpx;
        align-items: center;

        span {
          width: 150rpx;
          height: 40rpx;
          font-size: 30rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 500;
          color: #0d0d0d;
          line-height: 40rpx;
        }

        image {
          width: 10rpx;
          height: 20rpx;
          margin-right: 30rpx;
          line-height: 20rpx;
        }
      }
    }
  }
}
</style>
