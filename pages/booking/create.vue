<template lang="pug">
view.myOrder_box
  // 门店选择
  view.myOrder_top
    view.storesToChoose
      view.storesToChoose_choose
        view.title
          img(src="../../static/images/index/index_orderOne.png")
          view 门店选择
        view.content
          span
            lb-picker(
              mode="selector",
              :value="store",
              :list="stores.map((s) => s.name)",
              @confirm="selectStore",
              :footers="false"
            )
              view(slot="cancel-text") 取消
              view(slot="action-center") 门店选择
              view(slot="confirm-text") 确定
              view.uni-input {{ store }}
          img(src="../../static/images/search.png")
        view.title
          img(src="../../static/images/index/index_orderTwo.png")
          view 到访时间
        view.content.content_two(@click="goCalendar()")
          input(type="text", v-model="date", disabled)
          img.content_right(src="../../static/images/right.png")
        view.title
          img(src="../../static/images/index/index_orderThree.png")
          view 进场人数
        view.content
          span
            lb-picker(
              mode="unlinkedSelector",
              :value="adultsKidsSelectValue",
              :list="adultsKidsValues",
              list-key="id",
              :footers="true",
              @confirm="selectAdultsKidsCount"
            )
              view(slot="cancel-text") 儿童（位）
              view(slot="confirm-text") 成人（位）
              view.uni-input {{ adultsKidsText }}
              view(slot="picker-bottom_left") 取消Cancel
              view(slot="picker-bottom_right") 确定 Submit
          img.content_right(src="../../static/images/right.png")
  view.orderSpace
  view.modeOf_Payment
    view.modeOf_Payment_title 更多优惠支付方式
    scroll-view.modeOf_Payment-box(scroll-x="true")
      view.modeOf_Payment_scroll
        view.modeOf_Payment_box(
          v-for="(item, index) in cards",
          :key="index",
          @click="selectCard(index)"
        )
          img(
            mode="aspectFill",
            :src="item.posterUrl",
            :class="[selectedCardIndex == index ? 'selected' : '', !isCardAvailable(item) ? 'disabled' : '']"
          )
          view.modeOf_Payment_box_name
            | {{ item.title }}
            view(style="color: #9fcdff; font-size: 24rpx; margin-top: 5rpx")
              | Rmb
              span(style="font-size: 33rpx") {{ item.price }}
        view.modeOf_Payment_box
          view.modeOf_Payment_box_btn(
            style='\
          position: relative;\
          border: 1px solid #d8d8d8;\
          background-color: #d8d8d8;\
          '
          )
            view(@click="goBuyCards")
              view(
                style='\
              background-color: #9fcdff;\
              width: 80rpx;\
              height: 80rpx;\
              border-radius: 50%;\
              margin: 70rpx auto;\
              '
              )
                view(
                  style='\
                color: #ffffff;\
                margin-bottom: 50rpx;\
                font-size: 56rpx;\
                font-weight: bold;\
                text-align: center;\
                '
                ) +
          view.modeOf_Payment_box_name 点击购买新卡
      // 礼品卡  弹框
      uni-popup(ref="cardContentPopup", type="center")
        view.gift_box
          view.gift_box_clear
            view.gift_box_clear_left
            img.gift_box_clear_right(
              src="../../static/images/clear.png",
              @click="closeCardContent()"
            )
          view.gift_contentBox
            view.gift_contentBox_title 礼品卡使用说明
            scroll-view.gift_contentBox_box(scroll-y="true")
              view.gift_contentBox_boxContent
                rich-text(:nodes="cardContent")
            view.gift_contentBox_btn(@click="closeCardContent")
              view.gift_contentBox_btn_name 确认 Agree
    // 订单支付
    view.modeOf_Payment_order
      view.modeOf_Payment_order_money 还需支付：{{ price }} 元
      // 
      view.modeOf_Payment_order_play(@click="goPlay")
        view.modeOf_Payment_order_play_name
          | 提交预约
          br
          | Submit
</template>

<script>
import { sync } from "vuex-pathify";

export default {
  data() {
    return {
      store: "",
      index: 0,
      stores: [],
      price: 0,
      adultsKidsValues: [
        [...Array(10).keys()].map((n) => ({ label: n + 1, value: n + 1 })),
        [...Array(10).keys()].map((n) => ({ label: n + 1, value: n + 1 })),
      ],
      adultsKidsSelectValue: [0, 0], // picker - 索引
      selectedCardIndex: -1,
      booking: {
        type: "play",
        store: " ", //门店ID
        date: "", //到访时间
        kidsCount: 1, //儿童人数
        adultsCount: 1, //成人人数
        card: "", //礼品卡ID
      },
      cards: [], //礼品卡
      cardContent: "", //礼品卡使用说明
      cardId: "",
    };
  },
  computed: {
    user: sync("auth/user"),
    date: sync("booking/newBookingDate"),
    adultsKidsText() {
      return (
        this.booking.kidsCount +
        " 儿童" +
        "，" +
        this.booking.adultsCount +
        " 成人"
      );
    },
  },
  onLoad(option) {
    if (this.user.store) {
      this.store = user.store.name;
      this.booking.store = this.store.id;
    } else {
      this.store = "";
    }

    if (option.date) {
      this.date = option.date;
    }

    this.booking.date = this.date;

    this.goStore();
    this.goCard();
    this.getPrice();
  },

  methods: {
    // 门店
    goStore() {
      this.$axios.getRequest("/store").then((res) => {
        this.stores = res;
        this.store = res[0].name;
        this.booking.store = res[0].id;
      });
    },
    // 获取门店ID
    getStore() {
      this.stores.forEach((item) => {
        if (item.name == this.store) {
          this.booking.store = item.id;
          this.getPrice();
        }
      });
    },
    // 卡片
    goCard() {
      this.$axios.getRequest("/card").then((res) => {
        this.cards = res;
      });
    },
    // 去购卡
    goBuyCards() {
      this.goCard();
      uni.redirectTo({
        url: "../index/marsCoupon",
      });
    },
    // 计算价格
    getPrice() {
      this.$axios.postRequest("/booking-price", this.booking).then((res) => {
        this.price = res.price;
      });
    },

    // 订单支付
    goPlay() {
      this.booking.date = this.date; //时间
      this.booking.type = "play";
      this.$axios.postRequest("/booking", this.booking).then((res) => {
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
            },
            fail: function (err) {
              console.log("fail:" + JSON.stringify(err));
            },
          });
        } else {
          this.goOrder(); //跳转订单
          uni.showToast({
            title: "预约成功",
            duration: 2000,
          });
        }
      });
    },
    // 跳转订单页面
    goOrder() {
      uni.redirectTo({
        url: "../my/bookings?active=1",
      });
    },
    //日历
    goCalendar() {
      uni.navigateTo({
        url: "./calendar",
      });
    },

    selectStore(e) {
      this.store = e.value;
      this.getStore();
      this.goCard();
      this.getPrice();
    },
    selectAdultsKidsCount(e) {
      this.booking.kidsCount = +e.item[0].label;
      this.booking.adultsCount = +e.item[1].label;
      this.adultsKidsSelectValue = e.index;
      this.getPrice();
    },
    selectCard(index) {
      const card = this.cards[index];
      if (!this.isCardAvailable(card)) return;

      if (this.selectedCardIndex === index) {
        this.selectedCardIndex = -1;
        this.booking.card = undefined;
      } else {
        this.selectedCardIndex = index;
        this.booking.card = card.id;
        this.showCardContent(card);
      }
      this.getPrice();
    },
    isCardAvailable(card) {
      if (!this.booking.store) return false;
      if (card.stores.length === 0) return true;
      if (card.stores.includes(this.booking.store)) return true;
      return false;
    },
    showCardContent(card) {
      this.cardContent = card.content;
      this.$refs.cardContentPopup.open();
    },
    closeCardContent() {
      this.$refs.cardContentPopup.close();
    },
  },
};
</script>

<style lang="less">
.myOrder_box {
  background-color: #f8f8f8;
  // min-height: 1100rpx;
  height: 100vh;

  // 门店选择
  .myOrder_top {
    position: relative;
    width: 750rpx;
    height: 330rpx;
    background: #d8d8d8;

    .storesToChoose {
      height: 520rpx;
      position: absolute;
      margin-top: 85rpx;
      right: 30rpx;
      width: 690rpx;
      display: flex;
      justify-content: space-around;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 4rpx 4rpx rgba(0, 0, 0, 0.03);
      border-radius: 20rpx;

      .storesToChoose_choose {
        height: 170rpx;

        .title {
          display: flex;
          margin-top: 20rpx;

          image {
            width: 40rpx;
            height: 40rpx;
            background: #d8d8d8;
          }

          view {
            margin-left: 30rpx;
            width: 112rpx;
            height: 40rpx;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #949397;
            line-height: 40rpx;
          }
        }

        .content {
          width: 594rpx;
          height: 80rpx;
          line-height: 80rpx;
          border-radius: 40rpx;
          border: 4rpx solid #dfdfdf;
          display: flex;
          justify-content: space-between;
          margin-top: 15rpx;

          input {
            margin-left: 30rpx;
            font-size: 30rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 500;
            color: #373447;
            margin-top: 20rpx;
          }

          span {
            width: 550rpx;
            margin-left: 30rpx;
            font-size: 30rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 500;
            color: #373447;
          }

          image {
            width: 31rpx;
            height: 31rpx;
            margin-right: 25rpx;
            margin-top: 28rpx;
          }
        }

        // 到访时间
        .content_two {
          width: 352rpx;
          height: 80rpx;
          border-radius: 40rpx;
          border: 4rpx solid #dfdfdf;
        }
      }
    }
  }

  .orderSpace {
    width: 750rpx;
    height: 300rpx;
  }

  // 更多优惠
  .modeOf_Payment {
    // border: 1px solid red;
    min-height: 620rpx;

    .modeOf_Payment_title {
      width: 690rpx;
      margin: 0 auto;
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: #373447;
      margin-bottom: 20rpx;
    }

    .modeOf_Payment-box {
      .modeOf_Payment_scroll {
        display: flex;
        // justify-content: space-around;
        width: 690rpx;
        margin: 0 auto;

        .modeOf_Payment_box {
          margin: 0 20rpx;
          opacity: 1;

          image {
            width: 380rpx;
            height: 230rpx;
            border-radius: 10rpx;
          }

          .selected {
            border-bottom: 10rpx solid #42ff62;
            box-sizing: border-box;
          }

          .disabled {
            opacity: 0.5;
          }

          .modeOf_Payment_box_btn {
            width: 280rpx;
            height: 230rpx;
            border-radius: 10rpx;
          }

          .modeOf_Payment_box_name {
            font-size: 25rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 600;
            color: #373447;
            margin: 10rpx 0;
          }
        }
      }

      // 礼品卡弹框
      .gift_box {
        width: 600rpx;
        height: 940rpx;
        background: #ffffff;
        border-radius: 52rpx;
        background: #ffffff;

        .gift_box_clear {
          padding-top: 30rpx;
          width: 540rpx;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;

          .gift_box_clear_left {
            width: 40rpx;
            height: 40rpx;
          }

          .gift_box_clear_right {
            width: 40rpx;
            height: 40rpx;
          }
        }

        .gift_contentBox {
          width: 600rpx;
          margin: 0 auto;
          text-align: center;

          .gift_contentBox_title {
            width: 220rpx;
            // height: 42rpx;
            font-size: 30rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #1a1a1a;
            line-height: 42rpx;
            margin: 0 auto 20rpx;
          }

          .gift_contentBox_box {
            width: 570rpx;
            height: 690rpx;
            margin: 0 auto;

            .gift_contentBox_boxContent {
              text-align: left;
            }
          }

          .gift_contentBox_btn {
            width: 246rpx;
            height: 78rpx;
            background: #9fcdff;
            border-radius: 39rpx;
            margin: 0 auto;
            // margin-top: 15rpx;

            .gift_contentBox_btn_name {
              width: 78rpx;
              height: 40rpx;
              font-size: 28rpx;
              text-align: center;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 35rpx;
              margin: 0 auto;
              padding: 5rpx 0;
            }
          }
        }
      }
    }

    .modeOf_Payment_order {
      display: flex;
      justify-content: space-between;
      width: 666rpx;
      // height: 140rpx;
      margin: 0 auto;
      line-height: 140rpx;
      margin-top: 55rpx;

      .modeOf_Payment_order_money {
        font-size: 30rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 550;
        color: #373447;
        margin-top: 40rpx;
      }

      .modeOf_Payment_order_play {
        margin-top: 35rpx;
        background-color: #9fcdff;
        width: 220rpx;
        height: 95rpx;
        border-radius: 70rpx;

        .modeOf_Payment_order_play_name {
          margin: 5rpx auto;
          font-size: 28rpx;
          text-align: center;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 540;
          color: #ffffff;
          line-height: 35rpx;
          padding-top: 10rpx;
        }
      }
    }
  }
}
</style>
