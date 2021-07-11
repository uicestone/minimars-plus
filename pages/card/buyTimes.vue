<template lang="pug">
view.buycards_box
  view.buycards_top
    view.buycards_top_box
      img(:src="cover", mode="aspectFill")
      view.cards_box
        view.cards_box-left
          | {{ cardType.title }}
          view.cards_box_left-title rmb {{ cardType.price }}
        view.cards_box-right(v-if="buyMultiple")
          view.img-box.minus.cover-mask--small
            img(
              src="../../static/images/minus.png",
              @click="() => { if (number > 1) number--; }"
            )
{{ number }}
          view.img-box.add.cover-mask--small
            img(src="../../static/images/add.png", @click="number++")
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
      view.buyQualifyCards_footer(@click="pay")
        view(style="text-align:center") 订单支付 PAYMENT
        view ￥{{ price }}
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
    padding: 130rpx 0 44rpx;

    .buycards_top_box {
      width: 550rpx;
      margin: 0 auto;

      > image {
        width: 550rpx;
        height: 370rpx;
        box-shadow: 4rpx 4rpx 6rpx 4rpx rgba(204, 204, 204, 0.5);
        border-radius: var(--theme--border-radius);
      }

      .cards_box {
        display: flex;
        justify-content: space-between;
        margin-top: 50rpx;

        .cards_box-left {
          font-size: var(--theme--font-size-s);
          font-weight: var(--theme--font-weight-light);
          line-height: 42rpx;

          .cards_box_left-title {
            width: 320rpx;
            height: 40rpx;
            font-size: var(--theme--font-size-m);
            font-weight: var(--theme--font-weight-medium);
          }
        }

        .cards_box-right {
          align-items: center;
          width: 164rpx;
          display: flex;
          justify-content: space-between;
          font-size: var(--theme--font-size-m);

          .minus {
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
          }

          .add {
            box-shadow: none;
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
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

        color: #0d0d0d;

        .purchase_notesBox {
          font-size: var(--theme--font-size-s);

          line-height: 42rpx;
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
        width: 594rpx;
        height: 102rpx;
        background: var(--theme--main-color);
        border-radius: var(--theme--border-radius);
        font-size: var(--theme--font-size-m);
        box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(215, 215, 215, 0.3);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 36rpx;
        justify-content: space-between;
        white-space: nowrap;
      }
    }
  }
}
</style>
