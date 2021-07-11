<template lang="pug">
view.index_box
  // 轮播
  view.banner
    swiper.swiper(
      :autoplay="swiperAutoplay",
      :interval="7000",
      :duration="1000",
      :current="swiperCurrent",
      indicator-dots="true",
      circular="true",
      indicator-color="#B9B9B9",
      indicator-active-color="#9B9B9B"
    )
      swiper-item(v-for="post in bannerPosts", :key="post.id")
        img.swiper_item(:src="post", mode="aspectFill")
    // 单次门票
    view
      view.buy_ticketsBox
        view.buy_tickets(@click="goOrder")
          img(
            src="../../static/images/integration/events.png",
            mode="aspectFit"
          )
          span 活动兑换
        view.buy_tickets_Food(@click="goBuyCard")
          img(
            src="../../static/images/integration/goods.png",
            mode="aspectFit"
          )
          span 商品兑换
</template>

<script>
export default {
  data() {
    return {
      bannerPosts: ["../../static/images/integration/banner.png"],
      current: 0,
      swiperCurrent: 0,
      swiperAutoplay: true,
    };
  },
};
</script>

<style lang="less" scoped>
.index_box {
  background-color: #f8f8f8;

  // 轮播
  .banner {
    position: relative;
    width: 750rpx;
    height: 424rpx;
    background: #d8d8d8;

    .swiper {
      height: 100%;

      .swiper_item {
        width: 100vw;
        height: 100%;
      }
    }
  }

  // 单次门票
  .buy_ticketsBox {
    height: 560rpx;
    position: absolute;
    top: 386rpx;
    margin-top: 0rpx;
    right: 30rpx;
    width: 690rpx;
    display: flex;
    justify-content: space-around;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 4rpx 4rpx rgba(0, 0, 0, 0.03);
    border-radius: 20rpx;

    .buy_tickets,
    .buy_tickets_Food {
      width: 290rpx;
      height: 395rpx;
      border-radius: 16rpx;
      margin-top: 60rpx;
      text-align: center;
      font-size: 0;

      image {
        width: 290rpx;
        height: 100%;
        border-radius: 12rpx;
      }

      span {
        font-size: var(--theme--font-size-m);
        line-height: 109rpx;
        color: var(--theme--font-main-color);
      }
    }

    .buy_tickets {
      margin-left: 15rpx;
    }

    .buy_tickets_Food {
      margin-right: 15rpx;
    }
  }
}
</style>

