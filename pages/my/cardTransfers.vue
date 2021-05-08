<template lang="pug">
view.myGetRceived_box
  view.myGetRceived_content(v-for="(item, index) in 2", :key="index")
    view.myGetRceived_content-box
      view.myGetRceived_content-left
        img(src="../../static/images/224.jpg")
      view.myGetRceived_content-right
        view.myGetRceived_title 已转赠
        view MarsBabe卡 ¥ 3800
        view.myGetRceived_id 赠予人ID：2938498wawa
        view.myGetRceived_data 日期： 2021.1.19
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
.myGetRceived_box {
  width: 750rpx;
  background: #f8f8f8;
  // height: 100vh;
  padding-top: 80rpx;

  .myGetRceived_content {
    width: 566rpx;
    height: 280rpx;
    background: #ffffff;
    box-shadow: 0px 4px 14px 6px rgba(222, 221, 221, 0.5);
    border-radius: 16rpx;
    margin: 0 auto;
    margin-bottom: 25rpx;

    .myGetRceived_content-box {
      padding-top: 35rpx;
      display: flex;
      justify-content: space-around;

      .myGetRceived_content-left {
        image {
          width: 94rpx;
          height: 94rpx;
          background: #d8d8d8;
          border-radius: 8rpx;
        }
      }

      .myGetRceived_content-right {
        view {
          font-size: 28rpx;
          color: #666666;
          margin-bottom: 8rpx;
        }

        .myGetRceived_title {
          width: 96rpx;
          height: 44rpx;
          font-size: 32rpx;
          font-weight: 500;
          color: #a4a4a4;
          line-height: 44rpx;
        }

        .myGetRceived_id {
          width: 358rpx;
          height: 40rpx;
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 40rpx;
        }

        .myGetRceived_data {
          width: 228rpx;
          height: 40rpx;
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 40rpx;
        }
      }
    }
  }
}
</style>
