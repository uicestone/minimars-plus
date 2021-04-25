<template lang="pug">
view.index_box
  // 轮播
  view.banner
    swiper.swiper(
      :autoplay="true",
      :interval="3000",
      :duration="1000",
      :current="swiperCurrent",
      @change="changeSwiper",
      indicator-dots="true",
      circular="true",
      indicator-color="#B9B9B9",
      indicator-active-color="#9B9B9B"
    )
      swiper-item(v-for="item in swiperImg", :key="item.id")
        img.swiper_item(:src="item", mode="aspectFill")
    // 单次门票
    view
      view.buy_ticketsBox
        view.buy_tickets(@click="goOrder")
          img(
            src="../../static/images/ticketing/ticketing_one.png",
            mode="aspectFill"
          )
          span 单次门票
        view.buy_tickets_Food(@click="goBuyCard")
          img(
            src="../../static/images/ticketing/ticketing_vip.png",
            mode="aspectFill"
          )
          span 礼品卡购买
  view(style="width: 750rpx; height: 1000rpx")
</template>

<script>
export default {
  data() {
    return {
      swiperImg: [
        "../../static/images/223.jpg",
        "../../static/images/224.jpg",
        "../../static/images/223.jpg",
        "../../static/images/223.jpg",
        "../../static/images/224.jpg",
        "../../static/images/223.jpg",
      ],
      current: 0,
      swiperCurrent: 0,
    };
  },
  onLoad() {},
  methods: {
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

<style lang="less">
.index_box {
  background-color: #f8f8f8;

  // 轮播
  .banner {
    position: relative;
    width: 750rpx;
    height: 550rpx;
    background: #d8d8d8;

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
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }

  // 单次门票
  .buy_ticketsBox {
    height: 562rpx;
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
      height: 400rpx;
      box-shadow: 0px 4rpx 8rpx 0rpx rgba(195, 195, 195, 0.5);
      border-radius: 16rpx;
      margin-top: 70rpx;
      text-align: center;

      image {
        width: 290rpx;
        height: 400rpx;
        border-radius: 12rpx;
        margin-bottom: 15rpx;
      }

      span {
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #0d0d0d;
        margin: 10rpx;
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
