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
        img.swiper_item(:src="post.posterUrl", mode="aspectFill")
    // 购票
    view
      view.buy_ticketsBox
        view.buy_tickets
          view(@click="goBookingCreate")
            img(
              src="../../static/images/index/index_BuyingTickets.png",
              mode="aspectFit"
            )
            span 购票
        view.line
        view.buy_tickets_Food(@click="goFood()")
          img(
            src="../../static/images/index/index_Order.png",
            mode="aspectFit"
          )
          span 点餐
  view(style="width: 690rpx; height: 290rpx; margin-bottom: 30rpx")
  // 消息提示框
  view.message_box(v-if="latestBooking")
    img(src="../../static/images/index/looks.png")
    view 您有预约{{ latestBooking.status | statusLabel }}，请及时查看
  // MARS商城
  view.shoppingMall_box
    view.shoppingMall.shoppingImgBox.img-box(@click="goMall")
      img(src="../../static/images/index/home-entry-mall.png")
      // MARS商城
    view.shoppingMall.activeImgBox.img-box(@click="goEvent")
      img(src="../../static/images/index/home-entry-event.png")
      // MARS活动
    view.shoppingMall.cardImgBox.img-box(@click="goCard")
      img(src="../../static/images/index/home-entry-card.png")
      // MARS卡券
  // 我的积分
  view.integrate_box
    view.integrate
      view.integrate_left
        span 我的积分 {{ points || '-' }}
      view.integrate_right
        img.index_integralImg(
          src="../../static/images/index/index_integralImg.png",
          mode=""
        )
  // modal-get-user-info
  modal-get-phone-number
</template>

<script>
import config from "../../utils/config";
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      swiperCurrent: 0,
      swiperAutoplay: true,
      bannerPosts: [], //轮播图
      latestBooking: null,

      init: false, // 初始化完成
    };
  },
  computed: {
    user: sync("auth/user"),
    points() {
      return this.user && this.user.points ? this.user.points : "-";
    },
  },
  async onShow() {
    console.log("index:onShow");
    // await this.$onLaunched;
    this.swiperAutoplay = true;

    if (this.init) this.getLatestBooking();
  },
  onHide() {
    this.swiperAutoplay = false;
  },
  async onLoad() {
    // await this.$onLaunched;
    console.log("index:onLoad");
    uni.showLoading({ mask: true });
    await this.getBanner();
    uni.hideLoading();
  },
  methods: {
    changeSwiper(e) {
      this.swiperCurrent = e.detail.current;
    },
    goBookingCreate() {
      uni.navigateTo({
        url: "../booking/create",
      });
    },
    // 跳转卡券页面
    goCard() {
      uni.navigateTo({
        url: "../card/index",
      });
    },
    // 跳转活动页面
    goEvent() {
      uni.navigateTo({
        url: "../booking/events",
      });
    },
    goMall() {
      uni.navigateToMiniProgram({ appId: config.mallAppId });
    },
    goFood() {
      uni.switchTab({
        url: "../food/index",
      });
    },
    // banner图
    async getBanner() {
      this.bannerPosts = await this.$axios.getRequest("/post", {
        tag: "home-banner",
      });
    },

    // 获取你的订单,查看详情
    async getLatestBooking() {
      const bookings = await this.$axios.getRequest("/booking", {
        type: "play",
        status: "booking,in_service,pending,pending_refund",
        limit: 1,
      });
      if (bookings.length) {
        this.latestBooking = bookings[0];
      }
    },
  },
  watch: {
    user(user) {
      if (user.id) {
        this.init = true;
        this.getLatestBooking();
      }
    },
  },
  filters: {
    statusLabel(status) {
      return config.bookingStatusName[status];
    },
  },
};
</script>

<style lang="less">
.index_box {
  background-color: #f8f8f8;
  // min-height:1624rpx ;

  // 轮播
  .banner {
    position: relative;
    width: 750rpx;
    height: calc(100vh - 780rpx);
    background: var(--theme--bg-main-color);

    .swiper {
      height: calc(100vh - 780rpx);
      line-height: 140rpx;

      .swiper_item {
        width: 750rpx;
        height: calc(100vh - 780rpx);

        img {
          width: 750rpx;
          height: calc(100vh - 780rpx);
        }

        span {
        }
      }
    }

    // 购票
    .buy_ticketsBox {
      position: absolute;
      margin-top: 0;
      bottom: -300rpx;
      right: 30rpx;
      width: 690rpx;
      height: 358rpx;
      display: flex;
      justify-content: space-around;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 4rpx 4rpx rgba(0, 0, 0, 0.03);
      border-radius: 20rpx;
      font-size: 0;

      .line {
        border: 1rpx solid #f7f7f7;
        height: 236rpx;
        margin-top: 50rpx;
      }

      .buy_tickets,
      .buy_tickets_Food {
        width: 100rpx;
        height: 100rpx;
        margin-top: 100rpx;
        text-align: center;

        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 12rpx;
        }

        span {
          font-size: var(--theme--font-size-m);
          margin-top: 36rpx;
          color: var(--theme--font-main-color);
          display: block;
        }
      }

      .buy_tickets {
        margin-left: 60rpx;
      }

      .buy_tickets_Food {
        margin-right: 60rpx;
      }
    }
  }

  // 消息提示框
  .message_box {
    width: 690rpx;
    height: 80rpx;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 4rpx 4rpx rgba(0, 0, 0, 0.03);
    border-radius: 20rpx;
    margin: 0 auto;
    line-height: 90rpx;
    display: flex;
    vertical-align: middle;

    image {
      width: 30rpx;
      height: 30rpx;
      margin-left: 50rpx;
      margin-top: 26rpx;
    }

    view {
      font-size: var(--theme--font-size-s);
      font-weight: var(--theme--font-weight-light);
      color: var(--theme--font-deputy-color);
      margin-left: 20rpx;
      display: flex;
      align-items: center;
    }
  }

  // MARS商城
  .shoppingMall_box {
    display: flex;
    justify-content: space-around;
    margin: 20rpx 20rpx 20rpx;

    .shoppingImgBox {
      // background: url(../../static/images/index/index_shoppingImg.png) no-repeat;
      background: white;
      background-size: 100% 100%;
    }

    .activeImgBox {
      // background: url("../../static/images/index/indexActiveImg.png") no-repeat;
      background: white;
      background-size: 100% 100%;
    }

    .cardImgBox {
      // background: url(../../static/images/index/index_cardImg.png) no-repeat;
      background: white;
      background-size: 100% 100%;
    }

    .shoppingMall {
      width: 220rpx;
      height: 250rpx;
      border-radius: 20rpx;
    }
  }

  // 我的积分
  .integrate_box {
    width: 750rpx;
    // height: 132rpx;
    background: #ffffff;

    .integrate {
      width: 630rpx;
      margin: 0 auto;
      padding-top: 10rpx;
      display: flex;
      justify-content: space-between;

      .integrate_left {
        span {
          font-size: var(--theme--font-size-m);
          line-height: 34px;
          color: var(--theme--font-main-color);
        }
      }

      .integrate_right {
        margin-top: 7rpx;

        .index_integralImg {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
}
</style>
