<template lang="pug">
view.buycards_box
  view.buycards_top
    view.buycards_top_box
      img(:src="cover", mode="aspectFill")
      span {{ cardsDetail.title }}
  view.buycards_contentall
    view.buycards_content
      view.buycards_content-title 充值金额选择
      view.buycards_content-Bigbox
        view.buycards_content-box
          view.buycards_content-boxone(
            v-for="(item, index) in balancePriceGroups",
            :key="index"
          )
            view.buycards_contentBody
              view.buycards_contentBody-left
                span {{ item.count }}
              view.buycards_contentBody-right(@click="goaddMoney(item._id)")
                img(src="../../static/images/add.png")
              view.buycards_contentBody-image(@click="open(item)")
            span {{ item.balance }}
          uni-popup(ref="popup", type="bottom", :tabbar="false")
            view.login_box
              view.login_box_clear
                view.login_box_clear_left
                img.login_box_clear_right(
                  src="../../static/images/clear.png",
                  @click="close()"
                )
              view.buycardsBox_top
                img.buycardsBox_top_leftimg(
                  src="../../static/images/index/indexRecharge.png"
                )
                view.buycardsBox_top_right
                  view ¥{{ balanceItem.price }}
                  view {{ balanceItem.balance }}
              view.buycardsBox_footer
                view.buycardsBox_footer_left
                  scroll-view.gift_contentBox_box(scroll-y="true")
                    view.title 使用须知：
                    view.spanContent
                      rich-text(:nodes="content")
                view.buycardsBox_footer_right
    // footer
    view.buycards_footer
      // 订单支付
      view.modeOf_Payment_order
        view.modeOf_Payment_order_money
          view {{ totalCount }}张
          |
          | 总计 ¥ {{ price.toFixed(2) }}
        view.modeOf_Payment_order_play
          view.modeOf_Payment_order_play_name(@click="pay")
            | 确认购买
            br
            | Order
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
export default {
  components: {
    uniPopup,
  },
  data() {
    return {
      slug: "",
      cardType: {
        title: "",
        price: "",
        content: "",
        balancePriceGroups: [],
      },
      content: "",
      balancePriceGroups: [], //充值金额选择
      balanceItem: {
        balance: 0,
        price: 0,
      }, //弹框的模块
      cover: "",
    };
  },
  onLoad(option) {
    this.slug = option.slug;
    this.cover = option.cover;
  },
  onShow() {
    this.getCardType();
  },
  methods: {
    // 卡片详情
    async getCardType() {
      this.cardType = await this.$axios.getRequest(`/card-type/${this.slug}`);
      this.content = this.cardType.content || "";
      this.content = this.content
        .replace(/<p([ >])/g, '<p class="p"$1')
        .replace(/<ol([ >])/g, '<ol class="ol"$1')
        .replace(/<ul([ >])/g, '<ul class="ul"$1');
      this.cardType.balancePriceGroups.forEach((group) => {
        this.balancePriceGroups.push({ ...group, count: 0, total: 0 });
      });
    },
    // 创建订单
    async pay() {
      let neworder = [];
      this.balancePriceGroups.forEach((i) => {
        neworder.push({
          balance: i.balance,
          count: i.count,
        });
      });
      const card = await this.$axios.postRequest("/card", {
        slug: this.slug,
        balanceGroups: neworder,
      });
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
    open(item) {
      console.log(item, "item");
      this.balanceItem = item;
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    goaddMoney(id) {
      this.balancePriceGroups.forEach((i) => {
        if (id == i._id) {
          i.count = i.count + 1;
        }
      });
    },
  },
  computed: {
    totalCount() {
      return this.balancePriceGroups.reduce(
        (count, group) => count + group.count,
        0
      );
    },
    price() {
      return this.balancePriceGroups.reduce(
        (price, group) => +(price + group.count * group.price).toFixed(6),
        0
      );
    },
  },
};
</script>

<style lang="less">
.buycards_box {
  width: 750rpx;
  background: #f8f8f8;
  height: 100vh;

  .buycards_top {
    padding: 100rpx 0;

    .buycards_top_box {
      width: 550rpx;
      margin: 0 auto;

      image {
        width: 550rpx;
        height: 370rpx;
        background: #d8d8d8;
        box-shadow: 4rpx 4rpx 6rpx 4rpx rgba(204, 204, 204, 0.5);
        border-radius: 16rpx;
      }

      span {
        width: 218rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #0d0d0d;
        line-height: 40rpx;
      }
    }
  }

  // 充值金额选择
  .buycards_contentall {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 16rpx 8rpx rgba(186, 186, 186, 0.5);

    .buycards_content {
      width: 660rpx;
      margin: 0 auto;
      height: 360rpx;

      .buycards_content-title {
        padding-top: 32rpx;
        margin-bottom: 32rpx;
        width: 176rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 550;
        color: #0d0d0d;
        line-height: 40rpx;
      }

      .buycards_content-Bigbox {
        .buycards_content-box {
          width: 580rpx;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;

          .buycards_content-boxone {
            text-align: center;
            margin: 0 auto;
            width: 145rpx;

            .buycards_contentBody {
              width: 140rpx;
              height: 140rpx;
              border-radius: 140rpx;
              position: relative;
              margin-bottom: 20rpx;

              .buycards_contentBody-left {
                position: absolute;
                border-radius: 42rpx;
                width: 42rpx;
                height: 42rpx;
                background: #9fcdff;
                border: 4rpx solid #fffbfb;

                span {
                  // width: 20rpx;
                  // height: 44rpx;
                  font-size: 32rpx;
                  font-family: PingFangSC-Semibold, PingFang SC;
                  font-weight: 600;
                  color: #ffffff;
                  line-height: 44rpx;
                  z-index: 1;
                }
              }

              .buycards_contentBody-right {
                z-index: 1;
                position: absolute;
                bottom: 0;
                right: 0;
                width: 42rpx;
                height: 42rpx;

                image {
                  width: 42rpx;
                  height: 42rpx;
                  background-color: #ffffff;
                  border-radius: 42rpx;
                }
              }

              .buycards_contentBody-image {
                margin: 0 auto;
                width: 140rpx;
                height: 140rpx;
                background: url(../../static/images/index/indexRecharge.png)
                  no-repeat;
                background-size: 100%;
                border: 2rpx solid #979797;
                border-radius: 140rpx;
              }
            }
          }
        }

        // 使用须知
        .login_box {
          width: 750rpx;
          height: 716rpx;
          background: #ffffff;
          border-radius: 24rpx 24rpx 0rpx 0rpx;

          .login_box_clear {
            padding-top: 30rpx;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            margin: 0 15rpx;

            .login_box_clear_left {
              width: 40rpx;
              height: 40rpx;
            }

            .login_box_clear_right {
              width: 40rpx;
              height: 40rpx;
            }
          }

          .buycardsBox_top {
            border-bottom: 5rpx solid #979797;
            display: flex;
            width: 672rpx;
            height: 200rpx;
            margin: 0 auto;

            .buycardsBox_top_leftimg {
              border: 2rpx solid #979797;
              width: 140rpx;
              height: 140rpx;
              border-radius: 140rpx;
            }

            .buycardsBox_top_right {
              margin-top: 65rpx;
              margin-left: 20rpx;
              width: 218rpx;
              height: 40rpx;
              font-size: 28rpx;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #0d0d0d;
              line-height: 40rpx;
              text-align: left;
            }
          }

          .buycardsBox_footer {
            display: flex;
            justify-content: space-between;
            width: 672rpx;
            margin: 0 auto;

            .buycardsBox_footer_left {
              text-align: left;
              width: 90%;
              margin: 0 auto;

              .title {
                width: 146rpx;
                height: 40rpx;
                font-size: 28rpx;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #0d0d0d;
              }

              .gift_contentBox_box {
                height: 440rpx;
                .title {
                  margin-top: 30rpx;
                }
                .spanContent {
                  margin-top: 10rpx;
                  font-size: 24rpx;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #0d0d0d;
                }
              }
            }

            .buycardsBox_footer_right {
              width: 8rpx;
              height: 376rpx;
              background: #777676;
              border-radius: 2rpx;
            }
          }
        }
      }
    }

    // 底部
    .buycards_footer {
      // border: 1px solid red;
      width: 750rpx;
      height: 225rpx;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 16rpx 8rpx rgba(186, 186, 186, 0.5);
      // position: fixed;
      // bottom: 0;

      .modeOf_Payment_order {
        display: flex;
        justify-content: space-between;
        width: 666rpx;
        margin: 0 auto;

        .modeOf_Payment_order_money {
          font-size: 30rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 550;
          color: #373447;
          margin-top: 80rpx;

          view {
            font-size: 30rpx;
            font-weight: 600;
            color: #6d6d6d;
          }
        }

        .modeOf_Payment_order_play {
          margin-top: 65rpx;
          background-color: #9fcdff;
          width: 220rpx;
          height: 95rpx;
          border-radius: 70rpx;

          .modeOf_Payment_order_play_name {
            margin: 5rpx auto;
            font-size: 28rpx;
            text-align: center;
            font-weight: 540;
            color: #ffffff;
            line-height: 35rpx;
            padding-top: 10rpx;
          }
        }
      }
    }
    // end
  }
}
</style>
