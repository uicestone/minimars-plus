<template lang="pug">
view.marsCardbox
  view.header
  view.marsCard_contentbox
    view.marsCard_contentbox-content(v-for="(i, j) in cardTypes", :key="j")
      view.contentbox-contentTitle {{ i.title }}
      scroll-view.modeOf_Payment-box(scroll-x="true")
        view.modeOf_Payment_scroll
          view(@click="gobuyCards(i)")
            img.yuanimage(:src="i.posterUrl")
          view.modeOf_Payment_box(
            v-for="(item, index) in i.posterUrls",
            :key="index",
            @click="gobuyCardsCover(i, item)"
          )
            img(:src="item", mode="aspectFill")
        //
          <view class="modeOf_Payment_scroll"  @click="gobuyCards(i)">
          <view><image :src="i.posterUrl" class="yuanimage" /></view>
          <view class="modeOf_Payment_box" v-for="(item,index) in i.posterUrls" :key="index">
          <image :src="i.posterUrl" />
          <image :src="item" mode="aspectFill" />
          </view>
          </view>
  //- view.marsCard_footerBox
    view.marsCard_footer 使用须知
</template>

<script>
export default {
  data() {
    return {
      type: "",
      cardTypes: [],
    };
  },
  onShow() {
    this.type; //卡片类型
    this.getCardTypes();
  },
  onLoad(option) {
    this.type = option.type;
  },
  methods: {
    // 卡片类型列表
    async getCardTypes() {
      this.cardTypes = await this.$axios.getRequest("/card-type", {
        type: this.type,
        limit: -1,
      });
    },
    gobuyCardsCover(i, item) {
      if (this.type == "balance") {
        uni.navigateTo({
          url: "/pages/card/buy?slug=" + i.slug + "&cover=" + item,
        });
      } else {
        uni.navigateTo({
          url: "/pages/card/buyTimes?slug=" + i.slug + "&cover=" + item,
        });
      }
    },
    gobuyCards(i) {
      console.log("gobuyCards:", i.slug);
      if (this.type == "balance") {
        uni.navigateTo({
          url: "/pages/card/buy?slug=" + i.slug + "&cover=" + i.posterUrl,
        });
      } else {
        uni.navigateTo({
          url: "/pages/card/buyTimes?slug=" + i.slug + "&cover=" + i.posterUrl,
        });
      }
    },
    gobuyXDCards() {
      uni.navigateTo({
        url: "/pages/card/buyTimes",
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
    background: #d8d8d8;
  }

  .marsCard_contentbox {
    .marsCard_contentbox-content {
      margin: 30px 0;

      .contentbox-contentTitle {
        margin: 0 auto 10rpx;
        width: 650rpx;
        height: 40rpx;
        font-size: 28rpx;
       
        font-weight: 600;
        color: #0d0d0d;
        line-height: 40rpx;
      }

      .modeOf_Payment-box {
        .modeOf_Payment_scroll {
          display: flex;
          width: 650rpx;
          margin: 0 auto;
          .yuanimage {
            width: 330rpx;
            height: 220rpx;
            background: #d8d8d8;
            box-shadow: 4rpx 4rpx 6rpx 4rpx rgba(204, 204, 204, 0.5);
            border-radius: 16rpx;
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
     
      font-weight: 600;
      color: #b5b5b5;
      line-height: 34rpx;
    }
  }
}
</style>
