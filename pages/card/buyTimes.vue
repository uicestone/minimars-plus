<template lang="pug">
view.buycards_box
  view.buycards_top
    view.buycards_top_box
      img(:src="cover", mode="aspectFill")
      view.cards_box
        view.cards_box-left
          | ¥{{ cardType.price }}
          view.cards_box_left-title {{ cardType.title }}
        view.cards_box-right(v-if="buyMultiple")
          img.minus(src="../../static/images/minus.png", @click="number--")
          | {{ number }}
          img.add(src="../../static/images/add.png", @click="number++")
  // 购买须知
  view.buyQualifyCards_contentbox
    view.buyQualifyCards_content
      view.purchase_notes
        // 购买须知:
        view.purchase_notesBox
          rich-text(:nodes="content")
      //
        <view class="warm_prompt">
        温馨提示:
        </view>
      view.buyQualifyCards_footer
        // 订单支付
        view.buyQualifyCards_footerBox(@click="pay")
          view.buyQualifyCards_footerBox_left(style="text-align:center")
            | 确认购买
            br
            | Order
          view.buyQualifyCards_footerBox_right ￥{{ price }}
</template>

<script>
export default {
  data() {
    return {
      buyMultiple: false,
      number: 1,
      cardType: {
        price: "",
        title: "",
        price: "",
        content: "",
      },
      content: "",
      slug: "",
      cover: "",
    };
  },
  onShow() {
    this.getCardTypeDetail();
  },
  onLoad(option) {
    this.slug = option.slug;
    this.cover = option.cover;
  },
  methods: {
    // 订单支付
    async pay() {
      let orderDetail = {};
      if (this.buyMultiple) {
        orderDetail = {
          slug: this.slug,
          quantity: this.number,
        };
      } else {
        orderDetail = {
          slug: this.slug,
        };
      }
      const card = await this.$axios.postRequest("/card", orderDetail);
      if (card.payments[0].payArgs) {
        //唤起微信支付
        uni.requestPayment({
          provider: "wxpay",
          timeStamp: card.payments[0].payArgs.timeStamp,
          nonceStr: card.payments[0].payArgs.nonceStr,
          package: card.payments[0].payArgs.package,
          signType: "MD5",
          paySign: card.payments[0].payArgs.paySign,
          success: function (res) {
            console.log("success:" + JSON.stringify(res));
            uni.showToast({
              title: "支付成功",
              duration: 2000,
            });
            uni.redirectTo({
              url: "../my/cards", // 购买成功,跳到我的卡包
            });
          },
          fail: function (err) {
            console.log("fail:" + JSON.stringify(err));
          },
        });
      }
    },
    // 卡片详情
    async getCardTypeDetail() {
      this.cardType = await this.$axios.getRequest(`/card-type/${this.slug}`);
      this.content = this.cardType.content || "";
      this.content = this.content
        .replace(/<p([ >])/g, '<p class="p"$1')
        .replace(/<ol([ >])/g, '<ol class="ol"$1')
        .replace(/<ul([ >])/g, '<ul class="ul"$1');

      this.buyMultiple = this.cardType.type === "times";
    },
  },
  computed: {
    price() {
      return this.cardType.price * this.number;
    },
  },
};
</script>

<style lang="less">
.buycards_box {
  width: 750rpx;
  background: #f8f8f8;

  .buycards_top {
    padding: 100rpx 0;

    .buycards_top_box {
      width: 550rpx;
      margin: 0 auto;

      image {
        width: 550rpx;
        height: 370rpx;
        box-shadow: 4rpx 4rpx 6rpx 4rpx rgba(204, 204, 204, 0.5);
        border-radius: 16rpx;
      }

      .cards_box {
        display: flex;
        justify-content: space-between;
        margin-top: 20rpx;

        .cards_box-left {
          width: 108rpx;
          height: 44rpx;
          font-size: 32rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #0d0d0d;
          line-height: 44rpx;

          .cards_box_left-title {
            width: 320rpx;
            height: 40rpx;
            font-size: 28rpx;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #0d0d0d;
            line-height: 40rpx;
          }
        }

        .cards_box-right {
          align-items: center;
          width: 200rpx;
          display: flex;
          justify-content: space-between;

          .minus {
            width: 68rpx;
            height: 68rpx;
            border-radius: 68rpx;
            box-shadow: none;
          }

          .add {
            box-shadow: none;
            width: 68rpx;
            height: 68rpx;
            border-radius: 68rpx;
          }
        }
      }
    }
  }

  // 购买须知
  .buyQualifyCards_contentbox {
    width: 750rpx;
    background: #ffffff;

    .buyQualifyCards_content {
      width: 80%;
      margin: 0 auto;
      padding-top: 40rpx;

      .purchase_notes,
      .warm_prompt {
        padding-bottom: 200rpx;
        // width: 126rpx;
        min-height: 34rpx;
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0d0d0d;
        line-height: 34rpx;

        .purchase_notesBox {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 1.25;
          color: #525252;
          .p {
            margin-bottom: 0.5rem;
          }
          .ol {
            margin-top: 1em;
            margin-bottom: 1em;
            padding-left: 1.5rem;
          }
        }
      }

      .buyQualifyCards_footer {
        position: fixed;
        bottom: 50rpx;
        width: 80%;
        height: 102rpx;
        background: #9fcdff;
        box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(215, 215, 215, 0.3);
        border-radius: 52rpx;
        line-height: 10rpx;

        .buyQualifyCards_footerBox {
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          width: 500rpx;
          height: 82rpx;
          align-items: center;

          .buyQualifyCards_footerBox_left,
          .buyQualifyCards_footerBox_right {
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }

          .buyQualifyCards_footerBox_left {
            font-size: 28rpx;
            width: 120rpx;
            line-height: 30rpx;
            height: 40rpx;
          }

          .buyQualifyCards_footerBox_right {
            height: 15rpx;
            width: 140rpx;
            font-size: 42rpx;
            line-height: 30rpx;
          }
        }
      }
    }
  }
}
</style>
