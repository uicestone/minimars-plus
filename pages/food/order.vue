<template lang="pug">
view.foodchooseBox
  view.foodchooseBox_content
    view.foodchooseBox_top
      view.foodchooseBox_top-box
        view.foodchooseBox_top_one(
          v-for="(item, index) in foodCart",
          :key="index"
        )
          img.topimg(:src="item.imageUrl")
          view.foodchooseBox_top_one_title
            view.foodchooseBox_top_one_name
              view {{ item.name }}
              view.foodchooseBox_top_one_add_reduce
                view.btn(
                  @click="itemAdd(item, -1)",
                  :class="{ disabled: !item.numbers }"
                )
                  img.itemreduce-img(src="/static/images/minus_deputy.png")
                view.btn(@click="itemAdd(item, 1)")
                  img.itemAdd-img(src="/static/images/add_deputy.png")
            view.foodchooseBox_top_one_moneybox
              view.foodchooseBox_top_one_number ×{{ item.numbers }} {{ item.comment || '' }}
              view.foodchooseBox_top_one_money rmb {{ ((item.sellPrice + item.extraPrice) * item.numbers) | round(2) }}
        //- view.foodchooseBox_top_one(
          v-for="(item, index) in replacebox",
          :key="index"
        //- )
          img.topimg(src="../../static/images/my/my-banner.png")
          view.foodchooseBox_top_one_title
            view.foodchooseBox_top_one_name 火龙果蓝莓奶昔
            view.foodchooseBox_top_one_moneybox
              view.foodchooseBox_top_one_money
                | ￥
                span 29.9
              view.foodchooseBox_top_one_number x1
        view.foodchooseBox_top-box_discounts
          view.foodchooseBox_top-box_discounts_left
            img.discounts_leftimg(
              src="../../static/images/orderFood/food-coupon.png"
            )
            view 优惠券
          view.foodchooseBox_top-box_discounts_right
            //- view 无可用优惠券
            //- img.discounts_rightimg(src="../../static/images/111.png")
            view 暂不支持，请到吧台核销餐饮优惠券
        view.foodchooseBox_top-box_count
          view
            view(style="margin-right:30rpx") {{ order.tableId }}
            view 共{{ sum }}件
          view 合计 rmb {{ totalPrice }}
    view.remarks
      view.title 订单备注
      textarea(v-model="order.remarks")
    // 超值换购
    //- view.bargain_buy
      //
        <view class="bargain_buy_title">
        超值换购
        </view>
        <view class="bargain_buybox">
        <view class="bargain_buybox_content" v-for="(item,index) in foods " :key="index">
        <view class="bargain_buybox_content_box">
        <view class="bargain_buybox_content_image">
        <image src="../../static/images/224.jpg" class="bargain_buybox_content-img" @click="open(index)" />
        <view class="bargain_buybox_btn-imgbox" v-show="item.buyadd" @click="goadd(index)">
        <image src="../../static/images/orderFood/foodchooseAdd.png" class="bargain_buybox_btn-img" />
        </view>
        <view class="bargain_buybox_btn-imgbox" v-show="item.buyadd==false" @click="goMinus(index)">
        <image src="../../static/images/orderFood/foodchooseMinus.png" class="bargain_buybox_btn-imgMinus" />
        </view>
        </view>
        <view class="bargain_buybox_content_detail" @click="open(index)">
        <view class="bargain_buybox_content_title">火龙果蓝莓奶昔</view>
        <view class="bargain_buybox_content_detail_box">
        <view class="bargain_buybox_content_detail_left"><span>¥ </span> 29.9</view>
        <view class="bargain_buybox_content_detail_right">
        <span>¥</span>38
        <view class="bargain_buybox_content_detail_rightline"></view>
        </view>
        </view>
        </view>
        </view>
        </view>
        </view>
      // 详情
      uni-popup(ref="popup", type="center")
        view.gift_box
          view.gift_box_top
            img(src="../../static/images/my/my-banner.png", mode="aspectFill")
            view.gift_box_top-close
              img.gift_box_clear_right(
                src="../../static/images/clear.png",
                @click="close()"
              )
          view.gift_box_top_content
            view.gift_box_top_content-title 至尊肉食主义拼盘
            view.gift_box_top_content-box 卡真鸡腿肉，羊排，西冷牛排，芝士肠， 维也纳肠
          view.gift_box_top_footer
            view.gift_box_top_footer-leftbox
              view.gift_box_top_footer-left
                | ￥
                span 28
              view.bargain_buybox_content_detail_right
                span ¥
                | 38
                view.bargain_buybox_content_detail_rightline
            view.gift_box_top_footer-right(@click="goAddClose()")
              img(src="../../static/images/add.png")
    // 请选择支付方式
    //
      <view class="modeOfPayment">
      <view class="modeOfPayment_Box">
      <view class="modeOfPayment_Box_title">
      请选择支付方式
      </view>
      <view class="modeOfPayment_gift_box">
      <view class="modeOfPayment_gift_title">
      礼品卡
      </view>
      <view class="modeOfPayment_gift_titlechoose">
      选择您的礼品卡
      </view>
      <view class="modeOfPayment_gift_content_box">
      <scroll-view scroll-x="true" class="modeOf_Payment-box">
      <view class="modeOf_Payment_scroll">
      <view class="modeOf_Payment_box" v-for="(item,index) in cardList" :key="index">
      <image :src="item.imageUrl" mode="aspectFill" />
      </view>
      </view>
      </scroll-view>
      </view>
      </view>
      <view class="wxModeOfPayment">
      <view class="wxModeOfPayment_left">微信支付</view>
      <view class="wxModeOfPayment_right" @click="gowxSelected">
      <image src="../../static/images/orderFood/foodchooseSelected.png" class="wxModeOfPayment_rightimg" v-show="wxSelected" />
      </view>
      </view>
      </view>
      </view>
    // 立即支付
    view.orderFood_choose
      view.orderFood_choose-left
        img.orderFood_choose-left_img(
          src="../../static/images/orderFood/food-cart.png"
        )
        view.orderFood_choose-left-line
        view.orderFood_choose-left_money
          | rmb {{ totalPrice }}
          text.balance-amount(v-if="balanceAmount") 其中余额：{{ balanceAmount }}
      view.orderFood_choose-right(@click="createOrder")
        view.orderFood_choose-right-choose 确认下单
        img(src="../../static/images/orderFood/white_right.png")
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import { create as createBooking } from "@/utils/booking.js";
import { confirm } from "@/utils/modal.js";
import { sync } from "vuex-pathify";

export default {
  components: {
    uniPopup,
  },
  data() {
    return {
      wxSelected: false,
      foods: [
        {
          buyadd: true,
        },
        {
          buyadd: true,
        },
        {
          buyadd: true,
        },
      ],
      replacebox: [],
      selectshop: [],
      cardList: [],
      order: {
        type: "food",
        store: "",
        tableId: "",
        items: [],
        remarks: "",
      },
    };
  },
  computed: {
    user: sync("auth/user"),
    foodCart: sync("booking/foodCart"),
    sum() {
      return this.foodCart.reduce((sum, item) => sum + item.numbers, 0);
    },
    totalPrice() {
      return this.foodCart.reduce(
        (total, item) =>
          +(
            total +
            (item.sellPrice + (item.extraPrice || 0)) * item.numbers
          ).toFixed(10),
        0
      );
    },
    balanceAmount() {
      return Math.min(this.totalPrice, this.user.balance);
    },
  },
  onLoad(option) {
    this.order.store = option.storeId;
    this.order.tableId = option.tableId;
    this.loadItems();
  },
  methods: {
    loadItems() {
      if (!this.foodCart.length) {
        uni.navigateBack();
        return;
      }
      this.order.items = this.foodCart.map((item) => ({
        productUid: item.uid,
        quantity: item.numbers,
        comment: item.comment,
      }));
    },
    //创建订单
    async createOrder() {
      if (this.balanceAmount) {
        await confirm(
          `确认使用账户余额支付吗？`,
          `将从您的账户余额扣除${this.balanceAmount}元`
        );
      }
      createBooking(this.order);
    },

    async itemAdd(i, quantity) {
      if (i.numbers <= 0 && quantity < 0) return;
      if (i.numbers + quantity <= 0) {
        await confirm(
          "确定删除该项吗？",
          `将从购物车中移除：${i.name}${i.comment ? `（${i.comment}）` : ""}`
        );
      }
      const item = this.foodCart.find(
        (item) => i.uid === item.uid && i.comment === item.comment
      );
      if (!item) return;
      item.numbers += quantity;
      if (item.numbers <= 0) {
        this.foodCart = this.foodCart.filter(
          (i) => !(i.uid === item.uid && i.comment === item.comment)
        );
      } else {
        this.foodCart = [...this.foodCart];
      }
      this.loadItems();
    },

    //获取卡列表
    getCardList() {
      this.$axios
        .getRequest("/card-type", {
          type: "coupon",
        })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((i) => {
              this.cardList.push(i);
            });
            this.$axios
              .getRequest("/card-type", {
                type: "balance",
              })
              .then((result) => {
                if (res.length > 0) {
                  res.forEach((j) => {
                    this.cardList.push(j);
                  });
                }
              });
            console.log(this.cardList);
          } else {
            this.$axios
              .getRequest("/card-type", {
                type: "balance",
              })
              .then((result) => {
                if (res.length > 0) {
                  res.forEach((item) => {
                    this.cardList.push(item);
                  });
                }
              });
            console.log(this.cardList);
          }
        });
    },

    gowxSelected() {
      if (this.wxSelected) {
        this.wxSelected = false;
      } else {
        this.wxSelected = true;
      }
    },
    open(index) {
      this.$refs.popup.open();
      // this.checkImage1 = index;
    },
    close() {
      this.$refs.popup.close();
    },
    goAddClose() {
      this.close();
    },
    goadd(index) {
      this.replacebox.push({
        id: 1,
      });
      this.foods[index].buyadd = false;
    },
    goMinus(index) {
      this.replacebox.splice(0, 1);
      this.foods[index].buyadd = true;
    },
  },
};
</script>

<style lang="less" scoped>
.foodchooseBox {
  width: 750rpx;
  background: #f8f8f8;
  min-height: 100vh;
  padding-top: 20rpx;

  .foodchooseBox_content {
    .foodchooseBox_top {
      margin-bottom: 30rpx;
      background: #ffffff;

      .foodchooseBox_top-box {
        width: 654rpx;
        margin: 0 auto;
        padding-top: 20rpx;

        .foodchooseBox_top_one {
          display: flex;
          justify-content: space-between;
          margin: 30rpx 0;

          // 图片
          .topimg {
            width: 100rpx;
            height: 100rpx;
            border-radius: var(--theme--border-radius);
          }

          .foodchooseBox_top_one_title {
            width: 550rpx;
            flex: 1;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            // height: 100rpx;
            margin-left: 60rpx;

            .foodchooseBox_top_one_name {
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              height: 40rpx;
              font-size: var(--theme--font-size-m);
              color: var(--theme--font-main-color);
              line-height: 42rpx;
              display: flex;
              justify-content: space-between;
            }

            .foodchooseBox_top_one_add_reduce {
              display: flex;
              width: 100rpx;
              justify-content: space-between;
              > .btn {
                width: 40rpx;
                height: 40rpx;
                &.disabled {
                  opacity: 0.3;
                }
                image {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .foodchooseBox_top_one_moneybox {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .foodchooseBox_top_one_money {
                font-size: var(--theme--font-size-m);
                color: var(--theme--font-main-color);
              }

              .foodchooseBox_top_one_number {
                font-size: var(--theme--font-size-s);
                color: var(--theme--font-deputy-color);
                float: right;
                max-width: 360rpx;
              }
            }
          }
        }

        .foodchooseBox_top-box_discounts {
          margin-top: 15rpx;
          border-top: 1rpx solid #f0f0f0;
          border-bottom: 1rpx solid #f0f0f0;
          display: flex;
          justify-content: space-between;
          height: 100rpx;

          .foodchooseBox_top-box_discounts_left {
            width: 130rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: var(--theme--font-size-s);

            .discounts_leftimg {
              width: 40rpx;
              height: 40rpx;
            }
          }

          .foodchooseBox_top-box_discounts_right {
            // width: 170rpx;
            display: flex;
            justify-content: space-around;
            align-items: center;

            view {
              align-items: center;
              height: 34rpx;
              font-size: var(--theme--font-size-s);
              color: var(--theme--font-deputy-color);
              line-height: 34rpx;
            }

            .discounts_rightimg {
              width: 10rpx;
              height: 20rpx;
            }
          }
        }

        .foodchooseBox_top-box_count {
          width: 100%;
          display: flex;
          align-items: flex-end;
          flex-direction: column;
          justify-content: center;
          height: 120rpx;

          view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: var(--theme--font-size-m);
            line-height: 40rpx;
            color: #0d0d0d;
          }
        }
      }
    }

    .remarks {
      .title {
        margin-left: 50rpx;
        margin-bottom: 15rpx;
      }

      textarea {
        background: white;
        width: 100%;
        padding: 20rpx 50rpx;
        height: 200rpx;
        box-sizing: border-box;
      }
    }

    // 超值换购
    .bargain_buy {
      width: 750rpx;
      height: 434rpx;
      background: #ffffff;
      margin-bottom: 25rpx;

      .bargain_buy_title {
        margin: 35rpx;
        background-color: #9fcdff;
        padding: 20rpx;
        width: 104rpx;
        height: 36rpx;
        font-size: 26rpx;

        color: #fff;
        line-height: 36rpx;
      }

      .bargain_buybox {
        padding-top: 20rpx;
        width: 700rpx;
        margin: 0 auto;
        display: flex;

        .bargain_buybox_content {
          margin-right: 25rpx;

          .bargain_buybox_content_box {
            width: 200rpx;

            .bargain_buybox_content_image {
              position: relative;

              .bargain_buybox_content-img {
                width: 200rpx;
                height: 200rpx;
                border-radius: 20rpx;
              }

              .bargain_buybox_btn-imgbox {
                position: absolute;
                bottom: 22rpx;
                right: 10rpx;
                width: 35rpx;
                height: 35rpx;
                background: #9fcdff;
                border-radius: 35rpx;

                .bargain_buybox_btn-img {
                  position: absolute;
                  top: 2rpx;
                  left: 3.5rpx;
                  width: 32rpx;
                  height: 32rpx;
                }
              }

              .bargain_buybox_btn-imgbox {
                position: absolute;
                bottom: 22rpx;
                right: 10rpx;
                width: 35rpx;
                height: 35rpx;
                background: #9fcdff;
                border-radius: 35rpx;

                .bargain_buybox_btn-imgMinus {
                  width: 21rpx;
                  height: 6rpx;
                  position: absolute;
                  top: 17rpx;
                  right: 7rpx;
                }
              }
            }

            .bargain_buybox_content_detail {
              margin-top: 10rpx;

              .bargain_buybox_content_detail_box {
                display: flex;
                justify-content: space-around;
                margin-top: 10rpx;
                align-items: center;

                .bargain_buybox_content_detail_left {
                  font-size: 30rpx;

                  color: #222222;
                  line-height: 26rpx;

                  span {
                    font-size: 20rpx;
                    margin-right: 5rpx;
                  }
                }

                .bargain_buybox_content_detail_right {
                  width: 80rpx;
                  text-align: center;
                  font-size: 30rpx;

                  color: #bfbfbf;
                  position: relative;

                  span {
                    font-size: 20rpx;
                    margin-right: 5rpx;
                  }

                  .bargain_buybox_content_detail_rightline {
                    position: absolute;
                    top: 20rpx;
                    width: 80rpx;
                    height: 4rpx;
                    background-color: #bfbfbf;
                  }
                }
              }
            }
          }
        }
      }

      // 食物详情弹框
      .gift_box {
        width: 640rpx;
        height: 952rpx;
        background: #ffffff;
        border-radius: 20rpx;

        .gift_box_top {
          position: relative;

          image {
            width: 640rpx;
            height: 640rpx;
            border-radius: 20rpx;
          }

          .gift_box_top-close {
            position: absolute;
            top: 10rpx;
            right: 30rpx;

            image {
              width: 40rpx;
              height: 40rpx;
              background: #666666;
              opacity: 0.8;
            }
          }
        }

        .gift_box_top_content {
          margin-left: 25rpx;

          .gift_box_top_content-title {
            width: 208rpx;
            height: 36rpx;
            font-size: 26rpx;

            color: #222222;
            line-height: 36rpx;
            margin: 15rpx 0 10rpx 0;
          }

          .gift_box_top_content-box {
            width: 360rpx;
            height: 56rpx;
            font-size: 20rpx;

            color: #bdbdbd;
            line-height: 28rpx;
          }
        }

        .gift_box_top_footer {
          margin-top: 95rpx;
          width: 640rpx;
          height: 90rpx;
          background: #f7f7f7;
          border-radius: 20rpx;
          display: flex;
          justify-content: space-between;

          .gift_box_top_footer-leftbox {
            display: flex;
            align-items: center;

            .gift_box_top_footer-left {
              width: 88rpx;
              height: 50rpx;
              font-size: 22rpx;

              color: #9fcdff;
              line-height: 50rpx;
              margin-left: 10rpx;

              span {
                font-size: 30rpx;
              }
            }

            .bargain_buybox_content_detail_right {
              width: 80rpx;
              text-align: center;
              font-size: 30rpx;

              color: #bfbfbf;
              position: relative;

              span {
                font-size: 20rpx;
                margin-right: 5rpx;
              }

              .bargain_buybox_content_detail_rightline {
                position: absolute;
                top: 20rpx;
                width: 80rpx;
                height: 4rpx;
                background-color: #bfbfbf;
              }
            }
          }

          .gift_box_top_footer-right {
            margin-right: 10rpx;
            margin-top: 30rpx;

            image {
              width: 40rpx;
              height: 40rpx;
            }
          }
        }
      }
    }

    // 请选择支付方式
    .modeOfPayment {
      margin-top: 20rpx;
      margin-bottom: 30rpx;
      // margin: 0 auto;
      // border: 1px solid red;
      // width: 690rpx;
      height: 576rpx;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 4rpx 4rpx rgba(0, 0, 0, 0.03);
      border-radius: 20rpx;

      .modeOfPayment_Box {
        margin: 0 auto;
        width: 690rpx;

        .modeOfPayment_Box_title {
          border-bottom: 1px solid #e5e5e5;
          padding: 20rpx 0;
          height: 36rpx;
          font-size: 26rpx;

          color: #6b6b6b;
          line-height: 36rpx;
        }

        .modeOfPayment_gift_box {
          .modeOfPayment_gift_title {
            width: 78rpx;
            height: 36rpx;
            font-size: 26rpx;

            color: #222222;
            line-height: 36rpx;
            margin-top: 40rpx;
          }

          .modeOfPayment_gift_titlechoose {
            margin-top: 10rpx;
            width: 195rpx;
            height: 34rpx;
            font-size: 24rpx;

            color: #bdbdbd;
            line-height: 34rpx;
            margin-bottom: 20rpx;
          }

          .modeOfPayment_gift_content_box {
            .modeOf_Payment-box {
              .modeOf_Payment_scroll {
                display: flex;
                width: 690rpx;
                margin: 0 auto;

                .modeOf_Payment_box {
                  margin: 0 30rpx 0 0;

                  image {
                    width: 256rpx;
                    height: 172rpx;
                    background: #d8d8d8;
                    border-radius: 20rpx;
                  }
                }
              }
            }
          }
        }

        .wxModeOfPayment {
          margin-top: 100rpx;
          // border: 1px solid red;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .wxModeOfPayment_left {
            width: 104rpx;
            font-size: 26rpx;

            color: #222222;
          }

          .wxModeOfPayment_right {
            width: 40rpx;
            height: 40rpx;
            background: #9fcdff;
            border-radius: 40rpx;

            .wxModeOfPayment_rightimg {
              width: 40rpx;
              height: 40rpx;
            }
          }
        }
      }
    }

    // 立即支付
    .orderFood_choose {
      z-index: 1;
      position: fixed;
      bottom: calc(env(safe-area-inset-bottom) + 20rpx);
      width: 594rpx;
      height: 102rpx;
      background: var(--theme--deputy-color);
      box-shadow: var(--theme--box-shadow);
      border-radius: var(--theme--border-radius);
      left: 50%;
      transform: translateX(-50%);
      padding: 0 36rpx;
      display: flex;
      justify-content: space-between;

      .orderFood_choose-left {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .orderFood_choose-left_img {
          width: 40rpx;
          height: 40rpx;
          z-index: 1;
          margin-right: 30rpx;
        }

        .orderFood_choose-left-line {
          width: 2rpx;
          height: 32rpx;
          background-color: #ffffff;
        }

        .orderFood_choose-left_money {
          height: 42rpx;
          font-size: var(--theme--font-size-m);
          color: #ffffff;
          line-height: 45rpx;
          margin-left: 26rpx;
          .balance-amount {
            font-size: var(--theme--font-size-s);
            margin-left: 20rpx;
          }
        }
      }

      .orderFood_choose-right {
        display: flex;
        align-items: center;
        margin-right: 15rpx;
        justify-content: space-around;

        .orderFood_choose-right-choose {
          height: 42rpx;
          font-size: var(--theme--font-size-m);
          color: #ffffff;
          line-height: 42rpx;
          margin-right: 11rpx;
        }

        image {
          width: 17rpx;
          height: 18rpx;
        }
      }
    }
  }
}
</style>
