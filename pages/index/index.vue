<template>
  <view class="index_box">
    <!-- 轮播 -->
    <view class="banner">
      <swiper
        class="swiper"
        :autoplay="true"
        :interval="3000"
        :duration="1000"
        :current="swiperCurrent"
        @animationfinish="changeSwiper"
        indicator-dots="true"
        circular="true"
        indicator-color="#B9B9B9"
        indicator-active-color="#9B9B9B"
      >
        <swiper-item v-for="item in bannerimg" :key="item.id">
          <image
            class="swiper_item"
            :src="item.posterUrl"
            mode="aspectFill"
          ></image>
        </swiper-item>
      </swiper>
      <!-- 购票 -->
      <view>
        <view class="buy_ticketsBox">
          <view class="buy_tickets">
            <view @click="myorders">
              <image
                src="../../static/images/index/index_BuyingTickets.png"
              ></image>
              <span>购票</span>
            </view>

            <uni-popup ref="popup" type="bottom" :tabbar="true">
              <view class="login_box">
                <view class="login_box_clear">
                  <view class="login_box_clear_left"></view>
                  <image
                    class="login_box_clear_right"
                    src="../../static/images/clear.png"
                    @click="close()"
                  ></image>
                </view>
                <view class="login_contentBox">
                  <view class="login_box_title"> 请先授权登录 </view>
                  <view class="login_box_content">
                    为了更好的为您提供服务，请允许微信授权后再使用功能
                  </view>
                  <view class="login_box_btn">
                    <!-- <button class="login_box_btn_box" @click="getLogin"> -->
                    <button
                      class="login_box_btn_box"
                      open-type="getPhoneNumber"
                      bindgetphonenumber="getPhoneNumber"
                      @click="getLogin"
                    >
                      <image
                        class="login_box_btn_img"
                        src="../../static/images/wx.png"
                      ></image>
                      <view class="login_box_btn_name"> 微信授权登录 </view>
                    </button>
                  </view>
                </view>
              </view>
            </uni-popup>
          </view>
          <view class="line"> </view>
          <view class="buy_tickets_Food" @click="goFood()">
            <image src="../../static/images/index/index_Order.png"></image>
            <span>点餐</span>
          </view>
        </view>
      </view>
    </view>
    <view style="width: 690rpx; height: 310rpx"></view>
    <!-- 消息提示框 -->
    <view class="massage_box" v-if="informationShow">
      <image src="../../static/images/index/looks.png"></image>
      <view>您的订单{{ information }}，请及时查看</view>
    </view>
    <!-- MARS商城 -->
    <view class="shoppingMall_box">
      <view class="shoppingMall shoppingImgBox">
        <view class="shoppingMall_title">
          <!-- MARS商城 -->
        </view>
      </view>
      <view class="shoppingMall activeImgBox" @click="goMarsActivityBox">
        <!-- <view class="shoppingMall_title">
					MARS活动
				</view> -->
      </view>
      <view class="shoppingMall cardImgBox" @click="goMarsCoupon">
        <!-- <view class="shoppingMall_title">
					MARS卡券
				</view> -->
      </view>
    </view>
    <!-- 我的积分 -->
    <view class="integrate_box">
      <view class="integrate">
        <view class="integrate_left">
          我的积分<span>{{ points }}</span>
        </view>
        <view class="integrate_right">
          <image
            src="../../static/images/index/index_integralImg.png"
            mode=""
            class="index_integralImg"
          ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
export default {
  components: {
    uniPopup,
    uniPopupMessage,
    uniPopupDialog,
  },
  data() {
    return {
      current: 0,
      swiperCurrent: 0,
      points: 10, //积分
      bannerimg: [], //轮播图
      headerimg: "",
      information: "", //订单信息
      informationShow: false,
      authPhone: {
        //微信授权手机号传参
        session_key: "",
        encryptedData: "",
        iv: "",
        openid: "",
      },
    };
  },
  onTabItemTap(s) {
    // console.log(s, "1111111")
  },
  onShow() {
    this.open();
    uni.login({
      provider: "weixin",
      success: (loginRes) => {
        // 登录接口
        this.$axios
          .postRequest("/wechat/login", {
            code: loginRes.code,
          })
          .then((resLogin) => {
            uni.setStorageSync("userInfo", resLogin.user); //user信息
            uni.setStorageSync("token", resLogin.token); //token
            uni.setStorageSync("storeName", resLogin.user.store.name); //默认门店名字
            uni.setStorageSync("storeId", resLogin.user.store.id); //默认门店id
            uni.setStorageSync("session_key", resLogin.session_key); //session_key
            uni.setStorageSync("openid", resLogin.openid); //openid
            this.points = uni.getStorageSync("userInfo").points;
            this.userInfo = uni.getStorageSync("userInfo");
            this.goOedreDetail();
            this.points = uni.getStorageSync("userInfo").points;
            this.userInfo = uni.getStorageSync("userInfo");
            this.authPhone.session_key = uni.getStorageSync("session_key");
            this.authPhone.openid = uni.getStorageSync("openid");
            this.getAuthPhomber();

            // 暂时用于更新手机号；
            this.$axios
              .putRequest("/user/" + resLogin.user.id, {
                mobile: 15931152153,
              })
              .then((res1) => {
                console.log(res1);
              });
          });
      },
    });

    // if (uni.getStorageSync('storeName')) {
    // 	console.log("存在门店")
    // } else {
    // 	console.log("不存在门店")
    // }

    // if (!uni.getStorageSync('token')) {
    // 	this.open()
    // }
    // if (uni.getStorageSync('userInfo')) {
    // 	console.log("拿到了userinfo")
    // } else {
    // 	this.getTheCurrentLoginUser()
    // }
  },
  onLoad() {
    this.getbanner();
  },
  methods: {
    getPhoneNumber(e) {
      console.log(e.detail.errMsg, "e.detail.errMsg");
      console.log(e.detail.iv, "e.detail.iv");
      console.log(e.detail.encryptedData, "e.detail.encryptedData");
    },
    // 微信授权获取手机号
    getAuthPhomber() {
      this.$axios
        .postRequest("/wechat/update-mobile", this.authPhone)
        .then((rPhone) => {
          console.log(rPhone, "rPhone");
        });
    },
    changeSwiper(e) {
      this.swiperCurrent = e.detail.current;
    },
    myorders() {
      uni.navigateTo({
        url: "../my/myOrder",
      });
    },
    open() {
      this.$refs.popup.open();
      wx.hideTabBar();
    },
    close() {
      this.$refs.popup.close();
      wx.showTabBar();
    },
    // 跳转卡券页面
    goMarsCoupon() {
      uni.navigateTo({
        url: "/pages/index/marsCoupon",
      });
    },
    // 跳转活动页面
    goMarsActivityBox() {
      uni.navigateTo({
        url: "/pages/index/marsActivityBox",
      });
    },
    goFood() {
      uni.switchTab({
        url: "/pages/orderFood/order",
      });
    },
    // banner图
    getbanner() {
      this.$axios
        .getRequest("/post", {
          tag: "home-banner",
        })
        .then((res) => {
          this.bannerimg = res;
        });
    },
    // 授权登录
    getLogin() {
      uni.login({
        provider: "weixin",
        success: (loginRes) => {
          console.log(loginRes);
          // this.goToken(loginRes)
          uni.getUserInfo({
            provider: "weixin",
            success: (infoRes) => {
              // console.log(infoRes)
              this.goToken(loginRes);
              this.nickname = infoRes.userInfo.nickName;
              this.headerimg = infoRes.userInfo.avatarUrl;
              // console.log(this.headerimg)
              uni.setStorageSync("nickname", infoRes.userInfo.nickName);
              uni.setStorageSync("headerimg", infoRes.userInfo.avatarUrl);
              this.close();
            },
            fail: (err) => {
              console.log(err);
            },
          });
        },
      });
    },
    // 获取token
    // goToken(loginRes) {
    // 	this.$axios.postRequest('/wechat/login', {
    // 		code: loginRes.code
    // 	}).then(res => {
    // 		console.log(res, "获取token")
    // 		// this.points = res.user.points
    // 		// uni.setStorageSync('points', res.user.points)
    // 		uni.setStorageSync('token', res.token)
    // 		this.close();
    // 		this.goOedreDetail()
    // 		this.getTheCurrentLoginUser()
    // 		// 暂时用于更新手机号；
    // 		this.$axios.putRequest('/user/' + res.user.id, {
    // 			mobile: 15931152153
    // 		}).then(res1 => {
    // 			console.log(res1)
    // 		})
    // 	})
    // },
    // 获取当前登录用户
    // getTheCurrentLoginUser() {
    // 	this.$axios.getRequest('/auth/user').then(res => {
    // 		// this.points = res.points
    // 		console.log(res.store, "获取当前登录用户")
    // 		if (res.store) {
    // 			uni.setStorageSync('storeName', res.store.name)
    // 			uni.setStorageSync('storeId', res.store.id)
    // 			console.log("存在门店")
    // 		} else {
    // 			uni.setStorageSync('storeName', "")
    // 			uni.setStorageSync('storeId', "")
    // 			console.log("不存在门店")
    // 		}
    // 	})
    // },

    // 获取你的订单,查看详情
    goOedreDetail() {
      this.$axios
        .getRequest("/booking", {
          type: "play",
          limit: 1,
        })
        .then((res) => {
          res.forEach((s) => {
            if (s.status == "canceled") {
              s.status = "已取消";
            } else if (s.status == "booked") {
              s.status = "已确认";
            } else if (s.status == "in_service") {
              s.status = "已入场";
            } else if (s.status == "pending_refund") {
              s.status = "待撤销";
            } else if (s.status == "finished") {
              s.status = "已完成";
              // this.finishs=s.status
            } else if (s.status == "pending") {
              s.status = "待付款";
            }
            this.information = s.status;
            if (this.information == "已完成" || this.information == "") {
              this.informationShow = false;
            } else {
              this.informationShow = true;
            }
          });
        });
    },
  },
};
</script>

<style lang="less">
.index_box {
  background-color: #f8f8f8;
  // min-height:1624rpx ;

  // 轮播
  .banner {
    position: relative;
    width: 750rpx;
    height: 750rpx;
    background: #d8d8d8;

    .swiper {
      height: 750rpx;
      line-height: 140rpx;

      .swiper_item {
        width: 750rpx;
        height: 750rpx;

        img {
          width: 750rpx;
          height: 750rpx;
        }

        span {
          font-weight: bold;
          color: #333333;
        }
      }
    }

    // 购票
    .buy_ticketsBox {
      position: absolute;
      margin-top: 0;
      bottom: -150px;
      right: 30rpx;
      width: 690rpx;
      height: 358rpx;
      display: flex;
      justify-content: space-around;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 4rpx 4rpx rgba(0, 0, 0, 0.03);
      border-radius: 20rpx;

      .line {
        border: 1rpx solid #f7f7f7;
        height: 236rpx;
        margin-top: 50rpx;
      }

      .buy_tickets,
      .buy_tickets_Food {
        width: 100rpx;
        height: 100rpx;
        margin-top: 100rpx;
        text-align: center;

        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 12rpx;
        }

        span {
          font-size: 32rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #333333;
        }
      }

      .buy_tickets {
        margin-left: 60rpx;

        // 微信授权弹框
        .login_box {
          background-color: #ffffff;
          width: 750rpx;
          height: 550rpx;
          background: #ffffff;
          border-radius: 40rpx 40rpx 0rpx 0rpx;

          .login_box_clear {
            padding-top: 30rpx;
            width: 672rpx;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;

            .login_box_clear_left {
              width: 40rpx;
              height: 40rpx;
            }

            .login_box_clear_right {
              width: 40rpx;
              height: 40rpx;
            }
          }

          .login_contentBox {
            width: 672rpx;
            margin: 0 auto;

            .login_box_title {
              padding-top: 20rpx;
              width: 264rpx;
              height: 60rpx;
              font-size: 44rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 550;
              color: #000000;
              line-height: 60rpx;
              padding-bottom: 36rpx;
            }

            .login_box_content {
              width: 672rpx;
              height: 88rpx;
              font-size: 32rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #848484;
              line-height: 44rpx;
              text-align: left;
            }

            .login_box_btn {
              width: 681rpx;
              height: 102rpx;
              background: #9fcdff;
              box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(215, 215, 215, 0.3);
              border-radius: 52rpx;

              .login_box_btn_box {
                margin-top: 50rpx;
                width: 681rpx;
                height: 102rpx;

                button::after {
                  border: none;
                }

                padding: 0;
                background-color: #9fcdff;
                line-height: 102px;
                border-radius: 52rpx;
                display: flex;
                justify-content: center;
                // margin: 65px 222rpx;

                .login_box_btn_img {
                  width: 50rpx;
                  height: 50rpx;
                  color: #ffffff;
                  padding-top: 25rpx;
                  padding-right: 13rpx;
                }

                .login_box_btn_name {
                  font-size: 32rpx;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #ffffff;
                  line-height: 100rpx;
                }
              }
            }
          }
        }
      }

      .buy_tickets_Food {
        margin-right: 60rpx;
      }
    }
  }

  // 消息提示框
  .massage_box {
    width: 690rpx;
    height: 80rpx;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 4rpx 4rpx rgba(0, 0, 0, 0.03);
    border-radius: 20rpx;
    margin: 0 auto;
    line-height: 90rpx;
    display: flex;
    vertical-align: middle;

    image {
      width: 30rpx;
      height: 30rpx;
      margin-left: 50rpx;
      margin-top: 32rpx;
    }

    view {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 700;
      color: #bdbdbd;
      margin-left: 20rpx;
    }
  }

  // MARS商城
  .shoppingMall_box {
    display: flex;
    justify-content: space-around;
    margin: 20rpx 0;

    .shoppingImgBox {
      background: url(../../static/images/index/index_shoppingImg.png) no-repeat;
      background-size: 100% 100%;
    }

    .activeImgBox {
      background: url(data:image/png;base64,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)
        no-repeat;
      background-size: 100% 100%;
    }

    .cardImgBox {
      background: url(../../static/images/index/index_cardImg.png) no-repeat;
      background-size: 100% 100%;
    }

    .shoppingMall {
      width: 220rpx;
      height: 250rpx;
      // background: #F0F0F0;
      border-radius: 20rpx;

      // .shoppingMall_title {
      // 	margin-top: 20rpx;
      // 	text-align: center;
      // 	font-size: 32rpx;
      // 	font-family: PingFangSC-Medium, PingFang SC;
      // 	font-weight: blod;
      // 	color: #333333;
      // }
    }
  }

  // 我的积分
  .integrate_box {
    width: 750rpx;
    height: 132rpx;
    background: #ffffff;

    .integrate {
      width: 630rpx;
      margin: 0 auto;
      padding-top: 10rpx;
      display: flex;
      justify-content: space-between;

      .integrate_left {
        font-size: 29rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #333333;

        span {
          font-size: 29rpx;
          font-family: Helvetica;
          color: #333333;
          line-height: 34px;
        }
      }

      .integrate_right {
        margin-top: 7rpx;

        .index_integralImg {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
}
</style>
