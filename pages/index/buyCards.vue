<template>
  <view class="buycards_box">
    <view class="buycards_top">
      <view class="buycards_top_box">
        <image :src="itemimg" mode="aspectFill" />
        <span>{{ cardsDetail.title }}</span>
        <!-- <image :src="i.posterUrl" mode="aspectFill" />
        <span>{{i.title}}</span>-->
      </view>
    </view>
    <view class="buycards_contentall">
      <view class="buycards_content">
        <view class="buycards_content-title">充值金额选择</view>
        <view class="buycards_content-Bigbox">
          <view class="buycards_content-box">
            <view
              class="buycards_content-boxone"
              v-for="(item, index) in balanceChonse"
              :key="index"
            >
              <view class="buycards_contentBody">
                <view class="buycards_contentBody-left">
                  <span>{{ index }}</span>
                </view>
                <view class="buycards_contentBody-right" @click="goaddMoney(item._id)">
                  <image src="../../static/images/add.png" />
                </view>
                <view class="buycards_contentBody-image" @click="open(item)"></view>
              </view>
              <span>{{ item.balance }}</span>
            </view>
            <uni-popup ref="popup" type="bottom" :tabbar="false">
              <view class="login_box">
                <view class="login_box_clear">
                  <view class="login_box_clear_left"></view>
                  <image
                    class="login_box_clear_right"
                    src="../../static/images/clear.png"
                    @click="close()"
                  />
                </view>
                <view class="buycardsBox_top">
                  <image
                    src="../../static/images/index/indexRecharge.png"
                    class="buycardsBox_top_leftimg"
                  />
                  <view class="buycardsBox_top_right">
                    <view>¥{{ balanceItem.price }}</view>
                    <view>{{ balanceItem.balance }}</view>
                  </view>
                </view>
                <view class="buycardsBox_footer">
                  <view class="buycardsBox_footer_left">
                    <view class="title">使用须知：</view>
                    <scroll-view scroll-y="true" class="gift_contentBox_box">
                      <view class="spanContent">
                        <rich-text :nodes="cardsDetail.content"></rich-text>
                      </view>
                    </scroll-view>
                  </view>
                  <view class="buycardsBox_footer_right"></view>
                </view>
              </view>
            </uni-popup>
          </view>
        </view>
      </view>
      <!-- footer -->
      <view class="buycards_footer">
        <!-- 订单支付 -->
        <view class="modeOf_Payment_order">
          <view class="modeOf_Payment_order_money">
            <view>{{ numbers }}张</view>
            总计 ¥ {{ playMoneyCount.toFixed(2) }}
          </view>
          <view class="modeOf_Payment_order_play">
            <view class="modeOf_Payment_order_play_name" @click="gocardOrder">订单支付Payment</view>
          </view>
        </view>
      </view>
      <!-- end -->
    </view>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
export default {
  components: {
    uniPopup,
  },
  data() {
    return {
      cards1: 0,
      cards2: 0,
      cards3: 0,
      types: "",
      playMoneyCount: 0,
      playMoney1: 0,
      playMoney2: 0,
      playMoney3: 0,
      slug: "",
      typeCards: "",
      cardid: "",
      cardsDetail: {
        title: "",
        price: "",
        content: [],
        // balancePriceGroups:[]
      },
      balanceChonse: [], //充值金额选择
      balanceItem: {
        balance: 0,
        price: 0,
      }, //弹框的模块
      itemimg: "",
      balancePriceGroups: [],
      index1: Number(0),
      index2: Number(0),
      index3: Number(0),
      numbers: 0,
    };
  },
  onLoad(option) {
    this.slug = option.slug;
    this.itemimg = option.itemimg;
  },
  onShow() {
    this.goCard();
  },
  methods: {
    // 卡片详情
    goCard() {
      this.$axios
        .getRequest("/card-type", {
          slug: this.slug,
        })
        .then((res) => {
          this.cardsDetail = res[0];
          res[0].balancePriceGroups.forEach((i) => {
            i.count = 0;
            i.total = 0;
          });
          this.balanceChonse = res[0].balancePriceGroups;
        });
    },
    // 创建订单
    gocardOrder() {
      let neworder = [];
      this.balanceChonse.forEach((i) => {
        neworder.push({
          balance: i.balance,
          count: i.count,
        });
      });
      this.$axios
        .postRequest("/card", {
          slug: this.slug,
          balanceGroups: neworder,
        })
        .then((res) => {
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
    open(item) {
      console.log(item, "item");
      this.balanceItem = item;
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    goaddMoney(id) {
      this.balanceChonse.forEach((i) => {
        if (id == i._id) {
          i.count = i.count + 1;
        }
      });
      console.log(this.balanceChonse);
      var totalPrice = 0;
      var number = 0;
      this.balanceChonse.forEach((j) => {
        totalPrice += j.count * j.price;
        number += j.count;
      });
      this.numbers = number;
      this.playMoneyCount = totalPrice;
      console.log(this.playMoneyCount, 111);
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
    height: calc(100vh-600rpx);

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
    height: 600rpx;
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
        font-family: PingFangSC-Medium, PingFang SC;
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
                  width: 20rpx;
                  height: 44rpx;
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
            margin-top: 35rpx;

            .buycardsBox_footer_left {
              text-align: left;
              width: 600rpx;

              .title {
                width: 146rpx;
                height: 40rpx;
                font-size: 28rpx;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #0d0d0d;
              }

              .gift_contentBox_box {
                height: 350rpx;

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
            font-family: PingFangSC-Medium, PingFang SC;
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
            font-family: PingFangSC-Medium, PingFang SC;
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
