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
            src="../../static/images/ticketing/ticketing_one.png",
            mode="aspectFit"
          )
          span 单次门票
        view.buy_tickets_Food(@click="goBuyCard")
          img(
            src="../../static/images/ticketing/ticketing_vip.png",
            mode="aspectFit"
          )
          span 礼品卡购买
</template>

<script>
export default {
  data() {
    return {
      bannerPosts: ["../../static/images/ticketing/ticketing_banner.png"],
      current: 0,
      swiperCurrent: 0,
      swiperAutoplay: true,
    };
  },
  onLoad() {},
  onHide() {
    this.swiperAutoplay = false;
  },
  methods: {
    async getBanner() {
      this.bannerPosts = await this.$axios.getRequest("/post", {
        tag: "booking-banner",
      });
    },

    changeSwiper(e) {
      this.swiperCurrent = e.detail.current;
    },
    // 礼品卡购买
    goBuyCard() {
      uni.navigateTo({
        url: "../card/index",
      });
    },
    goOrder() {
      uni.navigateTo({
        url: "../booking/create",
      });
    },
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
    height: 550rpx;
    background: var(--theme--bg-main-color);

    .swiper {
      height: 550rpx;
      line-height: 140rpx;

      .swiper_item {
        width: 750rpx;
        height: 550rpx;

        img {
          width: 750rpx;
          height: 550rpx;
        }

        span {
        }
      }
    }
  }

  // 单次门票
  .buy_ticketsBox {
    height: 560rpx;
    position: absolute;
    top: 240px;
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
