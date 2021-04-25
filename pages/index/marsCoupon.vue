<template>
  <view class="marsCoupon_box">
    <view class="marsCoupon_header">
      <view>Hi！Alfie！</view>
      <view>This is ur</view>
      <view>persenal page.</view>
    </view>
    <view class="marsCoupon_contentbox">
      <view class="coupebox_content">
        <view v-for="(i, index) in image" :key="index" @click="goCard(index)">
          <image :src="i" mode="aspectFill" class="image" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      image: [
        "../../static/images/index/cardPickerThree.png",
        "../../static/images/index/cardPickerTwo.png",
        "../../static/images/index/cardPickerOne.png",
        "../../static/images/index/cardPickerFour.png",
      ],
    };
  },
  methods: {
    goCard(index) {
      console.log(index);
      if (index === 0) {
        uni.navigateTo({
          url: "/pages/index/marsCard?type=" + "times",
        });
      } else if (index === 1) {
        uni.navigateTo({
          url: "/pages/index/marsCard?type=" + "balance",
        });
      } else if (index === 2) {
        uni.navigateTo({
          url: "/pages/index/marsCard?type=" + "period",
        });
      } else if (index === 3) {
        uni.navigateTo({
          url: "/pages/index/marsCard?type=" + "coupon",
        });
      }
    },
  },
};
</script>

<style lang="less">
.marsCoupon_box {
  width: 750rpx;
  height: 100vh;
  // margin-bottom: 20rpx;
  background-color: #f8f8f8;

  .marsCoupon_header {
    margin: 0 auto;
    width: 638rpx;
    height: 190rpx;
    font-size: 48rpx;
    font-family: Helvetica;
    font-weight: 1000;
    color: #0d0d0d;
    line-height: 58rpx;
    letter-spacing: 2rpx;
    padding-top: 45rpx;
  }

  .marsCoupon_contentbox {
    width: 682rpx;
    margin: 0 auto;

    .coupebox_content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .image {
        margin-bottom: 20rpx;
        width: 330rpx;
        height: 450rpx;
        background: #d8d8d8;
        box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(195, 195, 195, 0.5);
        border-radius: 26rpx;
      }
    }
  }
}
</style>
