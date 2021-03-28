<template>
  <view class="marsCardebox">
    <view class="header"> </view>
    <view class="marsCarde_contentbox">
      <view
        class="marsCarde_contentbox-content"
        v-for="(i, j) in cardsList"
        :key="j"
      >
        <view class="contentbox-contentTitle">
          {{ i.title }}
        </view>
        <scroll-view scroll-x="true" class="modeOf_Payment-box">
          <view class="modeOf_Payment_scroll">
            <view @click="gobuyCards(i)">
              <image :src="i.posterUrl" class="yuanimage"></image>
            </view>
            <view
              class="modeOf_Payment_box"
              v-for="(item, index) in i.posterUrls"
              :key="index"
              @click="gobuyCardsCover(i, item)"
            >
              <image :src="item" mode="aspectFill"></image>
            </view>
          </view>
          <!-- 	<view class="modeOf_Payment_scroll"  @click="gobuyCards(i)">
						<view><image :src="i.posterUrl" class="yuanimage"></image></view>
						<view class="modeOf_Payment_box" v-for="(item,index) in i.posterUrls" :key="index">
							<!-- <image :src="i.posterUrl"></image> -->
          <!-- <image :src="item" mode="aspectFill"></image> -->
          <!-- 	</view>
					</view> -->
        </scroll-view>
      </view>
    </view>
    <view class="marsCarde_footerBox">
      <view class="marsCarde_footer"> 使用须知 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      typeCards: "",
      cardsList: [],
    };
  },
  onShow() {
    this.typeCards; //卡片类型
    this.goCardsTypeList();
  },
  onLoad(option) {
    this.typeCards = option.type;
    console.log(this.typeCards, "this.typeCards");
  },
  methods: {
    // 卡片类型列表
    goCardsTypeList() {
      this.$axios
        .getRequest("/card-type", {
          type: this.typeCards,
        })
        .then((res) => {
          console.log(res, "卡片类型列表");
          this.cardsList = res;
        });
    },
    gobuyCardsCover(i, item) {
      if (this.typeCards == "balance") {
        uni.navigateTo({
          url: "/pages/index/buyCardes?slug=" + i.slug + "&itemimg=" + item,
        });
      } else {
        uni.navigateTo({
          url:
            "/pages/index/buyQualifyCards?slug=" + i.slug + "&itemimg=" + item,
        });
      }
    },
    gobuyCards(i) {
      console.log(i.slug);
      if (this.typeCards == "balance") {
        uni.navigateTo({
          url:
            "/pages/index/buyCardes?slug=" + i.slug + "&itemimg=" + i.posterUrl,
        });
      } else {
        uni.navigateTo({
          url:
            "/pages/index/buyQualifyCards?slug=" +
            i.slug +
            "&itemimg=" +
            i.posterUrl,
        });
      }
    },
    gobuyXDCards() {
      uni.navigateTo({
        url: "/pages/index/buyQualifyCards",
      });
    },
  },
};
</script>

<style lang="less">
.marsCardebox {
  width: 750rpx;

  .header {
    width: 750rpx;
    height: 320rpx;
    background: #d8d8d8;
  }

  .marsCarde_contentbox {
    .marsCarde_contentbox-content {
      margin: 30px 0;

      .contentbox-contentTitle {
        margin: 0 auto;
        width: 650rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
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

  .marsCarde_footerBox {
    width: 750rpx;
    position: fixed;
    bottom: 0;

    .marsCarde_footer {
      margin: 10rpx auto;
      width: 100rpx;
      height: 34rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #b5b5b5;
      line-height: 34rpx;
    }
  }
}
</style>
