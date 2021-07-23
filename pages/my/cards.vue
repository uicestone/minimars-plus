<template lang="pug">
view.cardbag
  custom-tabs(
    :tabs="tabs",
    :activeIndex.sync="activeIndex",
    @onselect="selectTab"
  )
  view.cardbag_card(v-show="activeIndex === 0")
    view.cardbag_card_box(v-for="card in activatedCards", :key="card.id")
      view.img-box.cadbag__img
        img(
          :src="card.posterDenseUrl || '../../static/images/my/my-banner.png'",
          mode="aspectFill"
        )
      view.cardbag_card_box-content
        view.cardbag_card_box-content-money
          | {{ card.title }} rmb {{ card.price }}
        view.cardbag_card_box-content-time {{ card.createdAt | date }} - {{ card.expiresAt | date }}
    view.mycards_footer(@click="goHistoryCards") 历史卡券
  // 未激活
  view.cardbag_card(v-show="activeIndex === 1")
    view.cardbag_card_box(v-for="card in validCards", :key="card.id")
      view.img-box.cadbag__img
        img(src="../../static/images/my/my-banner.png", mode="aspectFill")
      view.cardbag_card_box-content
        view.cardbag_card_box-content-money
          | {{ card.title }} rmb {{ card.price }}
        view.cardbag_card_box-content-times
          view.cardbag__btn(@click="activate(card)") 自用激活
          view.cardbag__btn(@click="transfer(card)") 赠送好友
    // 底部，礼品卡使用须知
    view.mycards_footer-use
      view.mycards_footer-use_left(@click="goRules()") 礼品卡使用须知
      view.mycards_footer-use_line
      view.mycards_footer-use_right(@click="goTransferHistory()") 卡券收赠记录
</template>

<script>
import customTabs from "../../components/custom-tabs/tabs.vue";
import moment from "moment";

export default {
  data() {
    return {
      type: "", // card / coupon
      activeIndex: 0,
      count: "",
      cards: [],
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
  components: {
    "custom-tabs": customTabs,
  },
  methods: {
    async getCards() {
      this.cards = await this.$axios.getRequest(
        `/card?type=${this.type === "card" ? "times,period,balance" : "coupon"}`
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
      return uni.showToast({ title: "该功能即将上线", icon: "none" });
    },
    goRules() {
      return uni.showToast({ title: "该功能即将上线", icon: "none" });
      uni.navigateTo({
        url: "/pages/my/cardRules",
      });
    },
    goTransferHistory() {
      return uni.showToast({ title: "该功能即将上线", icon: "none" });
      uni.navigateTo({
        url: "/pages/my/cardTransfers",
      });
    },
    async activate(card) {
      await this.$axios.putRequest(`/card/${card.id}`, { status: "activated" });
      uni.showToast({ title: "卡券激活成功", icon: "none" });
      await this.getCards();
    },
    transfer(card) {
      return uni.showToast({ title: "该功能即将上线", icon: "none" });
    },
  },
  filters: {
    date(d) {
      return moment(d).format("YYYY.M.D");
    },
  },
  onLoad(option) {
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

  .cardbag_card {
    padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);

    .cardbag_card_box {
      width: 690rpx;
      box-shadow: 0rpx 4rpx 14rpx 6rpx rgba(222, 221, 221, 0.5);
      margin: 0 auto;
      position: relative;
      margin-top: 30rpx;
      border-radius: var(--theme--border-radius);
      overflow: hidden;

      .cardbag_card_box-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 34rpx 0 40rpx;
        box-sizing: border-box;
        width: 100%;
        height: 90rpx;
        background: #ffffff;
        border-radius: 0rpx 0rpx 16rpx 16rpx;

        .cardbag_card_box-content-money {
          max-width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 34rpx;
          font-size: var(--theme--font-size-s);
        }

        //时间
        .cardbag_card_box-content-time {
          height: 32rpx;
          font-size: var(--theme--font-size-s);
        }

        // 激活/赠送
        .cardbag_card_box-content-times {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    // 历史卡券
    .mycards_footer {
      height: 28rpx;
      font-size: var(--theme--font-size-s);
      line-height: 28rpx;
      position: absolute;
      bottom: 20rpx;
      right: 350rpx;
      padding-bottom: env(safe-area-inset-bottom);
      color: var(--theme--font-deputy-color);
    }

    // 礼品卡使用须知
    .mycards_footer-use {
      color: var(--theme--font-deputy-color);
      font-size: var(--theme--font-size-s);
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 28rpx;
      position: absolute;
      bottom: 20rpx;
      left: 195rpx;

      .mycards_footer-use_line {
        background-color: var(--theme--font-deputy-color);
        width: 2rpx;
        height: 20rpx;
        margin: 0 28rpx;
      }

      .mycards_footer-use_left {
        height: 28rpx;
        line-height: 28rpx;
      }

      .mycards_footer-use_right {
        height: 28rpx;
        line-height: 28rpx;
      }
    }
  }
}

.cadbag__img {
  width: 100%;
  height: 232rpx;
}

.cardbag__btn {
  width: 130rpx;
  height: 46rpx;
  text-align: center;
  font-size: var(--theme--font-size-s);
  border: 2rpx solid var(--theme--font-main-color);
  border-radius: var(--theme--border-radius);
  line-height: 46rpx;
  color: var(--theme--font-main-color);
}

.cardbag__btn + .cardbag__btn {
  margin-left: 20rpx;
}

.cardbag__btn--highlight {
  background-color: var(--theme--main-color);
  border-color: var(--theme--main-color);
}
</style>
