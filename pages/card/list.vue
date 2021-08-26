<template lang="pug">
view.marsCardbox
  view.header.img-box
    img(src="../../static/images/coupon/card-list-banner.png")
  view.marsCard_contentbox
    template(v-for="cardType in cardTypes")
      view.marsCard_contentbox-content(
        :key="cardType.id",
        v-if="cardType.type === 'balance'"
      )
        view.contentbox-contentTitle {{ cardType.title }}
        scroll-view.modeOf_Payment-box(scroll-x="true")
          view.modeOf_Payment_scroll
            view(@click="gobuyCards(cardType)")
              img.yuanimage(:src="cardType.posterUrl")
            view.modeOf_Payment_box(
              v-for="(item, index) in cardType.posterUrls",
              :key="index",
              @click="gobuyCardsCover(cardType, item)"
            )
              img(:src="item", mode="aspectFill")
      view.card--row(:key="cardType.id", @click="gobuyCards(cardType)", v-else)
        mm-card(:img="cardType.posterDenseUrl || cardType.posterUrl")
          view {{ cardType.title }}
          view(
            v-if="cardType.balancePriceGroups && cardType.balancePriceGroups.length"
          ) 多种金额
          view(v-else) rmb {{ cardType.price }}
</template>

<script>
export default {
  data() {
    return {
      type: "",
      cardTypes: [],
      query: {},
    };
  },
  onShow() {
    this.getCardTypes();
  },
  onLoad(option) {
    uni.setNavigationBarTitle({ title: option.title });
    this.query = { ...option };
    delete this.query.title;
  },
  methods: {
    // 卡片类型列表
    async getCardTypes() {
      this.cardTypes = await this.$axios.getRequest("/card-type", {
        ...this.query,
        limit: -1,
      });
    },
    gobuyCardsCover(i, item) {
      uni.navigateTo({
        url: "/pages/card/buy?slug=" + i.slug + "&cover=" + item,
      });
    },
    gobuyCards(i) {
      uni.navigateTo({
        url: "/pages/card/buy?slug=" + i.slug + "&cover=" + i.posterUrl,
      });
    },
  },
};
</script>

<style lang="less">
.marsCardbox {
  width: 750rpx;

  .header {
    width: 750rpx;
    height: 320rpx;
    background: var(--theme--bg-main-color);
  }

  .marsCard_contentbox {
    padding-bottom: 30rpx;
    padding-bottom: env(safe-area-inset-bottom);

    .marsCard_contentbox-content {
      .contentbox-contentTitle {
        width: 650rpx;
        height: 40rpx;
        line-height: 40rpx;
        font-size: var(--theme--font-size-m);
        color: var(--theme--font-main-color);
        margin: 38rpx auto 26rpx;
      }

      .modeOf_Payment-box {
        .modeOf_Payment_scroll {
          display: flex;
          width: 650rpx;
          margin: 0 auto;
          .yuanimage {
            width: 330rpx;
            height: 220rpx;
            background: var(--theme--bg-main-color);
            box-shadow: 4rpx 4rpx 6rpx 4rpx rgba(204, 204, 204, 0.5);
            border-radius: var(--theme--border-radius);
            margin-right: 60rpx;
          }

          .modeOf_Payment_box {
            margin: 0 55rpx 0 0;

            image {
              width: 330rpx;
              height: 220rpx;
              background: #d8d8d8;
              box-shadow: 4rpx 4rpx 6rpx 4rpx rgba(204, 204, 204, 0.5);
              border-radius: 16rpx;
            }
          }
        }
      }
    }
  }

  .marsCard_footerBox {
    width: 750rpx;
    position: fixed;
    bottom: 0;

    .marsCard_footer {
      margin: 10rpx auto;
      width: 100rpx;
      height: 34rpx;
      font-size: 24rpx;

      color: #b5b5b5;
      line-height: 34rpx;
    }
  }
}

.card--row {
  width: 690rpx;
  height: 322rpx;
  margin: 34rpx auto 0;
}
</style>
