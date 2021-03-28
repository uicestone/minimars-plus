<template>
  <view class="foodchooseBox">
    <view class="foodchooseBox_content">
      <view class="foodchooseBox_top">
        <view class="foodchooseBox_top-box">
          <view
            class="foodchooseBox_top_one"
            v-for="(item, index) in selectshop"
            :key="index"
          >
            <image :src="item.imageUrl" class="topimg"></image>
            <view class="foodchooseBox_top_one_title">
              <view class="foodchooseBox_top_one_name">
                {{ item.name }}
              </view>
              <view class="foodchooseBox_top_one_moneybox">
                <view class="foodchooseBox_top_one_money">
                  ￥<span>{{ item.buyPrice }}</span>
                </view>
                <view class="foodchooseBox_top_one_number">
                  x{{ item.numbers }}
                </view>
              </view>
            </view>
          </view>
          <view
            class="foodchooseBox_top_one"
            v-for="(item, index) in replacebox"
            :key="index"
          >
            <image src="../../static/images/224.jpg" class="topimg"></image>
            <view class="foodchooseBox_top_one_title">
              <view class="foodchooseBox_top_one_name"> 火龙果蓝莓奶昔 </view>
              <view class="foodchooseBox_top_one_moneybox">
                <view class="foodchooseBox_top_one_money">
                  ￥<span>29.9</span>
                </view>
                <view class="foodchooseBox_top_one_number"> x1 </view>
              </view>
            </view>
          </view>

          <view class="foodchooseBox_top-box_discounts">
            <view class="foodchooseBox_top-box_discounts_left">
              <view>优惠券</view>
              <image
                src="../../static/images/orderFood/fooddiscounts.png"
                class="discounts_leftimg"
              ></image>
            </view>
            <view class="foodchooseBox_top-box_discounts_right">
              <view>无可用优惠券</view>
              <image
                src="../../static/images/111.png"
                class="discounts_rightimg"
              ></image>
            </view>
          </view>
          <view class="foodchooseBox_top-box_count">
            <view>共一件 合计</view>
            <view
              >¥<span>{{ totalPrice }}</span></view
            >
          </view>
        </view>
      </view>
      <!-- 超值换购 -->
      <view class="bargain_buy">
        <!-- <view class="bargain_buy_title">
					超值换购
				</view>
				<view class="bargain_buybox">
					<view class="bargain_buybox_content" v-for="(item,index) in foods " :key="index">
						<view class="bargain_buybox_content_box">
							<view class="bargain_buybox_content_image">
								<image src="../../static/images/224.jpg" class="bargain_buybox_content-img" @click="open(index)"></image>
								<view class="bargain_buybox_btn-imgbox" v-show="item.buyadd" @click="goadd(index)">
									<image src="../../static/images/orderFood/foodchooseAdd.png" class="bargain_buybox_btn-img"></image>
								</view>
								<view class="bargain_buybox_btn-imgbox" v-show="item.buyadd==false" @click="goMinus(index)">
									<image src="../../static/images/orderFood/foodchooseMinus.png" class="bargain_buybox_btn-imgMinus"></image>
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
				</view> -->
        <!-- 详情 -->
        <uni-popup ref="popup" type="center">
          <view class="gift_box">
            <view class="gift_box_top">
              <image
                src="../../static/images/224.jpg"
                mode="aspectFill"
              ></image>
              <view class="gift_box_top-close">
                <image
                  class="gift_box_clear_right"
                  src="../../static/images/clear.png"
                  @click="close()"
                ></image>
              </view>
            </view>
            <view class="gift_box_top_content">
              <view class="gift_box_top_content-title"> 至尊肉食主义拼盘 </view>
              <view class="gift_box_top_content-box">
                卡真鸡腿肉，羊排，西冷牛排，芝士肠， 维也纳肠
              </view>
            </view>
            <view class="gift_box_top_footer">
              <view class="gift_box_top_footer-leftbox">
                <view class="gift_box_top_footer-left">
                  ￥<span>28</span>
                </view>
                <view class="bargain_buybox_content_detail_right">
                  <span>¥</span>38
                  <view class="bargain_buybox_content_detail_rightline"></view>
                </view>
              </view>
              <view class="gift_box_top_footer-right" @click="goAddClose()">
                <image src="../../static/images/add.png"></image>
              </view>
            </view>
          </view>
        </uni-popup>
      </view>
      <!-- 请选择支付方式 -->
      <!-- <view class="modeOfPayment">
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
										<image :src="item.imageUrl" mode="aspectFill"></image>
									</view>
								</view>
							</scroll-view>

						</view>
					</view>
					<view class="wxModeOfPayment">
						<view class="wxModeOfPayment_left">微信支付</view>
						<view class="wxModeOfPayment_right" @click="gowxSelected">
							<image src="../../static/images/orderFood/foodchooseSelected.png" class="wxModeOfPayment_rightimg" v-show="wxSelected"></image>
						</view>
					</view>
				</view>

			</view> -->
      <!-- 立即支付 -->
      <view class="payNowBox">
        <view class="payNow" @click="createdOred">
          <view class="payNow_btn">立即支付</view>
        </view>
      </view>
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
      totalPrice: 0,
      cardList: [],
      order: {
        type: "food",
        store: "",
        tableId: "",
        items: [],
      },
    };
  },
  onLoad(option) {
    this.selectshop = JSON.parse(option.selectshop);
    this.order.store = option.storeId;
    this.order.tableId = option.tableId;
    this.selectshop.forEach((j) => {
      this.order.items.push({
        productUid: j.uid,
        quntity: j.numbers,
      });
    });
    console.log(this.order);
    this.selectshop.forEach((i) => {
      this.totalPrice += i.buyPrice * i.numbers;
    });
    // this.getCardList()
  },
  methods: {
    //创建订单
    createdOred() {
      this.$axios.postRequest("/booking", this.order).then((res) => {
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
                url: "../my/myOrderlist", // 购买成功,跳到我的订单
              });
            },
            fail: function (err) {
              console.log("fail:" + JSON.stringify(err));
            },
          });
        }
      });
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

<style lang="less">
.foodchooseBox {
  width: 750rpx;
  background: #f8f8f8;
  min-height: 100vh;
  // background: #00ff00;
  padding-top: 20rpx;
  // border: 1px solid red;

  .foodchooseBox_content {
    .foodchooseBox_top {
      margin-bottom: 30rpx;
      min-height: 434rpx;
      background: #ffffff;

      .foodchooseBox_top-box {
        width: 700rpx;
        margin: 0 auto;
        padding-top: 20rpx;

        .foodchooseBox_top_one {
          display: flex;
          justify-content: space-between;
          margin: 30rpx 0;

          // 图片
          .topimg {
            width: 120rpx;
            height: 120rpx;
            border-radius: 20rpx;
          }

          .foodchooseBox_top_one_title {
            margin-top: 10rpx;
            width: 550rpx;
            display: flex;
            justify-content: space-between;

            .foodchooseBox_top_one_name {
              width: 240rpx;
              height: 42rpx;
              font-size: 30rpx;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #222222;
              line-height: 42rpx;
            }

            .foodchooseBox_top_one_moneybox {
              text-align: right;

              .foodchooseBox_top_one_money {
                width: 74rpx;
                height: 42rpx;
                font-size: 18rpx;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 26rpx;

                span {
                  font-size: 26rpx;
                }
              }

              .foodchooseBox_top_one_number {
                width: 30rpx;
                height: 36rpx;
                font-size: 26rpx;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 36rpx;
                float: right;
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
            width: 150rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .discounts_leftimg {
              width: 40rpx;
              height: 40rpx;
            }
          }

          .foodchooseBox_top-box_discounts_right {
            width: 200rpx;
            display: flex;
            justify-content: space-around;
            align-items: center;

            view {
              align-items: center;
              width: 144rpx;
              height: 34rpx;
              font-size: 24rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #bdbdbd;
              line-height: 34rpx;
            }

            .discounts_rightimg {
              width: 10rpx;
              height: 20rpx;
            }
          }
        }

        .foodchooseBox_top-box_count {
          float: right;
          width: 245rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 120rpx;

          view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 34rpx;
            font-size: 24rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #0d0d0d;

            span {
              margin: 0 10rpx;
              font-size: 40rpx;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #222222;
            }
          }
        }
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
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
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

              .bargain_buybox_content_title {
                text-align: center;
                font-size: 22rpx;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #222222;
                line-height: 32rpx;
              }

              .bargain_buybox_content_detail_box {
                display: flex;
                justify-content: space-around;
                margin-top: 10rpx;
                align-items: center;

                .bargain_buybox_content_detail_left {
                  font-size: 30rpx;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
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
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
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
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #222222;
            line-height: 36rpx;
            margin: 15rpx 0 10rpx 0;
          }

          .gift_box_top_content-box {
            width: 360rpx;
            height: 56rpx;
            font-size: 20rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
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
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
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
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
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
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #6b6b6b;
          line-height: 36rpx;
        }

        .modeOfPayment_gift_box {
          .modeOfPayment_gift_title {
            width: 78rpx;
            height: 36rpx;
            font-size: 26rpx;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #222222;
            line-height: 36rpx;
            margin-top: 40rpx;
          }

          .modeOfPayment_gift_titlechoose {
            margin-top: 10rpx;
            width: 195rpx;
            height: 34rpx;
            font-size: 24rpx;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
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
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
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
    .payNowBox {
      margin: 10rpx 0;
      position: fixed;
      bottom: 0;
      width: 750rpx;

      .payNow {
        margin: 0 auto;
        width: 600rpx;
        height: 114rpx;
        background: #9fcdff;
        box-shadow: 0rpx 4rpx 4rpx 2rpx rgba(0, 0, 0, 0.05);
        border-radius: 57rpx;
        margin: 0 auto;

        .payNow_btn {
          width: 120rpx;
          height: 42rpx;
          font-size: 30rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 42rpx;
          margin: 0 auto;
          padding-top: 35rpx;
        }
      }
    }
  }
}
</style>
