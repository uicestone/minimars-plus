<template>
  <view class="buycards_box">
    <view class="buycards_top">
      <view class="buycards_top_box">
        <image :src="itemimg" mode="aspectFill"></image>
        <view class="cards_box">
          <view class="cards_box-left">
            ¥{{ cardsDetail.price }}
            <view class="cards_box_left-title">
              {{ cardsDetail.title }}
            </view>
          </view>
          <view class="cards_box-right" v-if="addAminus">
            <image
              src="../../static/images/minus.png"
              class="minus"
              @click="gonumberMinus"
            ></image>
            {{ number }}
            <image
              src="../../static/images/add.png"
              class="add"
              @click="gonumberAdd"
            ></image>
          </view>
        </view>
      </view>
    </view>
    <!-- 购买须知 -->
    <view class="buyQualifyCards_contentbox">
      <view class="buyQualifyCards_content">
        <view class="purchase_notes">
          <!-- 购买须知: -->
          <view class="purchase_notesBox">
            <rich-text :nodes="cardsDetail.content"></rich-text>
          </view>
        </view>
        <!-- <view class="warm_prompt">
					温馨提示:
				</view> -->
        <view class="buyQualifyCards_footer">
          <!-- 订单支付 -->
          <view class="buyQualifyCards_footerBox" @click="orderPlay">
            <view class="buyQualifyCards_footerBox_left">
              订单支付Payment
            </view>
            <view
              class="buyQualifyCards_footerBox_right"
              v-if="addAminus == true"
            >
              ￥{{ playcards }}
            </view>
            <view
              class="buyQualifyCards_footerBox_right"
              v-if="addAminus == false"
            >
              ￥{{ cardsDetail.price }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      addAminus: false,
      // cards: 2000,
      number: 0,
      playcards: 0,
      cardsDetail: {
        price: "",
        title: "",
        price: "",
        content: [],
      },
      slug: "",
      itemimg: "",
    };
  },
  onShow() {
    this.goCard();
    this.playcards = this.cardsDetail.price;
    // this.getCardsInformation()
  },
  onLoad(option) {
    this.slug = option.slug;
    this.itemimg = option.itemimg;
  },
  methods: {
    // 订单支付
    orderPlay() {
      let orderDetail = {};
      if (this.addAminus) {
        orderDetail = {
          slug: this.slug,
          quantity: this.number,
        };
      } else {
        orderDetail = {
          slug: this.slug,
        };
      }
      this.$axios.postRequest("/card", orderDetail).then((res) => {
        if (res.payments[0].payArgs) {
          //唤起微信支付
          uni.requestPayment({
            provider: "wxpay",
            timeStamp: res.payments[0].payArgs.timeStamp,
            nonceStr: res.payments[0].payArgs.nonceStr,
            package: res.payments[0].payArgs.package,
            signType: "MD5",
            paySign: res.payments[0].payArgs.paySign,
            success: function (res) {
              console.log("success:" + JSON.stringify(res));
              uni.showToast({
                title: "支付成功",
                duration: 2000,
              });
              uni.redirectTo({
                url: "../my/myCardBag", // 购买成功,跳到我的卡包
              });
            },
            fail: function (err) {
              console.log("fail:" + JSON.stringify(err));
            },
          });
        }
      });
    },

    gonumberMinus() {
      if (this.number != 0) {
        this.number--;
        this.playcards = this.playcards - this.cardsDetail.price;
      } else {
        this.number = 0;
      }
    },
    gonumberAdd() {
      this.number++;
      // this.playcards=this.playcards+this.cards
      this.playcards = this.cardsDetail.price * this.number;
    },
    // 卡片详情
    goCard() {
      this.$axios
        .getRequest("/card-type", {
          slug: this.slug,
        })
        .then((res) => {
          this.cardsDetail = res[0];
          console.log(this.cardsDetail);
          if (
            this.cardsDetail.type == "period" ||
            this.cardsDetail.type == "coupon"
          ) {
            this.addAminus = false;
          } else {
            this.addAminus = true;
          }
        });
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
            width: 218rpx;
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
      width: 550rpx;
      margin: 0 auto;
      padding-top: 40rpx;

      .purchase_notes,
      .warm_prompt {
        margin-bottom: 140rpx;
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
          color: #0d0d0d;
          line-height: 34rpx;
          // border: 1px solid red;
        }
      }

      .buyQualifyCards_footer {
        position: fixed;
        bottom: 0;
        width: 545rpx;
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
          height: 77rpx;
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
