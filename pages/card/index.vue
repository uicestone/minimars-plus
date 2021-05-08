<template lang="pug">
view.marsCoupon_box
  view.marsCoupon_header
    view 亲爱的MINI MARS会员
    view 请查收您的限定卡券
  view.marsCoupon_contentbox
    view.coupebox_content
      view(v-for="(i, index) in image", :key="index", @click="goCard(index)")
        img.image(:src="i", mode="aspectFill")
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
      console.log("goCard index:", index);
      if (index === 0) {
        uni.navigateTo({
          url: "/pages/card/list?type=times",
        });
      } else if (index === 1) {
        uni.navigateTo({
          url: "/pages/card/list?type=balance",
        });
      } else if (index === 2) {
        uni.navigateTo({
          url: "/pages/card/list?type=period",
        });
      } else if (index === 3) {
        uni.navigateTo({
          url: "/pages/card/list?type=coupon",
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
    letter-spacing: 2rpx;
    padding-top: 45rpx;
    color: #636d67;
    font-weight: 200;
    line-height: 1.5;
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
