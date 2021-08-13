<template lang="pug">
view.cardbag
  mm-tabs(:tabs="tabs", :activeIndex.sync="activeIndex", @onselect="selectTab")
  view.card(v-show="activeIndex === 0")
    view.box(v-for="card in activatedCards", :key="card.id")
      img(
        :src="card.posterDenseUrl || card.posterUrl || '/static/images/my/my-banner.png'",
        mode="widthFix"
      )
      view.content
        view.money
          text(v-if="card.type === 'times'", style="margin-right:20rpx") 剩余 {{ card.timesLeft }}
          text {{ card.title }}
        view.time {{ card.start || card.createdAt | date }} - {{ card.expiresAt | date }}
    view.footer-links
      view.left(@click="goHistoryCards") 历史卡券
      view.divider
      view.right(@click="goTransferHistory") 卡券收赠记录
  // 未激活
  view.card(v-show="activeIndex === 1")
    view.box(v-for="card in validCards", :key="card.id")
      img(
        :src="card.posterDenseUrl || card.posterUrl || '/static/images/my/my-banner.png'",
        mode="widthFix"
      )
      view.content
        view.money
          | {{ card.title }} rmb {{ card.price }}
        view.action
          button.btn(@click="activate(card)") 自用激活
          button.btn(@click="transfer(card)") 赠送好友
    // 底部，礼品卡使用须知
    view.footer-links
      view.left(@click="goHistoryCards") 历史卡券
      view.divider
      view.right(@click="goTransferHistory") 卡券收赠记录
  mm-popup(ref="sharePop")
    view.pop-header(slot="header") {{ shareCard.title }}
    view(slot="body")
      button.share-button(open-type="share") 分享给好友
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      type: "", // card / coupon
      activeIndex: 0,
      count: "",
      cards: [],
      shareCard: {},
    };
  },
  computed: {
    activatedCards() {
      return this.cards.filter((c) => c.status === "activated");
    },
    validCards() {
      return this.cards.filter((c) => c.status === "valid");
    },
    tabs() {
      return [
        {
          id: 1,
          name: `可使用（${this.activatedCards.length}）`,
        },
        {
          id: 2,
          name: `未激活（${this.validCards.length}）`,
        },
        {
          id: 3,
          name: "获得更多礼品卡",
          showArrow: true,
          customClick: true,
        },
      ];
    },
  },
  methods: {
    async getCards() {
      this.cards = await this.$axios.getRequest(
        `/card?limit=-1&type=${
          this.type === "card" ? "times,period,balance" : "coupon"
        }`
      );
    },
    selectTab(e) {
      if (e.item.id === 3) {
        wx.navigateTo({
          url: "/pages/card/index",
        });
      }
    },
    goHistoryCards() {
      uni.navigateTo({ url: "./cardHistory" });
    },
    goRules() {
      return uni.showToast({ title: "该功能即将上线", icon: "none" });
      uni.navigateTo({
        url: "./cardRules",
      });
    },
    goTransferHistory() {
      return uni.showToast({ title: "该功能即将上线", icon: "none" });
      uni.navigateTo({
        url: "./cardTransfers",
      });
    },
    async activate(card) {
      await this.$axios.putRequest(`/card/${card.id}`, { status: "activated" });
      uni.showToast({ title: "卡券激活成功", icon: "none" });
      await this.getCards();
    },
    transfer(card) {
      this.shareCard = card;
      this.$refs.sharePop.open();
    },
  },
  filters: {
    date(d) {
      return moment(d).format("Y.M.D");
    },
  },
  onLoad(option = {}) {
    if (option.type === "coupon") {
      this.type = "coupon";
      uni.setNavigationBarTitle({ title: "MARS优惠券" });
    } else {
      this.type = "card";
    }
  },
  async onShow() {
    await this.getCards();
  },
  onShareAppMessage() {
    return {
      title: "赠送你1张MINI MARS礼品卡",
      imageUrl: this.shareCard.posterUrl,
      path: "/pages/index/index?giftCode=" + this.shareCard.giftCode,
    };
  },
};
</script>
<style lang="less" scoped>
.cardbag {
  width: 750rpx;
  min-height: 100vh;
  background: #f8f8f8;
  position: relative;

  .cardbag_box {
    padding-top: 30rpx;
    width: 650rpx;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40rpx;

    .clickcard {
      color: #9fcdff;
    }

    .noclickcard {
      color: #919191;
    }
  }

  .card {
    padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);

    .box {
      width: 690rpx;
      box-shadow: 0rpx 4rpx 14rpx 6rpx rgba(222, 221, 221, 0.5);
      margin: 0 auto;
      position: relative;
      margin-top: 30rpx;
      // border-radius: var(--theme--border-radius);
      overflow: hidden;

      image {
        width: 100%;
        display: block;
        height: 233rpx;
      }

      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 34rpx 0 40rpx;
        box-sizing: border-box;
        width: 100%;
        height: 90rpx;
        background: #ffffff;
        border-radius: 0rpx 0rpx 16rpx 16rpx;

        .money {
          max-width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 34rpx;
          font-size: var(--theme--font-size-s);
        }

        //时间
        .time {
          height: 32rpx;
          font-size: var(--theme--font-size-s);
        }

        // 激活/赠送
        .action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .btn {
            width: 130rpx;
            // height: 46rpx;
            padding: 0;
            text-align: center;
            font-size: var(--theme--font-size-s);
            border: 2rpx solid var(--theme--font-main-color);
            border-radius: var(--theme--border-radius);
            line-height: 46rpx;
            color: var(--theme--font-main-color);
            background: none;
          }

          .btn + .btn {
            margin-left: 20rpx;
          }

          .btn--highlight {
            background-color: var(--theme--main-color);
            border-color: var(--theme--main-color);
          }
        }
      }
    }

    // 礼品卡使用须知
    .footer-links {
      color: var(--theme--font-deputy-color);
      font-size: var(--theme--font-size-s);
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 28rpx;
      position: absolute;
      bottom: calc(20rpx + env(safe-area-inset-bottom));
      width: 100%;

      .divider {
        background-color: var(--theme--font-deputy-color);
        width: 2rpx;
        height: 20rpx;
        margin: 0 28rpx;
      }

      .left {
        height: 28rpx;
        line-height: 28rpx;
      }

      .right {
        height: 28rpx;
        line-height: 28rpx;
      }
    }
  }
}

.share-button {
  color: var(--theme--font-main-color);
  font-size: var(--theme--font-size-l);
}
</style>
